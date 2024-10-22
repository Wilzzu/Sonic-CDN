const useFileHistory = (): {
  getFileHistory: () => string[]
  addFileToHistory: (fileUrl: string) => void
} => {
  const getFileHistory = (): string[] => {
    return JSON.parse(localStorage.getItem('fileHistory') || '[]')
  }

  const addFileToHistory = (fileUrl: string): void => {
    const fileHistory = getFileHistory()
    fileHistory.push(fileUrl)
    localStorage.setItem('fileHistory', JSON.stringify(fileHistory))
  }

  return { getFileHistory, addFileToHistory }
}

export default useFileHistory
