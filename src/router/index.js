import Vue from "vue";
import Router from "vue-router";
import crudRoutes from "./crud.routes";

Vue.use(Router);

export const routes = [
    ...crudRoutes,
    {
        path: "/",
        name: "home",
        component: () =>
            import ("@/pages/home"),
    },
];

const router = new Router({
    mode: "history",
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) return savedPosition;
        return { x: 0, y: 0 };
    },
    routes,
});
export default router;