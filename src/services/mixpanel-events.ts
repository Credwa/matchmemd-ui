import { fromUnixTime } from 'date-fns'
import { types } from '../services/firebase'
import { RegisterForm } from '../types'

export const APP_LOADED = 'APP_LOADED'
export const LOGIN_FAILED = 'LOGIN_FAILED'
export const LOGOUT = 'LOGOUT'
export const REGISTRATION_FAILED = 'REGISTRATION_FAILED'
export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST'
export const ONBOARDING_BEGIN = 'ONBOARDING_BEGIN'
export const ONBOARDING_SKIP = 'SKIP_ONBOARDING'
export const ONBOARDING_NEXT = 'ONBOARDING_NEXT'
export const ONBOARDING_BACK = 'ONBOARDING_BACK'
export const BIRTHDAY_SELECTED = 'BIRTHDAY_SELECTED'
export const COUNTRY_SELECTED = 'COUNTRY_SELECTED'
export const ONBOARDING_STEPPER_CHANGED = 'ONBOARDING_STEPPER_CHANGED'
export const ONBOARDING_GENDER_CHANGE = 'ONBOARDING_GENDER_CHANGE'
export const ONBOARDING_MEDICAL_STATUS_CHANGE = 'ONBOARDING_MEDICAL_STATUS_CHANGE'
export const ONBOARDING_CLINICAL_INTEREST_CHANGED = 'ONBOARDING_CLINICAL_INTEREST_CHANGED'
export const ONBOARDING_START_DATE_CHANGED = 'ONBOARDING_START_DATE_CHANGED'
export const ONBOARDING_VISA_CHANGED = 'ONBOARDING_VISA_CHANGED'
export const ONBOARDING_CLINICAL_CHANGED = 'ONBOARDING_CLINICAL_CHANGED'
export const ONBOARDING_SPECIALTIES_CHANGED = 'ONBOARDING_SPECIALTIES_CHANGED'
export const ONBOARDING_FINISHED = 'ONBOARDING_FINISHED'
export const ONBOARDING_SPECIALTIES_SELECT_ALL = 'ONBOARDING_SPECIALTIES_SELECT_ALL'
export const ONBOARDING_SPECIALTIES_REMOVE_ALL = 'ONBOARDING_SPECIALTIES_REMOVE_ALL'
export const ONBOARDING_UPLOADED_PROFILE_PICTURE = 'ONBOARDING_UPLOADED_PROFILE_PICTURE'
export const DASHBOARD_REVIEW_PROFILE = 'DASHBOARD_REVIEW_PROFILE'

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
