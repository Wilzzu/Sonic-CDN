import axios, { AxiosProgressEvent, AxiosResponse } from 'axios'
import { RefObject } from 'react'

export const uploadFile = async (
  file: File,
  onProgress: (progressEvent: AxiosProgressEvent) => void,
  controllerRef: RefObject<AbortController>
): Promise<AxiosResponse> => {
  const formData = new FormData()
  formData.append('file', file)

  return axios.post(`${import.meta.env.VITE_API_URL}/api/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${import.meta.env.VITE_PASSWORD}`
    },
    onUploadProgress: onProgress,
    signal: controllerRef?.current?.signal
  })
}
