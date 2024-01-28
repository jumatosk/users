<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      class="elevation-1"
      app
      floating
      light
      left
    >
      <template v-slot:prepend>
        <div class="pa-2">
          <div class="text-center">
            <v-row>
              <v-col col="12"><v-icon color="primary" size="38">mdi-account-group-outline</v-icon> </v-col>
            </v-row>
          </div>
        </div>
      </template>

      <main-menu :menu="navigation.menu" />
    </v-navigation-drawer>
    <!-- <v-app-bar app color="teal lighten-3"> -->
    <v-app-bar app light :flat="isToolbarDetached">
      <v-card
        class="flex-grow-1 d-flex"
        :flat="!isToolbarDetached"
        color="transparent"
        :class="[isToolbarDetached ? 'pa-1 mt-3 mx-1' : 'pa-0 ma-0']"
      >
        <div class="d-flex flex-grow-1 align-center">
          <v-app-bar-nav-icon
            @click.stop="drawer = !drawer"
          ></v-app-bar-nav-icon>

          <v-spacer class="d-none d-lg-block"></v-spacer>
        </div>
      </v-card>
    </v-app-bar>
    <v-main>
      <v-container class="fill-height" :fluid="!isContentBoxed">
        <v-layout>
          <slot></slot>
        </v-layout>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import { mapState } from "vuex";
import config from "../configs";
import MainMenu from "../components/navigation/MainMenu";

export default {
  components: {
    MainMenu,
  },
  data: () => ({
    drawer: true,
    navigation: config.navigation,
  }),
  computed: {
    ...mapState("app", [
      "product",
      "isContentBoxed",
      "menuTheme",
      "toolbarTheme",
      "isToolbarDetached",
    ]),
  },
};
</script>

<style></style>
