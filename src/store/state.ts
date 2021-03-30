import { UserProfile } from '../types'

export interface State {
  debug: boolean
  version: string
  isInitialized: boolean
  count: number
  userProfile: UserProfile
}

export const DEFAULT_USER: UserProfile = {
  firstName: '',
  lastName: '',
  email: '',
  registrationComplete: false,
  created_at: 0,
  last_signed_in: 0,
  role: 'USER'
}

const versionString = import.meta.env.MODE === 'development' ? _APP_VERSION + '-dev' : _APP_VERSION

export const state: State = {
  debug: import.meta.env.MODE === 'development',
  version: versionString,
  isInitialized: false,
  count: 0,
  userProfile: DEFAULT_USER
}
