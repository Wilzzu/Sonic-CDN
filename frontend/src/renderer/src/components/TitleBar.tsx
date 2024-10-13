import { ReactNode } from 'react'
import closeIcon from '../assets/close-icon.svg'
import minimizeIcon from '../assets/minimize-icon.svg'

function TitleButton({
  onClick,
  children
}: {
  onClick: () => void
  children: ReactNode
}): JSX.Element {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center w-8 h-8 rounded-full opacity-50 hover:opacity-100 duration-150 title-bar-button"
    >
      {children}
    </button>
  )
}

function TitleBar(): JSX.Element {
  return (
    <nav className="absolute w-full top-0 flex items-center justify-end gap-2 p-2 title-bar">
      <TitleButton onClick={() => window.electron.ipcRenderer.send('minimize-app')}>
        <img src={minimizeIcon} alt="Minimize icon" className="h-1/2 w-auto" />
      </TitleButton>
      <TitleButton onClick={() => window.electron.ipcRenderer.send('close-app')}>
        <img src={closeIcon} alt="Close icon" className="h-1/2 w-auto" />
      </TitleButton>
    </nav>
  )
}

export default TitleBar
