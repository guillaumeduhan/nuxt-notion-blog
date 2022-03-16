<template>
  <div>
    <div class="d-flex align-center justify-space-between my-8">
      <h1>
        <NuxtLink to="/">Mon blog avec Nuxt & Notion</NuxtLink>
      </h1>
      <v-btn small fab @click="darkMode">
        <v-icon v-if="$vuetify.theme.dark">mdi-white-balance-sunny</v-icon>
        <v-icon v-else class="mr-1">mdi-moon-waxing-crescent</v-icon>
      </v-btn>
    </div>
    <v-divider />
  </div>
</template>

<script>
export default {
  methods: {
    darkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    }
  }
}
</script>
