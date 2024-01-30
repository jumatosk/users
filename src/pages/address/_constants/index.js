const form = {
    id: null,
    logradouro: null,
    cep: null,
};

const breadcrumbsIndex = [{
        text: "Endereços",
        disabled: false,
        href: "#",
    },
    {
        text: "Listar",
    },
];

const breadcrumbsForm = [{
        text: "Perfis",
        disabled: false,
        to: "/perfis",
        exact: true,
    },
    {
        text: "Cadastrar",
    },
];

const headers = [
    { text: "Logradouro", value: "logradouro", align: "left" },
    { text: "CEP", value: "cep", align: "left" },
    { text: "Ação", value: "acao" },
];

export const constants = {
    form,
    breadcrumbsIndex,
    breadcrumbsForm,
    headers,
};