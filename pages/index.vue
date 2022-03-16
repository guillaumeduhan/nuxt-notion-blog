<template>
  <div>
    <div v-if="loading">
      <v-skeleton-loader
      class="mx-auto my-8"
      type="heading"
      v-for="article, index in 3" :key="index"
      ></v-skeleton-loader>
    </div>
    <main v-else>
      <ArticleResume v-for="article, index in getArticles" :key="index" :article="article" />
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      loading: true,
    }
  },
  computed: {
    ...mapGetters({
      getArticles: 'articles/get'
    })
  },
  async fetch() {
    this.loading = true
    const articles = await fetch('/api').then(res => res.json())
    this.$store.dispatch('articles/SAVE', articles)
    this.loading = false
  }
}
</script>