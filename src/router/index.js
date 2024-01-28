import Router from "vue-router";

Vue.use(Router);

export const routes = [{
    path: "/",
    name: "home",
    component: () =>
        import ("../App.vue")
}, ];

const router = new Router({
    mode: "history",
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) return savedPosition;
        return { x: 0, y: 0 };
    },
    routes,
});

export default router;