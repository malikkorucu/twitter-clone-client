import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbvue/lib/css/mdb.min.css";
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "normalize.css";
import VueResource from "vue-resource";
import VueCookies from "vue-cookies";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-default.css";
import { Picker } from "emoji-mart-vue";
import moment from 'moment'
import 'moment/locale/tr' 
import VueMoment from 'vue-moment'

Vue.use(Picker);
Vue.use(VueMoment, { moment })
Vue.use(require("vue-cookies"));

Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.use(VueCookies);
Vue.$cookies.config("7d");
Vue.use(VueToast);

const dev = true

Vue.http.options.root = dev ? "http://localhost:5000/api/" : "https://twitter-clone-vue.herokuapp.com/api/"
Vue.http.options.socketUrl = dev ? "http://localhost:5000" : "https://twitter-clone-vue.herokuapp.com"

Vue.directive("click-outside", {
  priority: 700,
  bind() {
    let self = this;
    this.event = function (event) {
      self.vm.$emit(self.expression, event);
    };
    this.el.addEventListener("click", this.stopProp);
    document.body.addEventListener("click", this.event);
  },

  unbind() {
    this.el.removeEventListener("click", this.stopProp);
    document.body.removeEventListener("click", this.event);
  },
  stopProp(event) {
    event.stopPropagation();
  },
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
