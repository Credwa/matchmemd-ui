export type LoginKeys = 'email' | 'password'
export type LoginValues = string
export type LoginForm = Record<LoginKeys, LoginValues>

type RegisterKeys = 'firstName' | 'lastName' | LoginKeys
export type RegisterValues = string
export type RegisterForm = Record<RegisterKeys, RegisterValues>
