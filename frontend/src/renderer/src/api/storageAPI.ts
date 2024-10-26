import axios, { AxiosResponse } from 'axios'

export const getStorage = async (): Promise<AxiosResponse> => {
  return await axios.get(`${import.meta.env.VITE_API_URL}/api/storage`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_PASSWORD}`
    }
  })
}
