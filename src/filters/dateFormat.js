import Vue from "vue";
import moment from "moment";

Vue.filter("dateformat", (date) => {
    if (!date) return "";
    return moment(date).format("DD/MM/YYYY");
});