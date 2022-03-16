<template>
  <h2 class="my-3">
    <nuxt-link v-if="article && article.title" :to="`/${article.id}`">{{ article.title }}</nuxt-link>
  </h2>
</template>

<script>
export default {
  props: {
    article: {
      default: () => {},
      type: Object 
    }
  }
}
</script>