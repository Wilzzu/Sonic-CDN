import { UploadedFile } from 'src/types/types'

const useFileHistory = (): {
  getFileHistory: () => UploadedFile[]
  addFileToHistory: (file: UploadedFile) => void
  removeFileFromHistory: (fileName: string) => void
} => {
  const getFileHistory = (): UploadedFile[] => {
    return JSON.parse(localStorage.getItem('fileHistory') || '[]')
  }

  const addFileToHistory = (file: UploadedFile): void => {
    const fileHistory = getFileHistory()
    fileHistory.push(file)
    localStorage.setItem('fileHistory', JSON.stringify(fileHistory))
  }

  const removeFileFromHistory = (fileName: string): void => {
    const fileHistory = getFileHistory()
    const newFileHistory = fileHistory.filter((file) => file.name !== fileName)
    localStorage.setItem('fileHistory', JSON.stringify(newFileHistory))
  }

  return { getFileHistory, addFileToHistory, removeFileFromHistory }
}

export default useFileHistory
