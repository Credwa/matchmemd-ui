import axios, { AxiosResponse } from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/json'

export async function passwordResetRequest(
  email: string
): Promise<AxiosResponse<{ email: string; host: string }>> {
  return await axios.post<{ email: string; host: string }>(
    import.meta.env.VITE_FUNCTIONS_URL + '/password-reset-request',
    {
      email: email,
      host: import.meta.env.VITE_HOST
    }
  )
}
