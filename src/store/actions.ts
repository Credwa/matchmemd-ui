import { ActionTree, ActionContext } from 'vuex'
import router from '../router'
import * as firebase from '../services/firebase'
import { DEFAULT_USER, State } from './state'
import { Mutations, Mutation } from './mutations'
import { LoginForm, RegisterForm } from '../types/'
import { mixpanel_user_register, mixpanel_user_login } from '../services/mixpanel-events'

export enum Action {
  LOGIN = 'LOGIN',
  FETCH_USER_PROFILE = 'FETCH_USER_PROFILE',
  REGISTER = 'REGISTER',
  LOGOUT = 'LOGOUT'
}

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, State>, 'commit'>

export interface Actions {
  [Action.LOGIN]({ dispatch }: AugmentedActionContext, form: LoginForm): void
  [Action.FETCH_USER_PROFILE]({ commit }: AugmentedActionContext, user: firebase.types.User): void
  [Action.REGISTER]({ dispatch }: AugmentedActionContext, form: RegisterForm): void
  [Action.LOGOUT]({ dispatch }: AugmentedActionContext): void
}

export const actions: ActionTree<State, State> & Actions = {
  async [Action.LOGIN]({ dispatch }, form) {
    // sign user in
    const { user } = await firebase.auth.signInWithEmailAndPassword(form.email, form.password)

    if (user) {
      mixpanel_user_login(user)
      // fetch user profile and set in state
      dispatch(Action.FETCH_USER_PROFILE, user)
    }
  },

  async [Action.LOGOUT]({ commit }) {
    await firebase.auth.signOut()

    // clear userProfile and redirect to /login
    commit(Mutation.SET_USER_PROFILE, DEFAULT_USER)
    router.push('/login')
  },

  async [Action.REGISTER]({ dispatch }, form) {
    // sign user up
    const DEFAULT_ROLE = 'USER'
    const { user } = await firebase.auth.createUserWithEmailAndPassword(form.email, form.password)
    // create user profile object in userCollections
    if (user) {
      await firebase.usersCollection.doc(user.uid).set({
        email: form.email,
        firstName: form.firstName,
        lastName: form.lastName,
        role: DEFAULT_ROLE,
        created_at: Number((<{ a: number }>user.metadata).a),
        last_signed_in: Number((<{ b: number }>user.metadata).b),
        registrationComplete: false
      })
      mixpanel_user_register(user, form)
      // fetch user profile and set in state
      dispatch(Action.FETCH_USER_PROFILE, user)
    }
  },

  async [Action.FETCH_USER_PROFILE]({ commit }, user) {
    // fetch user profile
    if (user) {
      const userProfile = await firebase.usersCollection.doc(user.uid).get()
      // set user profile in state
      if (userProfile) {
        commit(Mutation.SET_USER_PROFILE, userProfile.data())
        const previousRoute = router.options.history.state.back
        if (
          previousRoute !== '/login' &&
          previousRoute !== '/register' &&
          router.currentRoute.value.path !== '/login' &&
          router.currentRoute.value.path !== '/register'
        ) {
          mixpanel.identify(user.uid)
        }
        if (
          router.currentRoute.value.path === '/login' ||
          router.currentRoute.value.path === '/register'
        ) {
          router.push('/dashboard')
        }
      }
    }
  }
}
