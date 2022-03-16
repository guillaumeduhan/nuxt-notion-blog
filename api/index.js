export default async function (req, res, next) {
  if (req.url === '/') {
    const { Client } = require('@notionhq/client')
    const notion = new Client({
      auth: process.env.NOTION
    })

    const asyncForEach = async (array, callback) => {
      for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array)
      }
    }
    const getArticles = async () => {
      let articles = [];
      const response = await notion.blocks.children.list({
        block_id: process.env.NOTION_DB_ID,
        page_size: 50,
      });

      const pagesId = response.results.sort((a, b) => { return new Date(b.created_time) - new Date(a.created_time) }).map(({ id }) => (id)).slice(0, 4)

      await asyncForEach(pagesId, async (pageId) => {
        const page = await buildPageContent(pageId)
        articles.push(page)
      })
      return articles
    }
    const buildPageContent = async (pageId) => {
      let obj = {
        content: []
      }
      const page = await notion.pages.retrieve({ page_id: pageId });
      if (!page) return;
      const { properties, id } = page
      obj.id = id
      obj.title = properties.title.title[0].plain_text
      if (obj.title === 'Template') return;
      const blocks = await notion.blocks.children.list({
        block_id: pageId,
        page_size: 50,
      });
      const { results } = blocks
      results.forEach((result) => {
        const { paragraph } = result
        const { rich_text } = paragraph
        if (!rich_text || !rich_text[0]) return;
        obj.content.push(rich_text[0].plain_text)
      })
      return obj
    }

    const articles = await getArticles()
    res.end(JSON.stringify(articles))
  }
  next()
}