import { uploadFile } from '@renderer/api/fileUploadAPI'
import { cn } from '@renderer/lib/utils'
import { AxiosProgressEvent } from 'axios'
import { Dispatch, FC, RefObject, SetStateAction } from 'react'

type UploadButtonProps = {
  file: File | null
  fileName: string | null
  setProgress: Dispatch<SetStateAction<number>>
  isUploading: boolean
  setIsUploading: Dispatch<SetStateAction<boolean>>
  fileUploaded: string | null
  setFileUploaded: Dispatch<SetStateAction<string | null>>
  setFileUploadCancelled: Dispatch<SetStateAction<boolean>>
  controllerRef: RefObject<AbortController>
}

// Rename file and keep the file extension
const formatFile = (file: File, fileName: string | null): File => {
  const originalFileName = fileName ? fileName.toLocaleLowerCase() : file.name.toLocaleLowerCase()
  const formattedFileName = encodeURI(
    originalFileName.replace(/ /g, '-').replace(/ä/g, 'a').replace(/ö/g, 'o').replace(/å/g, 'a')
  )

  if (!fileName) return new File([file], formattedFileName)
  const extension = file.name.split('.').pop()
  return new File([file], `${formattedFileName}.${extension}`)
}

const UploadButton: FC<UploadButtonProps> = ({
  file,
  fileName,
  setProgress,
  isUploading,
  setIsUploading,
  fileUploaded,
  setFileUploaded,
  setFileUploadCancelled,
  controllerRef
}): JSX.Element => {
  const onProgress = (progressEvent: AxiosProgressEvent): void => {
    const total = progressEvent.total ?? 0
    if (total > 0) {
      const percentCompleted = Math.round((progressEvent.loaded * 100) / total)
      setProgress(percentCompleted)
    }
  }

  const handleUpload = async (): Promise<void> => {
    if (!file) return
    setIsUploading(true)
    setProgress(0)
    setFileUploadCancelled(false)
    try {
      const response = await uploadFile(formatFile(file, fileName), onProgress, controllerRef)

      if (response.status === 200) {
        console.log('File uploaded successfully:', response.data)
        setIsUploading(false)
        setProgress(100)
        setFileUploaded(`${import.meta.env.VITE_CDN_URL}/${response.data.fileName}`)
        window.electron.ipcRenderer.send(
          'copy-to-clipboard',
          `${import.meta.env.VITE_CDN_URL}/${response.data.fileName}`
        )
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
        className="group w-full h-full p-[1px] rounded-[7px] bg-gradient-to-br disabled:bg-none from-accent/50 via-accent/10 to-accent/50 disabled:opacity-50 disabled:hover:opacity-50 shadow-accent/50 disabled:hover:drop-shadow-none hover:drop-shadow-centered-base duration-200"
      >
        <div className="w-full h-full flex items-center justify-center bg-primary/80 group-hover:bg-accent/10 group-disabled:group-hover:bg-primary/80 rounded-md duration-200">
          <p className="uppercase text-sm pointer-events-none shadow-black/40 drop-shadow-text">
            Upload
          </p>
        </div>
      </button>
    </div>
  )
}

export default UploadButton
