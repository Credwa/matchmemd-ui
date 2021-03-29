import { ActionTree, ActionContext } from 'vuex'
import router from '../router'
import * as firebase from '../services/firebase'
import { State } from './state'
import { Mutations, Mutation } from './mutations'
import { LoginForm, RegisterForm } from '../types/'
import { ERROR_CODES } from '../services/constants'

export enum Action {
  initApp = 'initApp',
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
  [Action.initApp]({ state, commit, dispatch }: AugmentedActionContext): void
  [Action.LOGIN]({ dispatch }: AugmentedActionContext, form: LoginForm): void
  [Action.FETCH_USER_PROFILE]({ dispatch }: AugmentedActionContext, user: unknown): void
  [Action.REGISTER]({ dispatch }: AugmentedActionContext, form: RegisterForm): void
  [Action.LOGOUT]({ dispatch }: AugmentedActionContext, form: RegisterForm): void
}

export const actions: ActionTree<State, State> & Actions = {
  [Action.initApp]() {
    console.log('app inited!')
  },
  async [Action.LOGIN]({ dispatch }, form) {
    // sign user in
    const { user } = await firebase.auth.signInWithEmailAndPassword(form.email, form.password)

    // fetch user profile and set in state
    dispatch(Action.FETCH_USER_PROFILE, user)
  },

  async [Action.LOGOUT]({ commit }, form) {
    await firebase.auth.signOut()

    // clear userProfile and redirect to /login
    commit(Mutation.SET_USER_PROFILE, {})
    router.push('/login')
  },

  async [Action.REGISTER]({ dispatch }, form) {
    // sign user up
    const { user } = await firebase.auth.createUserWithEmailAndPassword(form.email, form.password)
    // create user profile object in userCollections
    if (user) {
      await firebase.usersCollection.doc(user.uid).set({
        email: form.email,
        firstName: form.firstName,
        lastName: form.lastName
      })
      // fetch user profile and set in state
      dispatch(Action.FETCH_USER_PROFILE, user)
    } else {
      throw ERROR_CODES.FAILED_TO_CREATE_USER
    }
  },

  async [Action.FETCH_USER_PROFILE]({ commit }, user) {
    // fetch user profile
    if (user) {
      const userProfile = await firebase.usersCollection.doc(user.uid).get()

      // set user profile in state
      commit(Mutation.SET_USER_PROFILE, userProfile.data())
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (
        router.currentRoute.value.path === '/login' ||
        router.currentRoute.value.path === '/register'
      ) {
        router.push('/dashboard')
        console.log('pushing')
      }
    }
  }
}
