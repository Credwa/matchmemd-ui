export type LoginKeys = 'email' | 'password'
export type LoginValues = string
export type LoginForm = Record<LoginKeys, LoginValues>

type RegisterKeys = 'firstName' | 'lastName' | LoginKeys
export type RegisterValues = string
export type RegisterForm = Record<RegisterKeys, RegisterValues>

export type UTCNumber = number

export interface UserProfile {
  email: string
  firstName: string
  lastName: string
  role: string
  created_at: UTCNumber
  last_signed_in: UTCNumber
  registrationComplete: boolean
}
