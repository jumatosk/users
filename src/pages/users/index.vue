<template>
  <div class="d-flex flex-grow-1 flex-column">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Usuários</div>
        <Breadcrumbs :breadcrumbs="breadcrumbs" />
      </div>
      <v-spacer></v-spacer>
      <AddButton :currentRoutePath="$router.currentRoute.path" />
    </div>
    <v-card class="pa-2">
      <v-card class="mb-3 elevation-0">
        <v-row>
          <v-col cols="12" sm="4" md="4">
            <TextField v-model="form.nome" :label="'Nome'" :maxlength="255" />
          </v-col>
          <v-col cols="12" sm="4" md="4">
            <TextField
              v-model="form.cpf"
              :label="'CPF'"
              v-mask="'###.###.###-##'"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="4" md="4">
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="form.data_inicio"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <label>Data início</label>
                <v-text-field
                  v-model="form.date_formated_inicio"
                  prepend-inner-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  clearable
                  outlined
                  dense
                ></v-text-field>
              </template>
              <v-date-picker v-model="form.data_inicio" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">
                  Cancelar
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.menu.save(form.data_inicio)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" sm="4" md="4">
            <v-menu
              ref="menu2"
              v-model="menu2"
              :close-on-content-click="false"
              :return-value.sync="form.data_fim"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <label>Data fim</label>
                <v-text-field
                  v-model="form.date_formated_fim"
                  prepend-inner-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  clearable
                  outlined
                  dense
                  ref="dataFim"
                ></v-text-field>
              </template>
              <v-date-picker v-model="form.data_fim" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">
                  Cancelar
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.menu2.save(form.data_fim)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-row class="mt-4 mx-2">
            <IconButton
              :onClick="() => filterItems()"
              :name="'mdi-magnify'"
              :tooltipName="'Buscar'"
            />
            <IconButton
              :onClick="
                () => {
                  clearFields(),
                  search();
                }
              "
              :name="'mdi-close-circle-outline'"
              :tooltipName="'Limpar busca'"
              :btnColor="'red'"
            />
          </v-row>
        </v-row>
      </v-card>
      <DataTable
        :headersProp="headers"
        :dataProp="items"
        :colunmCustom="['acao', 'created_at']"
      >
        <template v-slot:no-data> <p>Dados não encontrados</p></template>
        <template v-slot:created_at="{ item }">
          {{ item.created_at | dateformat }}
        </template>
        <template v-slot:acao="{ item }">
          <IconButton
            :onClick="() => navigateToView(item)"
            :name="'mdi-eye-outline'"
            :tooltipName="'Visualizar'"
            :btnColor="$colors.icon_view"
          />
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
import TextField from "../../components/input/TextField.vue";
import { constants } from "./_constants";
import { getItem } from "../../storage/read";
import { deleteItem } from "../../storage/delete";
import moment from "moment";

export default {
  components: {
    Breadcrumbs,
    DataTable,
    Header,
    IconButton,
    AddButton,
    TextField,
  },
  data() {
    return {
      breadcrumbs: [...constants.breadcrumbsIndex],
      headers: [...constants.headers],
      form: { ...constants.formSearch },
      items: [],
      buscar: null,
      menu: false,
      menu2: false,
    };
  },
  beforeCreate() {},
  mounted() {
    this.search();
  },
  computed: {
  },
  methods: {
    search() {
      this.items = getItem(this.$keys.USUARIOS);
    },
    navigateToView(item) {
      return this.$router.push({
        path: this.$router.currentRoute.path + `/visualizar/${item.id}`,
      });
    },
    navigateToEdit(item) {
      return this.$router.push({
        path: this.$router.currentRoute.path + `/editar/${item.id}`,
      });
    },
    async deleteItemTable(item) {
      Swal.deleteMessage("Deseja excluir o usuário ", `${item.nome}`).then(
        async (result) => {
          if (result.isConfirmed) {
            const resp = deleteItem(this.$keys.USUARIOS, item.id);
            if (resp.status == 200) {
              this.search();
              Swal.messageToast(this.$strings.msg_excluir);
            }
            if (!resp) return false;
          }
        }
      );
    },
    filterItems() {
      let filteredItems = [];
      this.items = [];

      filteredItems = getItem(this.$keys.USUARIOS).filter((result) => {
        return (
          result.nome
            .toLowerCase()
            .includes(this.form.nome?.toLowerCase()) ||
            result.cpf.includes(this.form.cpf) ||
          moment(result.created_at).isSame(this.form.data_inicio) ||
          moment(result.created_at).isSame(this.form.data_fim) ||
          moment(result.created_at).isBetween(
            this.form.data_inicio,
            this.form.data_fim
          )
        );
      });
      this.items = [...filteredItems];
      this.$forceUpdate();
      if (
        !(
          this.form.nome ||
          this.form.cpf ||
          this.form.data_inicio ||
          this.form.data_fim
        )
      ) {
        return this.search();
      }
    },
    clearFields() {
      this.form.nome = null;
      this.form.cpf = null;
      this.form.date_formated_fim = null;
      this.form.date_formated_inicio = null;
    },
    formatDateBR(val) {
      return moment(val).format("DD/MM/YYYY");
    },
  },
  watch: {
    "form.data_inicio": {
      handler(val) {
        this.form.date_formated_inicio = this.formatDateBR(val);
      },
    },
    "form.data_fim": {
      handler(val) {
        this.form.date_formated_fim = this.formatDateBR(val);
      },
    },
  },
};
</script>
