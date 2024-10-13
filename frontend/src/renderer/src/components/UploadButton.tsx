import { uploadFile } from '@renderer/api/fileUploadAPI'
import { cn } from '@renderer/lib/utils'
import { Dispatch, FC, SetStateAction } from 'react'

type UploadButtonProps = {
  file: File | null
  fileName: string | null
  setProgress: Dispatch<SetStateAction<number>>
  isUploading: boolean
  setIsUploading: Dispatch<SetStateAction<boolean>>
  fileUploaded: boolean
  setFileUploaded: Dispatch<SetStateAction<boolean>>
}

const UploadButton: FC<UploadButtonProps> = ({
  file,
  fileName,
  setProgress,
  isUploading,
  setIsUploading,
  fileUploaded,
  setFileUploaded
}): JSX.Element => {
  const handleUpload = async (): Promise<void> => {
    if (!file) return
    const renamedFile = fileName ? new File([file], fileName) : file
    setIsUploading(true)
    setProgress(0)
    try {
      const response = await uploadFile(renamedFile, (progressEvent) => {
        const total = progressEvent.total ?? 0
        if (total > 0) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / total)
          setProgress(percentCompleted)
        }
      })

      if (response.status === 200) {
        console.log('File uploaded successfully:', response.data)
        setIsUploading(false)
        setProgress(100)
        setFileUploaded(true)
      }
    } catch (error) {
      console.error('Error uploading file:', error)
      setIsUploading(false)
      setProgress(0)
    }
  }

  return (
    <div
      className={cn('col-span-2 flex items-center justify-center', {
        'opacity-50': isUploading || !file || fileUploaded
      })}
    >
      <button
        onClick={handleUpload}
        disabled={isUploading || !file || fileUploaded}
        className="relative w-full h-full bg-gradient-to-b from-accent via-primary to-accent rounded-md disabled:bg-background opacity-90 disabled:hover:opacity-90 hover:opacity-100 shadow-accent/20 disabled:hover:drop-shadow-none hover:drop-shadow-centered-base duration-200"
      >
        <div className="h-full w-full flex items-center justify-center rounded-md bg-gradient-to-br from-primary/20 via-primary to-primary/20"></div>
      </button>
      <p className="absolute uppercase text-sm pointer-events-none">Upload</p>
    </div>
  )
}

export default UploadButton
