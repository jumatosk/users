<template>
  <div class="d-flex flex-grow-1 flex-column">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Visualizar usuário</div>
        <Breadcrumbs :breadcrumbs="breadcrumbs" />
      </div>
    </div>
    <v-card class="pa-2">
      <v-row>
        <v-col cols="12" sm="8" md="8">
          <TextField v-model="form.nome" :label="'Nome'" disabled />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="4" md="4">
          <TextField
            v-model="form.cpf"
            :label="'CPF'"
            v-mask="'###.###.###-##'"
            disabled
          />
        </v-col>
        <v-col cols="12" sm="4" md="4">
          <TextField v-model="form.email" :label="'E-mail'" disabled />
        </v-col>
        <v-col cols="12" sm="4" md="4">
          <SelectAutocomplete
            v-model="form.perfil"
            :label="'Perfil'"
            item-text="nome"
            :items="itemsPerfis"
            disabled
          />
        </v-col>
      </v-row>
      <fieldset>
        <legend>Endereços</legend>
        <v-row>
          <br />
          <v-col cols="12" sm="12" md="12">
            <Datatable :data-prop="form.enderecos" :headersProp="headers">
            </Datatable>
          </v-col>
        </v-row>
      </fieldset>

      <v-card-actions>
        <v-spacer></v-spacer>
        <FormButton
          :click="() => $router.go(-1)"
          outlined
          :label="$strings.btn_voltar"
          :labelColor="'primary'"
        />
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import FormButton from "../../../components/ui/FormButton.vue";
import Breadcrumbs from "../../../components/ui/Breadcrumbs.vue";
import IconButton from "../../../components/ui/IconButton.vue";
import Datatable from "../../../components/ui/Datatable.vue";
import TextField from "../../../components/input/TextField.vue";
import SelectAutocomplete from "../../../components/input/SelectAutocomplete.vue";
import { constants } from "../_constants";
import { getItemById, getItem as getItems } from "../../../storage/read";

export default {
  name: "usuarioForm",
  components: {
    FormButton,
    Breadcrumbs,
    IconButton,
    Datatable,
    TextField,
    SelectAutocomplete,
  },
  data() {
    return {
      form: { ...constants.form },
      breadcrumbs: [...constants.breadcrumbsShow],
      headers: [...constants.headersAdrress],
      itemsPerfis: [],
    };
  },
  mounted() {
    this.itemsPerfis = getItems(this.$keys.PERFIS);
    this.headers.pop();
  },
  methods: {},
  watch: {
    "$route.params.id": {
      handler(val) {
        if (val) {
          let keys = Object.keys(this.form);
          keys.forEach((i) => {
            this.form[i] = getItemById(this.$keys.USUARIOS, val)[i];
          });
        }
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
