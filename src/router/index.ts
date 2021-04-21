import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import { auth } from '../services/firebase'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Dashboard from '@/views/Dashboard.vue'
import { Action, store } from '../store'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/dashboard'
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
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import(/* webpackChunkName: "forgot-password" */ '@/views/ForgotPassword.vue')
  },
  {
    path: '/email-actions',
    name: 'EmailActions',
    component: () => import(/* webpackChunkName: "email-actions" */ '@/views/EmailActions.vue'),
    beforeEnter: (to, from, next) => {
      if (to.query.mode && to.query.oobCode && to.query.continueUrl) {
        next()
      } else {
        next('login')
      }
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
    path: '/onboarding',
    name: 'Onboarding',
    component: () => import(/* webpackChunkName: "onboard" */ '@/views/Onboard.vue'),
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

router.beforeEach((to, _, next) => {
  auth.currentUser?.getIdToken().then((idToken) => {
    console.log(idToken)
  })
  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth)
  const userProfile = store.getters.getUserProfile
  if (auth.currentUser && (to.name === 'Login' || to.name === 'Register')) {
    next('/dashboard')
  } else if (
    requiresAuth &&
    auth.currentUser &&
    !userProfile.registrationComplete &&
    to.name !== 'Onboarding'
  ) {
    next('/onboarding')
  } else if (
    requiresAuth &&
    auth.currentUser &&
    userProfile.registrationComplete &&
    to.name === 'Onboarding'
  ) {
    next('/dashboard')
  } else if (requiresAuth && !auth.currentUser) {
    next('/login')
  } else {
    next()
  }
})

export default router
