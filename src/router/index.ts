import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import { auth } from '../services/firebase'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Dashboard from '@/views/Dashboard.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      redirectToDashboardIfAuth: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      redirectToDashboardIfAuth: true
    }
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
  },
  {
    path: '/register-flow',
    name: 'RegisterFlow',
    component: () => import(/* webpackChunkName: "terms" */ '@/views/RegisterFlow.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth)
  const redirectToDashboardIfAuth = to.matched.some((x) => x.meta.redirectToDashboardIfAuth)
  if (auth.currentUser && (to.name === 'Login' || to.name === 'Register')) {
    next('/dashboard')
  }
  if (requiresAuth && !auth.currentUser) {
    next('/login')
  } else {
    next()
  }
})

export default router
