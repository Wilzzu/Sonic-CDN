import { uploadFile } from '@renderer/api/fileUploadAPI'
import { cn } from '@renderer/lib/utils'
import { Dispatch, FC, SetStateAction } from 'react'

type UploadButtonProps = {
  file: File | null
  fileName: string | null
  setProgress: Dispatch<SetStateAction<number>>
  isUploading: boolean
  setIsUploading: Dispatch<SetStateAction<boolean>>
  fileUploaded: string | null
  setFileUploaded: Dispatch<SetStateAction<string | null>>
}

// Rename file and keep the file extension
const formatFile = (file: File, fileName: string | null): File => {
  if (!fileName) return new File([file], encodeURI(file.name.replaceAll(' ', '-')))
  const extension = file.name.split('.').pop()
  return new File([file], `${encodeURI(fileName.replaceAll(' ', '-'))}.${extension}`)
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
    setIsUploading(true)
    setProgress(0)
    try {
      const response = await uploadFile(formatFile(file, fileName), (progressEvent) => {
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
        setFileUploaded(response.data.fileName)
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
        disabled={isUploading || !file || !!fileUploaded}
        className="w-full h-full bg-gradient-to-b from-primary to-primary/70 rounded-md disabled:opacity-50 disabled:hover:opacity-50 shadow-accent/20 disabled:hover:drop-shadow-none hover:drop-shadow-centered-base border-2 border-accent/80 hover:border-accent duration-200"
      >
        <p className="uppercase text-sm pointer-events-none">Upload</p>
      </button>
    </div>
  )
}

export default UploadButton
