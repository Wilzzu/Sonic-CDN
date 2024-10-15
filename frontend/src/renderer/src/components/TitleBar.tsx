import { Dispatch, FC, ReactNode, SetStateAction } from 'react'
import closeIcon from '../assets/close-icon.svg'
import minimizeIcon from '../assets/minimize-icon.svg'
import historyIcon from '../assets/history-icon.svg'
import { cn } from '@renderer/lib/utils'

type TitleButtonProps = {
  onClick: () => void
  background?: boolean
  disabled?: boolean
  children: ReactNode
}

const TitleButton: FC<TitleButtonProps> = ({
  onClick,
  background = false,
  disabled = false,
  children
}): JSX.Element => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'flex items-center justify-center w-8 h-8 rounded-full opacity-50 hover:opacity-100 disabled:hover:opacity-50 duration-150 title-bar-button',
        {
          'bg-primary': background
        }
      )}
    >
      {children}
    </button>
  )
}

type TitleBarProps = {
  setShowHistory: Dispatch<SetStateAction<boolean>>
  isUploading: boolean
}

const TitleBar: FC<TitleBarProps> = ({ setShowHistory, isUploading }): JSX.Element => {
  return (
    <nav className="w-full flex items-center justify-between p-2 title-bar">
      <TitleButton
        onClick={() => setShowHistory((prev) => !prev)}
        background
        disabled={isUploading}
      >
        <img src={historyIcon} alt="History icon" className="h-2/3 w-auto" />
      </TitleButton>
      <div className="flex gap-2">
        <TitleButton onClick={() => window.electron.ipcRenderer.send('minimize-app')}>
          <img src={minimizeIcon} alt="Minimize icon" className="h-1/2 w-auto" />
        </TitleButton>
        <TitleButton onClick={() => window.electron.ipcRenderer.send('close-app')}>
          <img src={closeIcon} alt="Close icon" className="h-1/2 w-auto" />
        </TitleButton>
      </div>
    </nav>
  )
}

export default TitleBar
