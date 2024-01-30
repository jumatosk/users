import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";

import store from "./store";

import Strings from "./utils/strings";
import Colors from "./utils/colors";

import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import "./assets/scss/theme.scss";
import "./filters/dateFormat";

import VueMask from "v-mask";
Vue.use(VueMask);

Vue.use(VueSweetalert2);

import Swal from "./swal/swal";
window.Swal = Swal;

Vue.config.productionTip = false;

Vue.prototype.$strings = Strings;
Vue.prototype.$colors = Colors;

new Vue({
    vuetify,
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");