import { fromUnixTime } from 'date-fns'
import { types } from '../services/firebase'
import { RegisterForm } from '../types'

export const APP_LOADED = 'APP_LOADED'
export const LOGIN_FAILED = 'LOGIN_FAILED'
export const REGISTRATION_FAILED = 'REGISTRATION_FAILED'
export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST'
export const ONBOARDING_BEGIN = 'ONBOARDING_BEGIN'
export const ONBOARDING_SKIP = 'SKIP_ONBOARDING'
export const ONBOARDING_NEXT = 'ONBOARDING_NEXT'
export const ONBOARDING_BACK = 'ONBOARDING_BACK'
export const BIRTHDAY_SELECTED = 'BIRTHDAY_SELECTED'
export const COUNTRY_SELECTED = 'COUNTRY_SELECTED'

const NEW_USER = 'NEW USER'
const LOGIN = 'LOGIN'

export const mixpanel_user_register = (user: types.User, form: RegisterForm): void => {
  mixpanel.alias(user.uid, mixpanel.get_distinct_id())
  mixpanel.people.set({
    $email: form.email,
    firstName: form.firstName,
    lastName: form.lastName,
    'Sign up date': fromUnixTime((<{ a: number }>user.metadata).a), // Send dates in ISO timestamp format (e.g. "2020-01-02T21:07:03Z")
    USER_ID: user.uid
  })
  mixpanel.track<null>(NEW_USER)
}

export const mixpanel_user_login = (user: types.User): void => {
  mixpanel.identify(user.uid)
  mixpanel.track<null>(LOGIN)
}

export const mixpanel_user_return = (user: types.User): void => {
  mixpanel.identify(user.uid)
  mixpanel.track<null>(LOGIN)
}
