export default [{
        path: "/perfis",
        name: "perfis",
        component: () =>
            import ("@/pages/profile"),
    },
    {
        path: "/perfis/cadastrar",
        name: "perfil-cadastrar",
        component: () =>
            import ("@/pages/profile/_components/form"),
    },
];