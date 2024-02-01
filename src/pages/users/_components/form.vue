<template>
  <div class="d-flex flex-grow-1 flex-column">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">
          {{ $route.params.id ? "Editar usuário" : "Novo usuário" }}
        </div>
        <Breadcrumbs :breadcrumbs="breadcrumbs" />
      </div>
    </div>
    <v-card class="pa-2">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row>
          <v-col cols="12" sm="8" md="8">
            <TextField
              v-model="form.nome"
              :label="'Nome'"
              :maxlength="255"
              :rules="required"
              required
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="4" md="4">
            <TextField
              v-model="form.cpf"
              :label="'CPF'"
              v-mask="'###.###.###-##'"
              :rules="required"
              required
            />
          </v-col>
          <v-col cols="12" sm="4" md="4">
            <TextField
              v-model="form.email"
              :label="'E-mail'"
              :maxlength="255"
              :rules="[required[0], email]"
              required
            />
          </v-col>
          <v-col cols="12" sm="4" md="4">
            <SelectAutocomplete
              v-model="form.perfil"
              :label="'Perfil'"
              item-text="nome"
              :items="itemsPerfis"
              :rules="required"
              required
              returnObject
            />
          </v-col>
        </v-row>
        <fieldset>
          <legend>Endereços</legend>
          <v-row>
            <v-col cols="12" sm="6" md="6">
              <SelectAutocomplete
                v-model="formTemp.enderecoTemp"
                :label="'Endereços existentes'"
                :item-text="(text) => `${text.logradouro} - ${text.cep}`"
                :items="itemsEnderecos"
                returnObject
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" md="6">
              <TextField
                v-model="formTemp.endereco.logradouro"
                :label="'Logradouro'"
                :maxlength="255"
              />
            </v-col>
            <v-col cols="12" sm="4" md="4">
              <TextField
                v-model="formTemp.endereco.cep"
                :label="'CEP'"
                v-mask="'#####-###'"
              />
            </v-col>
            <v-col cols="12" sm="2" md="2">
              <br />
              <IconButton
                :tooltip-name="'Adicionar'"
                :on-click="() => addAddress(formTemp.endereco)"
                name="mdi-plus"
                btn-color="success"
                :size="32"
              />
            </v-col>
            <br />
            <v-col cols="12" sm="12" md="12">
              <Datatable
                :data-prop="form.enderecos"
                :headersProp="headers"
                :colunmCustom="['acao']"
              >
                <template v-slot:acao="{ item }">
                  <IconButton
                    :onClick="() => deleteItemTable(item)"
                    :name="'mdi-delete-outline'"
                    :tooltipName="'Excluir'"
                    :btnColor="'error'"
                  />
                </template>
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
          <FormButton dark :click="save" :label="$strings.btn_salvar" />
        </v-card-actions>
      </v-form>
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
import { create, setItemId, alreadyExist } from "../../../storage/create";
import { getItemById, getItem as getItems } from "../../../storage/read";
import { update } from "../../../storage/update";
import moment from "moment";

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
      valid: true,
      formValidated: true,
      required: [(v) => !!v || "Campo obrigatório"],
      email: (v) => {
        return constants.regex.validEmail.test(v) || "E-mail inválido.";
      },
      form: { ...constants.form },
      formTemp: { ...constants.formTemp },
      breadcrumbs: [...constants.breadcrumbsForm],
      headers: [...constants.headersAdrress],
      itemsPerfis: [],
      itemsEnderecos: [],
    };
  },
  mounted() {
    this.itemsPerfis = getItems("perfis");
    this.itemsEnderecos = getItems("enderecos");
  },
  methods: {
    async save() {
      this.formValidated = this.$refs.form.validate();
      if (!this.formValidated) {
        return false;
      }

      if (
        this.$route.params.id
      ) {
        this.form.id = Number(this.$route.params.id);

        const response = update("usuarios", this.form);
        if (response.status == 200) {
          this.$router.push({ name: "usuarios" });
          Swal.messageToast(this.$strings.msg_alterar, "success");
        }
      } else if (alreadyExist("usuarios", this.form.nome, "nome")&&
        !this.$route.params.id) {
        Swal.message(
          this.$strings.atencao,
          this.$strings.msg_nome_existente,
          this.$strings.icon_warning
        );
        return;
      } else {
        this.form.id = setItemId("usuarios");

        const _form = this.getFormToSaveOrUpdate();

        const response = create("usuarios", _form);
        this.saveAddress(_form.enderecos);

        if (response.status == 201) {
          this.$router.push({ name: "usuarios" });
          Swal.messageToast(this.$strings.msg_adicionar, "success");
        }
      }
    },
    saveAddress(enderecos) {
      enderecos.map((item) => {
        if (!getItemById("enderecos", item.id)) {
          create("enderecos", item);
        }
      });
    },
    addAddress(value) {
      if (this.checkIfIsInserted(value))
        return Swal.message(
          this.$strings.atencao,
          this.$strings.msg_endereco_existente,
          this.$strings.icon_warning
        );
      if (!value.id) {
        this.formTemp.endereco.id = setItemId("enderecos");
      }
      this.form.enderecos.push({ ...value });
      setTimeout(() => {
        this.resetAddressFields();
      }, 200);
    },
    getFormToSaveOrUpdate() {
      if (!this.$route.params.id) {
        this.form.created_at = moment().format("YYYY-MM-DD");
      }
      const { id, nome, cpf, email, enderecos, perfil, created_at } = this.form;
      return { id, nome, cpf, email, enderecos, perfil, created_at };
    },
    resetAddressFields() {
      let keys = Object.keys(this.formTemp.endereco);
      keys.forEach((i) => {
        this.formTemp.endereco[i] = null;
      });
      this.formTemp.enderecoTemp = {};
    },
    checkIfIsInserted(value) {
      return this.form.enderecos.find((item) => item.id == value.id);
    },
    deleteItemTable(item) {
      this.form.enderecos = this.form.enderecos.filter(
        (_item) => _item.id !== item.id
      );
    },
  },
  watch: {
    "$route.params.id": {
      handler(val) {
        if (val) {
          let keys = Object.keys(this.form);
          keys.forEach((i) => {
            this.form[i] = getItemById("usuarios", val)[i];
          });
        }
      },
      deep: true,
      immediate: true,
    },
    "formTemp.enderecoTemp": {
      handler(value) {
        if (value?.id) {
          this.addAddress(value);
        }
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>