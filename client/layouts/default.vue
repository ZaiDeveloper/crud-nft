<template>
  <!-- App.vue -->
  <v-app class="landing-page">
    <LayoutNavbar />

    <!-- Sizes your content based upon application components -->
    <v-main class="white">
      <Nuxt />
    </v-main>

    <LayoutFooter />
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>
