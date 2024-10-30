import { getStorage } from '@renderer/api/storageAPI'
import { useEffect, useState } from 'react'
import { StorageResponse } from 'src/types/types'

type ReturnTypes = {
  storageResponse: StorageResponse | 'error' | null
  updateStorageSpace: () => Promise<void>
}

const useStorageSpace = (): ReturnTypes => {
  const [firstFetch, setFirstFetch] = useState(true)
  const [storageResponse, setStorageResponse] = useState<StorageResponse | 'error' | null>(null)

  const updateStorageSpace = async (): Promise<void> => {
    if (storageResponse === 'error') setStorageResponse(null)
    try {
      const response = await getStorage()
      setStorageResponse(response.data as StorageResponse)
    } catch (err) {
      setStorageResponse('error')
    }
  }

  useEffect(() => {
    if (firstFetch) {
      updateStorageSpace()
      setFirstFetch(false)
    }
  }, [firstFetch])

  return { storageResponse, updateStorageSpace }
}

export default useStorageSpace
