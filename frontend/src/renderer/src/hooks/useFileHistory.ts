import { UploadedFile } from 'src/types/types'

const useFileHistory = (): {
  getFileHistory: () => UploadedFile[]
  addFileToHistory: (file: UploadedFile) => void
} => {
  const getFileHistory = (): UploadedFile[] => {
    return JSON.parse(localStorage.getItem('fileHistory') || '[]')
  }

  const addFileToHistory = (file: UploadedFile): void => {
    const fileHistory = getFileHistory()
    fileHistory.push(file)
    localStorage.setItem('fileHistory', JSON.stringify(fileHistory))
  }

  return { getFileHistory, addFileToHistory }
}

export default useFileHistory
