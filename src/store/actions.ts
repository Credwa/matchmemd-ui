import { ActionTree, ActionContext } from 'vuex'
import router from '../router'
import * as firebase from '../services/firebase'
import { DEFAULT_USER, State } from './state'
import { Mutations, Mutation } from './mutations'
import { LoginForm, RegisterForm, UserProfile } from '../types/'
import { mixpanel_user_register, mixpanel_user_login } from '../services/mixpanel-events'

export enum Action {
  LOGIN = 'LOGIN',
  FETCH_USER_PROFILE = 'FETCH_USER_PROFILE',
  REGISTER = 'REGISTER',
  LOGOUT = 'LOGOUT',
  UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE',
  UPLOAD_PROFILE_PICTURE = 'UPLOAD_PROFILE_PICTURE',
  DOWNLOAD_PROFILE_PICTURE = 'DOWNLOAD_PROFILE_PICTURE',
  REGISTER_WITH_PROVIDER = 'REGISTER_WITH_PROVIDER',
  LOGIN_WITH_PROVIDER = 'LOGIN_WITH_PROVIDER'
}

type Provider = 'google' | 'facebook'

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, State>, 'commit'>

export interface Actions {
  [Action.LOGIN]({ dispatch }: AugmentedActionContext, form: LoginForm): void
  [Action.LOGIN_WITH_PROVIDER]({ dispatch }: AugmentedActionContext, provider: Provider): void
  [Action.FETCH_USER_PROFILE]({ commit }: AugmentedActionContext, user: firebase.types.User): void
  [Action.UPDATE_USER_PROFILE](
    { commit, state }: AugmentedActionContext,
    payload: Partial<UserProfile>
  ): void
  [Action.REGISTER]({ dispatch }: AugmentedActionContext, form: RegisterForm): void
  [Action.REGISTER_WITH_PROVIDER]({ dispatch }: AugmentedActionContext, provider: Provider): void
  [Action.LOGOUT]({ commit }: AugmentedActionContext): void
  [Action.UPLOAD_PROFILE_PICTURE]({ dispatch }: AugmentedActionContext, blob: Blob): void
  [Action.DOWNLOAD_PROFILE_PICTURE]({ state }: AugmentedActionContext): void
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

  async [Action.LOGIN_WITH_PROVIDER]({ dispatch }, provider: Provider) {
    // sign user up
    const DEFAULT_ROLE = 'USER'
    let authProvider:
      | firebase.types.auth.GoogleAuthProvider
      | firebase.types.auth.FacebookAuthProvider

    switch (provider) {
      case 'google':
        authProvider = firebase.googleAuthProvider
        break
      case 'facebook':
        authProvider = firebase.facebookAuthProvider
        break
    }

    const { user } = await firebase.auth.signInWithPopup(authProvider)
    // // create user profile object in userCollections
    if (user) {
      const firstName = user.displayName?.split(' ')[0] as string
      const lastName = user.displayName?.split(' ')[1] as string
      await firebase.usersCollection.doc(user.uid).set({
        email: user.email as string,
        firstName: user.displayName?.split(' ')[0] as string,
        lastName: user.displayName?.split(' ')[1] as string,
        role: DEFAULT_ROLE,
        created_at: Number((<{ a: number }>user.metadata).a),
        last_signed_in: Number((<{ b: number }>user.metadata).b),
        registrationComplete: false
      })
      mixpanel_user_register(user, {
        email: user.email as string,
        firstName,
        lastName,
        password: '123'
      })
      // fetch user profile and set in state
      dispatch(Action.FETCH_USER_PROFILE, user)
      return { firstName, lastName, email: user.email as string, verified: user.emailVerified }
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

  async [Action.REGISTER_WITH_PROVIDER]({ dispatch }, provider: Provider) {
    // sign user up
    const DEFAULT_ROLE = 'USER'
    let authProvider:
      | firebase.types.auth.GoogleAuthProvider
      | firebase.types.auth.FacebookAuthProvider

    switch (provider) {
      case 'google':
        authProvider = firebase.googleAuthProvider
        break
      case 'facebook':
        authProvider = firebase.facebookAuthProvider
        break
    }

    const { user } = await firebase.auth.signInWithPopup(authProvider)
    // // create user profile object in userCollections
    if (user) {
      const firstName = user.displayName?.split(' ')[0] as string
      const lastName = user.displayName?.split(' ')[1] as string
      await firebase.usersCollection.doc(user.uid).set({
        email: user.email as string,
        firstName: user.displayName?.split(' ')[0] as string,
        lastName: user.displayName?.split(' ')[1] as string,
        role: DEFAULT_ROLE,
        created_at: Number((<{ a: number }>user.metadata).a),
        last_signed_in: Number((<{ b: number }>user.metadata).b),
        registrationComplete: false
      })
      mixpanel_user_register(user, {
        email: user.email as string,
        firstName,
        lastName,
        password: '123'
      })
      // fetch user profile and set in state
      dispatch(Action.FETCH_USER_PROFILE, user)
      return { firstName, lastName, email: user.email as string, verified: user.emailVerified }
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
  },

  async [Action.UPDATE_USER_PROFILE]({ commit, state }, payload: Partial<UserProfile>) {
    if (firebase.auth.currentUser?.uid) {
      await firebase.usersCollection
        .doc(firebase.auth.currentUser?.uid)
        .set(payload, { merge: true })
      commit(Mutation.SET_USER_PROFILE, { ...state.userProfile, ...payload })
    }
  },

  async [Action.UPLOAD_PROFILE_PICTURE]({ dispatch }, blob: Blob) {
    await firebase.storageRef.child(`ProfilePictures/${firebase.auth.currentUser?.uid}`).put(blob)
    dispatch(Action.UPDATE_USER_PROFILE, { imageUploaded: true })
  },

  async [Action.DOWNLOAD_PROFILE_PICTURE]({ state }) {
    if (state.userProfile.imageUploaded) {
      const userProfilePictureRef = firebase.storage.ref(
        `ProfilePictures/${firebase.auth.currentUser?.uid}`
      )
      return await userProfilePictureRef.getDownloadURL()
    } else {
      return null
    }
  }
}
