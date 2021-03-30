import { GetterTree } from 'vuex'
import { UserProfile } from '../types'
import { State } from './state'

export type Getters = {
  getUserProfile(state: State): UserProfile
}

export const getters: GetterTree<State, State> & Getters = {
  getUserProfile(state) {
    return state.userProfile
  }
}
