// entry file
import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import store from './store'
import VueRouter from 'vue-router'
import { routes } from './router/router';
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

const router = new VueRouter({
  routes,
  mode: 'history'
})

Vue.use(BootstrapVue);

Vue.prototype.$axios =

  new Vue({
    render: h => h(App),
    Vuex,
    store,
    router
  }).$mount('#app')
