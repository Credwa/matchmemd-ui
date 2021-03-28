import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login',
    meta: {
      title: 'About Page - Example App'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/policy',
    name: 'Policy',
    component: () => import(/* webpackChunkName: "policy" */ '@/views/Policy.vue')
  },
  {
    path: '/terms',
    name: 'Terms',
    component: () => import(/* webpackChunkName: "terms" */ '@/views/Terms.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
