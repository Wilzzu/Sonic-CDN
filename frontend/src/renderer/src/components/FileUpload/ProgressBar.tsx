import { Dispatch, FC, RefObject, SetStateAction } from 'react'
import copyIcon from '../../assets/copy-icon.svg'
import externalLinkIcon from '../../assets/external-link-icon.svg'
import closeIcon from '../../assets/close-icon.svg'
import ProgressButton from '../global/ProgressButton'
import { UploadedFile } from 'src/types/types'

type ProgressBarProps = {
  progress: number
  isUploading: boolean
  setIsUploading: Dispatch<SetStateAction<boolean>>
  fileUploaded: UploadedFile | null
  fileUploadCancelled: boolean
  setFileUploadCancelled: Dispatch<SetStateAction<boolean>>
  setFile: Dispatch<SetStateAction<File | null>>
  controllerRef: RefObject<AbortController>
}

const ProgressBar: FC<ProgressBarProps> = ({
  progress,
  isUploading,
  setIsUploading,
  fileUploaded,
  fileUploadCancelled,
  setFileUploadCancelled,
  setFile,
  controllerRef
}): JSX.Element => {
  const handleClose = (): void => {
    // Close the progress bar
    if (!isUploading) {
      setFile(null)
      return setFileUploadCancelled(false)
    }

    // If file is uploading, cancel the upload
    controllerRef?.current?.abort()
    setIsUploading(false)
    setFileUploadCancelled(true)
  }

  return (
    <div className="relative w-full flex flex-col mt-4 bg-gradient-to-br from-primary to-primary/70 rounded-md p-3 text-[0.8rem] text-white/90">
      <button
        onClick={handleClose}
        className="absolute top-[6px] right-[6px] h-4 w-4 p-[1px] opacity-50 hover:opacity-100 duration-150"
      >
        <img src={closeIcon} alt="Close Icon" />
      </button>
      <p>
        {fileUploadCancelled
          ? 'Upload cancelled!'
          : fileUploaded
            ? 'Upload complete!'
            : 'Uploading...'}
      </p>
      <div className="flex items-center justify-center gap-2">
        {/* Progress bar */}
        <div
          // For some reason cn doesn't work with custom shadows, so we have to do the class switching manually
          className={
            'relative flex items-center justify-center w-full bg-gradient-to-br from-secondary to-secondary/80 h-3 rounded-full ' +
            (fileUploadCancelled
              ? 'from-warning to-warning/85 shadow-centered-base shadow-warning/30 '
              : ' ') +
            (progress < 5 ? 'overflow-hidden' : ' ')
          }
        >
          <div
            style={{ width: `${progress}%` }}
            className={
              'absolute left-0 h-full bg-gradient-to-br from-accent to-[#39A4F4] rounded-full shadow-centered-base duration-500 ' +
              (progress >= 5 ? 'shadow-accent/50' : 'shadow-accent/0')
            }
          />
          <p className="text-[0.60rem] shadow-black/40 drop-shadow-text z-[1]">{progress}%</p>
        </div>
        {/* Buttons */}
        <div className="flex gap-1">
          {/* Link button */}
          <ProgressButton
            disabled={!fileUploaded}
            onClick={() => window.open(fileUploaded?.url)}
            title="Open"
            tooltip
          >
            <img
              src={externalLinkIcon}
              draggable={false}
              alt="External Link Icon"
              className="h-full w-auto"
            />
          </ProgressButton>
          {/* Copy button */}
          <ProgressButton
            disabled={!fileUploaded}
            onClick={() => window.electron.ipcRenderer.send('copy-to-clipboard', fileUploaded?.url)}
            title="Copy"
            tooltip
          >
            <img src={copyIcon} draggable={false} alt="Copy Icon" className="h-full w-auto" />
          </ProgressButton>
        </div>
      </div>
    </div>
  )
}

export default ProgressBar
