<template>
  <div class="Slug my-5">
    <p v-for="paragraph, index in getArticle.content" :key="index" >{{ paragraph }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      getArticles: 'articles/get'
    }),
    getArticle() {
      if (!this.slug) { return }
      return this.getArticles[this.slug]
    },
    slug() {
      return this.$route.params.slug
    }
  }
}
</script>

<style>
.Slug p {
  font-size: 20px;
}
</style>