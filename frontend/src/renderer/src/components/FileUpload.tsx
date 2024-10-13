import { ChangeEvent, DragEvent, useEffect, useRef, useState } from 'react'
import { uploadFile } from '../api/fileUploadAPI'
import { cn } from '../lib/utils'

function FileUpload(): JSX.Element {
  const [file, setFile] = useState<File | null>(null)
  const [progress, setProgress] = useState<number>(0)
  const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrop = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
    }
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault()
  }

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async (): Promise<void> => {
    if (!file) return
    setProgress(0)
    try {
      const response = await uploadFile(file, (progressEvent) => {
        const total = progressEvent.total ?? 0
        if (total > 0) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / total)
          setProgress(percentCompleted)
        }
      })

      if (response.status === 200) console.log('File uploaded successfully')
    } catch (error) {
      console.error('Error uploading file:', error)
    }
  }

  const createPreview = (file: File): void => {
    const reader = new FileReader()
    reader.onload = (): void => setPreviewUrl(reader.result as string)
    reader.readAsDataURL(file) // Read the file as a data URL
  }

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  useEffect(() => {
    if (file) {
      setProgress(0)
      createPreview(file)
    }
    setIsDraggedOver(false)
  }, [file])

  return (
    <>
      <input ref={fileInputRef} type="file" onChange={handleFileSelect} className="hidden" />
      {/* Main button */}
      <div
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={() => setIsDraggedOver(true)}
        onDragLeave={() => setIsDraggedOver(false)}
        className="relative w-full flex items-center justify-center p-1 bg-gradient-to-br from-slate-900 via-slate-700 to-slate-900 rounded-2xl overflow-hidden hover:cursor-pointer"
      >
        {/* Button border */}
        <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
          <div
            className={cn(
              'bg-gradient-to-r from-transparent via-primary to-transparent w-80 h-[300%]',
              {
                'animate-spin-slow': !isDraggedOver && !file,
                'animate-spin-fast': isDraggedOver && !file,
                'animate-pulse bg-primary/30 w-full': file
              }
            )}
          />
        </div>
        {/* Inner button */}
        <div className="relative flex items-center justify-center bg-gradient-to-br from-background via-slate-900 to-background w-full h-64 rounded-[12px] z-[1] pointer-events-none overflow-hidden">
          {file?.name ? (
            <div className="z-[1] px-4 max-w-full">
              <p className="text-center">Selected file:</p>
              <div className="flex flex-col justify-center text-black py-2 px-8 bg-slate-200 rounded-full">
                <p className="truncate leading-5">{file.name}</p>
                <p className="text-xs leading-3">{formatBytes(file.size)}</p>
              </div>
            </div>
          ) : (
            <p>Drop your file or click here to upload</p>
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
      <button onClick={handleUpload} disabled={!file}>
        Upload
      </button>
      <div>
        <progress value={progress} max="100" />
        <p>{progress}%</p>
      </div>
    </>
  )
}

export default FileUpload
