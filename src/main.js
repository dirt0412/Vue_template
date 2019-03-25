// entry file
import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import store from './store'
import VueRouter from 'vue-router'
import { routes } from './router/router';
import BootstrapVue from 'bootstrap-vue'
import money from 'v-money'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faEdit, faMinusSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faMinusSquare, faEdit)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

const router = new VueRouter({
  routes,
  mode: 'history'
})

Vue.use(BootstrapVue);
Vue.use(money, { precision: 2 })

new Vue({
  render: h => h(App),
  Vuex,
  store,
  router
}).$mount('#app')
