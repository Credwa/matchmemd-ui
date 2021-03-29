import { MutationTree } from 'vuex'
import { State } from './state'
import { types } from '../services/firebase'
export enum Mutation {
  INCREMENT = 'INCREMENT',
  SET_USER_PROFILE = 'SET_USER_PROFILE'
}

export type Mutations<S = State> = {
  [Mutation.INCREMENT](state: S, payload: number): void
  [Mutation.SET_USER_PROFILE](state: S, userData: types.firestore.DocumentData): void
}

export const mutations: MutationTree<State> & Mutations = {
  [Mutation.INCREMENT](state: State, payload = 1) {
    state.count += payload
  },
  [Mutation.SET_USER_PROFILE](state: State, userData: types.firestore.DocumentData) {
    state.userProfile = userData
  }
}
