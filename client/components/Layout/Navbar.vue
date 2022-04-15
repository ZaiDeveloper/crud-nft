<template>
  <section>
    <v-navigation-drawer v-model="drawer" app fixed temporary color="white">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            IONNEX NFT PROJECT
          </v-list-item-title>
          <v-list-item-subtitle>
            Simple NFT Project for owner and client</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav class="text-center">
        <v-list-item to="/" link>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app dense flat color="gray">
      <v-container class="pa-0 fill-height">
        <v-toolbar-title>
          <nuxt-link to="/" class="black--text"> IONNEX NFT PROJECT </nuxt-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <div class="d-none d-sm-block">
          <v-btn color="black" to="/" link text>HOME</v-btn>
        </div>
        <div class="d-sm-none d-block">
          <v-app-bar-nav-icon
            color="black"
            class="custom"
            @click.stop="drawer = !drawer"
          ></v-app-bar-nav-icon>
        </div>
      </v-container>
    </v-app-bar>
  </section>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      drawer: false,
      whatsappUrl: "",
    };
  },
};
</script>

<style scoped>
.btn-custom-width {
  width: 35px !important;
  height: 35px !important;
}

.custom {
  margin-left: -15px;
}
</style>
