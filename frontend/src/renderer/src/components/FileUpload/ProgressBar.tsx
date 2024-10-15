import { FC, ReactNode } from 'react'
import copyIcon from '../../assets/copy-icon.svg'
import externalLinkIcon from '../../assets/external-link-icon.svg'
import closeIcon from '../../assets/close-icon.svg'

type ProgressBarProps = {
  progress: number
}

const Button: FC<{ children: ReactNode }> = ({ children }): JSX.Element => {
  return (
    <button className="shrink-0 rounded-full h-6 w-6 p-1 flex items-center justify-center shadow-white/50 hover:drop-shadow-centered-sm duration-150">
      {children}
    </button>
  )
}

const ProgressBar: FC<ProgressBarProps> = ({ progress }): JSX.Element => {
  return (
    <div className="relative w-full flex flex-col mt-4 bg-gradient-to-br from-primary to-primary/70 rounded-md p-3 text-[0.8rem] text-white/90">
      <button className="absolute top-[6px] right-[6px] h-4 w-4 p-[1px] opacity-50 hover:opacity-100 duration-150">
        <img src={closeIcon} alt="Close Icon" />
      </button>
      <p>{progress === 100 ? 'Upload complete!' : 'Uploading...'}</p>
      <div className="flex items-center justify-center gap-2">
        {/* Progress bar */}
        <div className="relative flex items-center justify-center w-full bg-secondary h-3 rounded-full overflow-hidden">
          <div
            style={{ width: `${progress}%` }}
            className="absolute left-0 h-full bg-accent rounded-full duration-500"
          />
          <p className="text-[0.60rem] shadow-black/40 drop-shadow-text z-[1]">{progress}%</p>
        </div>
        {/* Buttons */}
        <div className="flex gap-1">
          {/* Link button */}
          <Button>
            <img src={externalLinkIcon} alt="External Link Icon" className="h-full w-auto" />
          </Button>
          {/* Copy button */}
          <Button>
            <img src={copyIcon} alt="Copy Icon" className="h-full w-auto" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProgressBar
