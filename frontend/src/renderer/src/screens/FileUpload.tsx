import FileSelectButton from '@renderer/components/FileUpload/FileSelectButton'
import UploadState from '@renderer/components/FileUpload/UploadState'
import RenameFile from '@renderer/components/FileUpload/RenameFile'
import UploadButton from '@renderer/components/FileUpload/UploadButton'
import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from 'react'
import { UploadedFile } from 'src/types/types'

type FileUploadProps = {
  isUploading: boolean
  setIsUploading: Dispatch<SetStateAction<boolean>>
  updateStorageSpace: () => Promise<void>
}

const FileUpload: FC<FileUploadProps> = ({
  isUploading,
  setIsUploading,
  updateStorageSpace
}): JSX.Element => {
  const [file, setFile] = useState<File | null>(null)
  const [progress, setProgress] = useState<number>(0)
  const [fileName, setFileName] = useState<string>('')
  const [fileUploaded, setFileUploaded] = useState<UploadedFile | null>(null)
  const [fileUploadCancelled, setFileUploadCancelled] = useState<boolean>(false)
  const [fileUploadError, setFileUploadError] = useState<false | string>(false)
  const controllerRef = useRef(new AbortController())

  useEffect(() => {
    setProgress(0)
    setFileName('')
    setFileUploaded(null)
  }, [file])

  useEffect(() => {
    if (controllerRef.current.signal.aborted) {
      controllerRef.current = new AbortController()
    }
  }, [isUploading])

  return (
    <section className="flex flex-col gap-2 items-center justify-center w-full px-5">
      <FileSelectButton
        file={file}
        setFile={setFile}
        isUploading={isUploading}
        fileUploaded={fileUploaded}
      />
      <div className="w-full grid grid-cols-5 gap-4">
        <RenameFile
          fileName={fileName}
          setFileName={setFileName}
          file={file}
          isUploading={isUploading}
          fileUploaded={fileUploaded}
        />
        <UploadButton
          file={file}
          fileName={fileName}
          setProgress={setProgress}
          isUploading={isUploading}
          setIsUploading={setIsUploading}
          fileUploaded={fileUploaded}
          setFileUploaded={setFileUploaded}
          setFileUploadCancelled={setFileUploadCancelled}
          setFileUploadError={setFileUploadError}
          updateStorageSpace={updateStorageSpace}
          controllerRef={controllerRef}
        />
      </div>
      {(isUploading || fileUploaded || fileUploadCancelled || fileUploadError) && (
        <UploadState
          progress={progress}
          isUploading={isUploading}
          setIsUploading={setIsUploading}
          fileUploaded={fileUploaded}
          fileUploadCancelled={fileUploadCancelled}
          setFileUploadCancelled={setFileUploadCancelled}
          fileUploadError={fileUploadError}
          setFile={setFile}
          controllerRef={controllerRef}
        />
      )}
    </section>
  )
}

export default FileUpload
