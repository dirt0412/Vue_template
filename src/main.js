// entry file

import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)//dr
Vue.prototype.$axios = axios//dr

new Vue({
  render: h => h(App),
  Vuex,
  store,
  VueAxios,
  axios,
  VueRouter
}).$mount('#app')
