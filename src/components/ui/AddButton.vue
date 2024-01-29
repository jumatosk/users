<template>
  <v-btn dark color="primary" :to="`${currentRoutePath}/cadastrar`">
    Adicionar
  </v-btn>
</template>

<script>
export default {
  name: "AddButton",
  props: {
    currentRoutePath: String,
  },
};
</script>
