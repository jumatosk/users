<template>
  <div class="d-flex flex-grow-1 flex-column justify-center">
    <v-icon color="accent" size="250">mdi-account-group-outline</v-icon>
    <p class="title text-center text--secondary">{{ product.name }}</p>
  </div>
</template>

<script>
import {mapState} from "vuex"
export default {
computed: {
    ...mapState("app", ["product"])
}
}
</script>

<style>

</style>