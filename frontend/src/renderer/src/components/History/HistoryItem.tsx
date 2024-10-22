import ProgressButton from '../global/ProgressButton'
import copyIcon from '../../assets/copy-icon.svg'
import externalLinkIcon from '../../assets/external-link-icon.svg'
import { FC } from 'react'
import { cn } from '@renderer/lib/utils'

const HistoryItem: FC<{ file: string; index: number }> = ({ file, index }): JSX.Element => {
  return (
    <div
      className={cn(
        'flex items-center justify-between w-full px-3 py-2 rounded-md bg-gradient-to-br from-primary/70 to-primary/50 font-light',
        { 'from-secondary/60 to-secondary/40': index % 2 === 0 }
      )}
    >
      <p className="w-full truncate text-sm">{file}</p>
      <div className="flex shrink-0 gap-1">
        {/* Link button */}
        <ProgressButton
          onClick={() => window.open(`${import.meta.env.VITE_CDN_URL}/${file}`)}
          title="Open"
        >
          <img src={externalLinkIcon} alt="External Link Icon" className="h-full w-auto" />
        </ProgressButton>
        {/* Copy button */}
        <ProgressButton
          onClick={() =>
            window.electron.ipcRenderer.send(
              'copy-to-clipboard',
              `${import.meta.env.VITE_CDN_URL}/${file}`
            )
          }
          title="Copy"
        >
          <img src={copyIcon} alt="Copy Icon" className="h-full w-auto" />
        </ProgressButton>
      </div>
    </div>
  )
}

export default HistoryItem
