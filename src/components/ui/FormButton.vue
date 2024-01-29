<template>
  <v-btn
    :min-width="small ? '' : '150px'"
    :min-height="small ? '' : '42px'"
    class="py-2 label"
    :dark="dark"
    :color="background"
    :style="{ background: outlined ? null : background }"
    :loading="isLoading"
    :outlined="outlined"
    :disabled="disabled"
    :block="block"
    @click="click"
  >
    <span :style="{ color: labelColor }">
      {{ label }}
    </span>
  </v-btn>
</template>
<script>
export default {
  props: {
    background: {
      type: String,
      default: "primary",
    },
    label: {
      type: String,
      default: "",
    },
    dark: {
      type: Boolean,
      default: false,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    small: {
      type: Boolean,
      default: false,
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    labelColor: {
      type: String,
      default: "#fff",
    },
    block: {
      type: Boolean,
      default: false,
    },
    click: {
      type: Function,
      default: () => {},
    },
  },
};
</script>

<style scoped>
.label {
  font-size: 12pt;
}
</style>
