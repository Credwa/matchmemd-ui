import { MutationTree } from 'vuex'
import { State } from './state'
import { types } from '../services/firebase'
import { UserProfile } from '../types'
export enum Mutation {
  INCREMENT = 'INCREMENT',
  SET_USER_PROFILE = 'SET_USER_PROFILE'
}

export type Mutations<S = State> = {
  [Mutation.SET_USER_PROFILE](state: S, userData: UserProfile): void
}

export const mutations: MutationTree<State> & Mutations = {
  [Mutation.SET_USER_PROFILE](state: State, userData: UserProfile) {
    state.userProfile = userData
  }
}
