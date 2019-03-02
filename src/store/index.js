import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: () => ({
        user: null,
        notifications: [],
        //account: {}
    }),

    mutations: {

        SET_USER: function (state, user) {
            state.user = user
        },
        SET_NOTIFICATION: function (state, notification) {
            state.notifications.push(notification)
        }
    },

    actions: {
        async login({ commit }, { username, password }) {
            const data = await axios.post('http://localhost:3000/api/login/', { mail: username, password: password })
            if (data.status) {
                commit('SET_USER', data.user) // userdata
            }
            return data
        },

    }
})