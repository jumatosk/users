<template>
  <v-app>
    <component :is="currentLayout">
        <router-view />
    </component>
  </v-app>
</template>

<script>
import defaultLayout from "./layout/DefaultLayout.vue";

export default {
  name: "App",
  components: {
    defaultLayout,
  },
  data: () => ({}),
  computed: {
    currentLayout: function () {
      const layout = this.$route.meta.layout || "default";

      return layout + "Layout";
    },
  },
};
</script>
