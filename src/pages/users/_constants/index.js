const form = {
    id: null,
    nome: null,
    email: null,
    cpf: null,
    perfil: null,
    enderecos: [],
    created_at: null,
};

const formTemp = {
    endereco: { id: null, logradouro: null, cep: null },
    enderecoTemp: null,
};

const breadcrumbsIndex = [{
        text: "Usuários",
        disabled: false,
        href: "#",
    },
    {
        text: "Listar",
    },
];

const breadcrumbsForm = [{
        text: "Usuários",
        disabled: false,
        to: "/usuarios",
        exact: true,
    },
    {
        text: "Cadastrar",
    },
];

const headers = [
    { text: "Nome", value: "nome", align: "left" },
    { text: "Data de cadastro", value: "created_at", align: "left" },
    { text: "CPF", value: "cpf", align: "left" },
    { text: "E-mail", value: "email", align: "left" },
    { text: "Perfil", value: "perfil.nome", align: "left" },
    { text: "Ação", value: "acao" },
];

const headersAdrress = [
    { text: "Logradouro", value: "logradouro", align: "left" },
    { text: "CEP", value: "cep", align: "left" },
    { text: "Ação", value: "acao" },
];

const regex = {
    validEmail: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
}

export const constants = {
    form,
    formTemp,
    breadcrumbsIndex,
    breadcrumbsForm,
    headers,
    headersAdrress,
    regex,
};