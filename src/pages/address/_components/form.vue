<template>
  <div class="d-flex flex-grow-1 flex-column pa-2">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">
          {{ $route.params.id ? "Editar endereço" : "Novo endereço" }}
        </div>
        <Breadcrumbs :breadcrumbs="breadcrumbs" />
      </div>
      <v-spacer></v-spacer>
      <IconButton
        :size="32"
        :name="'mdi-restore'"
        :tooltipName="'Voltar'"
        :on-click="() => $router.go(-1)"
      />
    </div>
    <v-card class="pa-2">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row>
          <v-col cols="12" sm="8" md="8">
            <TextField
              v-model="form.logradouro"
              :label="'Logradouro'"
              :maxlength="255"
              :rules="required"
              required
            />
          </v-col>
          <v-col cols="12" sm="4" md="4">
            <TextField
              v-model="form.cep"
              :label="'CEP'"
              v-mask="'#####-###'"
              :rules="required"
              required
            />
          </v-col>
        </v-row>

        <v-card-actions>
          <v-spacer></v-spacer>
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
import TextField from "../../../components/input/TextField.vue";
import { constants } from "../_constants";
import { create, setItemId, alreadyExist } from "../../../storage/create";
import { getItemById } from "../../../storage/read";
import { update } from "../../../storage/update";

export default {
  name: "enderecoForm",
  components: {
    FormButton,
    Breadcrumbs,
    IconButton,
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
  mounted() {
    this.breadcrumbs[1].text = "Cadastrar";
    if (this.$route.params.id !== undefined)
      this.breadcrumbs[1].text = "Editar";
  },
  computed: {},
  methods: {
    async save() {
      this.formValidated = this.$refs.form.validate();
      if (!this.formValidated) {
        return false;
      }

      if (this.$route.params.id) {
        this.form.id = Number(this.$route.params.id);

        const response = update(this.$keys.ENDERECOS, this.form);
        if (response.status == 200) {
          this.$router.push({ name: this.$keys.ENDERECOS });
          Swal.messageToast(this.$strings.msg_alterar, "success");
        }
      } else if (
        alreadyExist(
          this.$keys.ENDERECOS,
          this.form.logradouro,
          "logradouro"
        ) &&
        !this.$route.params.id
      ) {
        Swal.message(
          this.$strings.atencao,
          this.$strings.msg_endereco_existente,
          this.$strings.icon_warning
        );
        return;
      } else {
        this.form.id = setItemId(this.$keys.ENDERECOS);

        const response = create(this.$keys.ENDERECOS, this.form);
        if (response.status == 201) {
          this.$router.push({ name: this.$keys.ENDERECOS });
          Swal.messageToast(this.$strings.msg_adicionar, "success");
        }
      }
    },
  },
  watch: {
    "$route.params.id": {
      handler(val) {
        if (val) {
          let keys = Object.keys(this.form);
          keys.forEach((i) => {
            this.form[i] = getItemById(this.$keys.ENDERECOS, val)[i];
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
