<template>
  <v-btn text icon @click="click" :color="btnColor" :disabled="disabled">
    <v-icon :size="size">{{ name }}</v-icon>
  </v-btn>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: undefined,
    },
    btnColor: {
      type: String,
      default: "primary",
    },
    disabled: {
      type: [Boolean, Function],
      default: false,
    },
    size: {
      type: [String, Number],
      default: 22,
    },
    click: {
      type: Function,
      default: () => {},
    },
  },
};
</script>
