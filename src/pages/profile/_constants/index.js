const form = {
    id: null,
    nome: null,
};

const breadcrumbsIndex = [{
        text: "Perfis",
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
    { text: "Nome", value: "nome", align: "left" },
    { text: "Ação", value: "acao" },
];

export const constants = {
    form,
    breadcrumbsIndex,
    breadcrumbsForm,
    headers,
};