import ProgressButton from '../global/ProgressButton'
import copyIcon from '../../assets/copy-icon.svg'
import deleteIcon from '../../assets/delete-icon.svg'
// import editIcon from '../../assets/edit-icon.svg'
import { FC } from 'react'
import { cn, formatBytes } from '@renderer/lib/utils'
import { UploadedFile } from 'src/types/types'

const HistoryItem: FC<{ file: UploadedFile; index: number }> = ({ file, index }): JSX.Element => {
  return (
    <div
      className={cn(
        'flex items-center justify-between w-full rounded-md bg-gradient-to-br from-primary/70 to-primary/50 font-light overflow-hidden',
        { 'from-secondary/60 to-secondary/40': index % 2 === 0 }
      )}
    >
      <button
        onClick={() => window.open(file.url)}
        title="Open"
        className="group relative w-full h-full text-left pl-3 py-2"
      >
        <p className="w-full truncate text-sm">{file.name}</p>
        <p className="text-[0.64rem]">{formatBytes(file.size)}</p>
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-accent via-transparent bg-[length:200%_200%] bg-[100%_100%] group-hover:bg-[0%_0%] duration-300 shadow-accent drop-shadow-centered-base" />
      </button>
      <div
        className={cn('flex shrink-0 gap-1 px-2  py-1 border-l-[1px] border-secondary/50', {
          'border-secondary/80': index % 2 === 0
        })}
      >
        {/* Delete button */}
        {/* <ProgressButton onClick={() => console.log('delete')} size="lg" title="Delete">
          <img
            src={deleteIcon}
            alt="Delete Icon"
            className="h-full w-auto grayscale group-hover:grayscale-0 duration-150"
          />
        </ProgressButton> */}
        {/* Edit button */}
        {/* <ProgressButton onClick={() => window.open(file.url)} size="lg" title="Rename">
          <img src={editIcon} alt="Edit Icon" className="h-full w-auto" />
        </ProgressButton> */}
        {/* Copy button */}
        <ProgressButton
          onClick={() => window.electron.ipcRenderer.send('copy-to-clipboard', file.url)}
          size="lg"
          title="Copy"
        >
          <img
            src={copyIcon}
            alt="Copy Icon"
            className="h-full w-auto opacity-50 group-hover:opacity-100 duration-150"
          />
        </ProgressButton>
      </div>
    </div>
  )
}

export default HistoryItem
