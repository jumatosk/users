<template>
  <div class="d-flex flex-grow-1 flex-column">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">
          {{ $route.params.id ? "Editar perfil" : "Novo perfil" }}
        </div>
        <Breadcrumbs :breadcrumbs="breadcrumbs" />
      </div>
    </div>
    <v-card class="pa-2">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row>
          <v-col cols="12" sm="12" md="12">
            <TextField
              v-model="form.nome"
              :label="'Nome'"
              :maxlength="255"
              :rules="required"
              required
            />
          </v-col>
        </v-row>

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
import TextField from "../../../components/input/TextField.vue";
import { constants } from "../_constants";
import { create, setItemId, alreadyExist } from "../../../storage/create";

export default {
  name: "perfisForm",
  components: {
    FormButton,
    Breadcrumbs,
    TextField,
  },
  beforeCreate() {},
  data() {
    return {
      valid: true,
      formValidated: true,
      required: [(v) => !!v || "Campo obrigatório"],
      form: { ...constants.form },
      breadcrumbs: [...constants.breadcrumbsForm],
    };
  },
  async mounted() {},
  computed: {},
  methods: {
    async save() {
      this.formValidated = this.$refs.form.validate();
      if (!this.formValidated) {
        return false;
      }
      if (alreadyExist("perfis", this.form.nome)) {
        Swal.message(
          this.$strings.atencao,
          this.$strings.msg_nome_existente,
          this.$strings.icon_warning
        );
        return;
      }
      this.form.id = setItemId("perfis");

      const response = create("perfis", this.form);
      if (response.status == 201) {
        this.$router.push({ name: "perfis" });
        Swal.messageToast(this.$strings.msg_adicionar, "success");
      }
    },
  },
  watch: {},
};
</script>

<style lang="scss" scoped></style>
