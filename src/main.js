import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";

import store from "./store";

import Strings from "./utils/strings";
import Colors from "./utils/colors";


Vue.config.productionTip = false;

Vue.prototype.$strings = Strings;
Vue.prototype.$colors = Colors;

new Vue({
    vuetify,
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");