export default [{
        path: "/usuarios",
        name: "usuarios",
        component: () =>
            import ("@/pages/users"),
    },
    {
        path: "/usuarios/cadastrar",
        name: "usuarios-cadastrar",
        component: () =>
            import ("@/pages/users/_components/form"),
    },
    {
        path: "/usuarios/editar/:id",
        name: "usuarios-editar",
        component: () =>
            import ("@/pages/users/_components/form"),
    },
    {
        path: "/usuarios/visualizar/:id",
        name: "usuarios-visualizar",
        component: () =>
            import ("@/pages/users/_components/show"),
    },
];