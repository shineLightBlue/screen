import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import dataV from "@jiaminghi/data-view";
import "./assets/scss/style.scss";
import echarts from "echarts";
import Icon from "vue-awesome/components/Icon";
import "vue-awesome/icons/chart-bar.js";
import "vue-awesome/icons/chart-area.js";
import "vue-awesome/icons/chart-pie.js";
import "vue-awesome/icons/chart-line.js";
import "vue-awesome/icons/align-left.js";

Vue.prototype.$echarts = echarts;
Vue.component("icon", Icon);
Vue.use(dataV);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
