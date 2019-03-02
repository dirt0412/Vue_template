import Vue from 'vue'
import VueRouter from 'vue-router'

import List from '../components/List.vue'
import Login from '../components/login.vue'
import NotFound from '../components/NotFound.vue'
import SecureComponent from '../components/SecureComponent.vue'

Vue.use(VueRouter)

export const routes = [
    { path: '/', name: 'list', component: List },
    { path: '/list', name: 'list', component: List },
    { path: '/login', name: 'login', component: Login, meta: { guest: true } },
    { path: "/secure", name: "secure", component: SecureComponent },
    // {
    //     path: '/tickets', component: TicketsLayout, meta: { private: true }, children: [
    //         { path: '', name: 'tickets', component: Tickets },
    //         { path: 'new', name: 'new-ticket', component: NewTicket },
    //         { path: ':id', name: 'ticket', component: Ticket, props: true },
    //     ]
    // },
    { path: '*', component: NotFound },
]

// const router = new VueRouter({
//     routes,
//     mode: 'history',
//     scrollBehavior(to, from, savedPosition) {
//         if (savedPosition) {
//             return savedPosition
//         }
//         if (to.hash) {
//             return { selector: to.hash }
//         }
//         return { x: 0, y: 0 }
//     },
// })

// export default routers