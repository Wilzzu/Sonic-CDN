import axios, { AxiosResponse } from 'axios'

export const deleteFile = async (fileName: string): Promise<AxiosResponse> => {
  return await axios.delete(`${import.meta.env.VITE_API_URL}/api/file/delete`, {
    data: { fileName },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_PASSWORD}`
    }
  })
}
