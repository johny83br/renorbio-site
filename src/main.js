// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import VueHead from "vue-head";
import VueAnalytics from "vue-analytics";
import "font-awesome/css/font-awesome.css";
import VModal from "vue-js-modal";
import lodash from "lodash";
import VueLodash from "vue-lodash";
import VueLazyLoad from "vue-lazyload";
import VueTouch from "vue-touch";
import App from "./App";
import router from "./router";

Vue.prototype._ = lodash;

Vue.use(VModal);

// Utilizado no Lightbox
Vue.use(VueLazyLoad);
Vue.use(VueTouch, { name: "v-touch" });

// Biblioteca JS para manipulação de listas (ordenação, filtros...)

Vue.use(lodash);
window._ = lodash;
Vue.use(VueLodash, { name: "_", lodash });

// // http://vuetips.com/bootstrap e http://www.vedovelli.com.br/frontend/adicionar-bootstrap-e-font-awesome-no-projeto-criado-com-o-vue-cli/
require("../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss");

Vue.config.productionTip = false;

export const bus = new Vue();

// Rola a página para o topo sempre que há
// mudança na rota através do vue-router
router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  next();
});

Vue.use(VueHead);

// Directive para identificar click fora de componente
Vue.directive("click-outside", {
  bind(el, binding, vNode) {
    // Provided expression must evaluate to a function.
    if (typeof binding.value !== "function") {
      // const compName = vNode.context.name;
      // let warn = `[Vue-click-outside:] provided expression "${binding.expression}" is not a function, but has to be`;
      // if (compName) {
      //   warn += `Found in component "${compName}"`;
      // }
      // console.warn(warn);
    }
    // Define Handler and cache it on the element
    const { bubble } = binding.modifiers;
    const handler = e => {
      if (bubble || (!el.contains(e.target) && el !== e.target)) {
        binding.value(e);
      }
    };
    el.__vueClickOutside__ = handler;

    // add Event Listeners
    document.addEventListener("click", handler);
  },

  unbind(el) {
    // Remove Event Listeners
    document.removeEventListener("click", el.__vueClickOutside__);
    el.__vueClickOutside__ = null;
  },
});

Vue.use(VueAnalytics, {
  id: "UA-82625671-7",
  router,
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>",
});
