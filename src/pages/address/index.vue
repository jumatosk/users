<template>
  <div class="d-flex flex-grow-1 flex-column">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Endereços</div>
        <Breadcrumbs :breadcrumbs="breadcrumbs" />
      </div>
      <v-spacer></v-spacer>
      <AddButton :currentRoutePath="$router.currentRoute.path" />
    </div>
    <v-card class="pa-2">
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
      <DataTable :headersProp="headers" :dataProp="items" :colunmCustom="['acao']">
        <template v-slot:acao="{ item }">
          <IconButton
            :onClick="() => navigateToEdit(item)"
            :name="'mdi-square-edit-outline'"
            :tooltipName="'Editar'"
            :btnColor="$colors.icon_edit"
          />
          <IconButton
            :onClick="() => deleteItemTable(item)"
            :name="'mdi-delete-outline'"
            :tooltipName="'Excluir'"
            :btnColor="'error'"
          />
        </template>
      </DataTable>
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
import { deleteItem } from "../../storage/delete";

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
    this.search()
  },
  computed: {},
  methods: {
    search() {
      this.items = getItem("enderecos");
    },
    navigateToEdit(item) {
      return this.$router.push({
        path: this.$router.currentRoute.path + `/editar/${item.id}`,
      });
    },
    async deleteItemTable(item) {
      Swal.deleteMessage(
        "Deseja excluir o endereço ",
        `${item.logradouro}`
      ).then(async (result) => {
        if (result.isConfirmed) {
          const resp = deleteItem("enderecos", item.id);
          if(resp.status == 200) {
            this.search();
            Swal.messageToast(this.$strings.msg_excluir);
          }
          if (!resp) return false;
        }
      });
    },
  },
  watch: {},
};
</script>
