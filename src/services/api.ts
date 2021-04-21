/* eslint-disable space-before-function-paren */
import axios, { AxiosResponse } from 'axios'
import { auth } from '../services/firebase'

export interface ContactRequest {
  email?: string
  first_name?: string
  last_name?: string
  country?: string
  date_of_birth?: number
  clinicals?: string
  gender?: string
  has_clinical_interest?: string
  school?: string
  specialties?: string
  start_date?: string
  visa_required?: string
  medical_status?: string
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
