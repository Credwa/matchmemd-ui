/* eslint-disable space-before-function-paren */
import axios, { AxiosResponse } from 'axios'
import { auth } from '../services/firebase'

// # Gender              string `json:"e13_T"`
// # DateOfBirth         int    `json:"e14_N"`
// # MedicalStatus       string `json:"e15_T"`
// # Specialties         string `json:"e9_T"`
// # HasClinicalInterest string `json:"e16_T"`
// # Clinicals           string `json:"e10_T"`
// # VisaRequired        string `json:"e12_T"`
// # School              string `json:"e5_T"`
// # StartDate           string `json:"e11_T"`
interface CustomRequestCustomFields {
  e14_N?: number
  e10_T?: string
  e13_T?: string
  e16_T?: string
  e5_T?: string
  e9_T?: string
  e11_T?: string
  e12_T?: string
  e15_T?: string
}
export interface ContactRequest {
  email?: string
  first_name?: string
  last_name?: string
  country?: string
  custom_fields?: CustomRequestCustomFields
}

const getHost = () => {
  const host = window.location.host
  if (host.match(/localhost/i)) {
    return 'localhost:8765'
  }

  return import.meta.env.VITE_FUNCTIONS_URL
}

axios.defaults.headers.post['Content-Type'] = 'application/json'

export async function passwordResetRequest(
  email: string
): Promise<AxiosResponse<{ email: string; host: string }>> {
  return await axios.post<{ email: string; host: string }>(getHost() + '/password-reset-request', {
    email: email,
    host: import.meta.env.VITE_HOST
  })
}

export async function verifyEmailRequest(
  email: string,
  firstName: string
): Promise<AxiosResponse<{ email: string; host: string; first_name: string }>> {
  return await axios.post<{ email: string; host: string; first_name: string }>(
    getHost() + '/verify-email-request',
    {
      email: email,
      host: import.meta.env.VITE_HOST,
      first_name: firstName
    }
  )
}

export async function contactRequest(payload: ContactRequest): Promise<unknown> {
  return auth.currentUser?.getIdToken().then(async (idToken) => {
    return await axios.put<ContactRequest>(getHost() + '/contact-request', payload, {
      headers: { Authorization: `Bearer ${idToken}` }
    })
  })
}
