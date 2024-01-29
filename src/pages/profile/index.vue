<template>
  <div class="d-flex flex-grow-1 flex-column">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Perfis</div>
        <Breadcrumbs :breadcrumbs="breadcrumbs" />
      </div>
      <v-spacer></v-spacer>
      <AddButton :currentRoutePath="$router.currentRoute.path" />
    </div>
    <v-card class="pa-2 elevation-0">
      <Header class="mb-3">
        <template v-slot:buttons>
          <v-col cols="12" sm="12" md="6">
            <v-text-field
              v-model="buscar"
              append-icon="mdi-magnify"
              hide-details
              dense
              clearable
              outlined
              placeholder="Buscar"
            ></v-text-field>
          </v-col>
        </template>
      </Header>
      <DataTable :headersProp="headers" :dataProp="items"> </DataTable>
    </v-card>
  </div>
</template>

<script>
import Breadcrumbs from "../../components/ui/Breadcrumbs.vue";
import DataTable from "../../components/ui/Datatable.vue";
import Header from "../../components/ui/Header.vue";
import IconButton from "../../components/ui/IconButton.vue";
import AddButton from "../../components/ui/AddButton.vue";
import { constants } from "./_constants";
import { getItem } from "../../storage/read";

export default {
  components: {
    Breadcrumbs,
    DataTable,
    Header,
    IconButton,
    AddButton,
  },
  data() {
    return {
      breadcrumbs: [...constants.breadcrumbsIndex],
      headers: [...constants.headers],
      items: [],
      buscar: null,
    };
  },
  beforeCreate() {},
  mounted() {
    this.items = getItem("perfis");
  },
  computed: {},
  methods: {},
  watch: {},
};
</script>
