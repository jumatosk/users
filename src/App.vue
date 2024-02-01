<template>
  <v-app>
    <component :is="currentLayout">
      <router-view />
    </component>
  </v-app>
</template>

<script>
import defaultLayout from "./layout/DefaultLayout.vue";
import { create } from "./storage/create";
import { getItem as getItems } from "./storage/read";
import localDb from "./storage/local.db";

export default {
  name: "App",
  components: {
    defaultLayout,
  },
  data: () => ({}),
  mounted() {
    if (getItems(this.$keys.PERFIS).length === 0)
      this.createData(this.$keys.PERFIS, localDb.perfis);
    if (getItems(this.$keys.USUARIOS).length === 0)
      this.createData(this.$keys.USUARIOS, localDb.usuarios);
    if (getItems(this.$keys.ENDERECOS).length === 0)
      this.createData(this.$keys.ENDERECOS, localDb.enderecos);
  },
  methods: {
    createData(keyToSave, arrayData) {
      arrayData.forEach((element) => {
        create(keyToSave, element);
      });
    },
  },
  computed: {
    currentLayout: function () {
      const layout = this.$route.meta.layout || "default";

      return layout + "Layout";
    },
  },
};
</script>
