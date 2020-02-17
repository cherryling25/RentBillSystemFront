import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue')
  }
]

// { path: '/', component: () => import('@/views/login')},
//   { path: '/success', component: () => import('@/views/success')},
//   { path: '/error', component: () => import('@/views/error'), hidden: true },
//   { path: '/home/:id', component: () => import('@/views/Home')}


const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
