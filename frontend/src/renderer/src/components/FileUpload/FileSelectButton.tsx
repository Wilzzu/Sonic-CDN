import {
  ChangeEvent,
  Dispatch,
  DragEvent,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState
} from 'react'
import { cn, formatBytes } from '../../lib/utils'
import { UploadedFile } from 'src/types/types'

type FileSelectButtonProps = {
  file: File | null
  setFile: Dispatch<SetStateAction<File | null>>
  isUploading: boolean
  fileUploaded: UploadedFile | null
}

const FileSelectButton: FC<FileSelectButtonProps> = ({
  file,
  setFile,
  isUploading,
  fileUploaded
}): JSX.Element => {
  const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrop = (e: DragEvent<HTMLDivElement>): void => {
    if (isUploading) return
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
    }
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>): void => {
    if (isUploading) return
    e.preventDefault()
  }

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>): void => {
    if (isUploading) return
    if (e.target.files && e.target.files[0]) setFile(e.target.files[0])
  }

  const handleDragState = (state: boolean): void => {
    if (isUploading) return setIsDraggedOver(false)
    setIsDraggedOver(state)
  }

  const createPreview = (file: File): void => {
    const reader = new FileReader()
    reader.onload = (): void => setPreviewUrl(reader.result as string)
    reader.readAsDataURL(file) // Read the file as a data URL
  }

  useEffect(() => {
    if (file) createPreview(file)
    setIsDraggedOver(false)
  }, [file])

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileSelect}
        onClick={(e) => (e.currentTarget.value = '')}
        className="hidden"
      />
      {/* Main button */}
      <div
        onClick={() => !isUploading && fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={() => handleDragState(true)}
        onDragLeave={() => handleDragState(false)}
        className={cn(
          'relative w-full flex items-center justify-center p-1 bg-gradient-to-br from-slate-900 via-slate-700 to-slate-900 rounded-2xl overflow-hidden hover:cursor-pointer',
          { 'hover:cursor-default': isUploading }
        )}
      >
        {/* Button border */}
        <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
          <div
            className={cn(
              'bg-gradient-to-r from-transparent via-accent to-transparent w-80 h-[300%]',
              {
                'animate-spin-slow': !isDraggedOver && !file,
                'animate-spin-fast': isDraggedOver,
                'animate-pulse bg-accent/30 w-full': file && !isDraggedOver
              }
            )}
          />
        </div>
        {/* Inner button */}
        <div className="relative flex items-center justify-center bg-gradient-to-br from-background via-slate-900 to-background w-full h-64 rounded-[12px] z-[1] pointer-events-none overflow-hidden">
          {file?.name ? (
            <div className="z-[1] px-4 max-w-full">
              <p>
                {fileUploaded ? 'File uploaded!' : isUploading ? 'Uploading:' : 'Selected file:'}
              </p>
              <div className="flex flex-col justify-center text-black py-[6px] px-8 bg-gradient-to-b from-stone-200 via-stone-300 via-80% to-[#9c9a99] shadow-white/25 drop-shadow-centered-xl rounded-lg">
                <p className="truncate leading-5">{file.name}</p>
                <p className="text-xs leading-3">{formatBytes(file.size)}</p>
              </div>
            </div>
          ) : (
            <p className="select-none">Drop your file or click here to upload</p>
          )}
          {/* File preview */}
          {previewUrl && (
            <div className="absolute w-full h-full opacity-20 z-0">
              {file?.type?.startsWith('video/') ? (
                <video src={previewUrl} className="w-full h-full object-cover" />
              ) : (
                file?.type?.startsWith('image/') && (
                  <img src={previewUrl} alt="File Preview" className="w-full h-full object-cover" />
                )
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default FileSelectButton
