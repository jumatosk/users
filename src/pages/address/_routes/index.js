export default [{
        path: "/enderecos",
        name: "enderecos",
        component: () =>
            import ("@/pages/address"),
    },
    {
        path: "/enderecos/cadastrar",
        name: "enderecos-cadastrar",
        component: () =>
            import ("@/pages/address/_components/form"),
    },
    {
        path: "/enderecos/editar/:id",
        name: "enderecos-editar",
        component: () =>
            import ("@/pages/address/_components/form"),
    },
];