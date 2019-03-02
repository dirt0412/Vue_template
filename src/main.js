// entry file

import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import store from './store'
import VueRouter from 'vue-router'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  Vuex,
  store,
  VueRouter
}).$mount('#app')
