import ProgressButton from '../global/ProgressButton'
import copyIcon from '../../assets/copy-icon.svg'
import deleteIcon from '../../assets/delete-icon.svg'
// import editIcon from '../../assets/edit-icon.svg'
import { FC, useState } from 'react'
import { cn, formatBytes } from '@renderer/lib/utils'
import { UploadedFile } from 'src/types/types'
import Confirmation from './Confirmation'

type HistoryItemProps = {
  file: UploadedFile
  index: number
  updateStorageSpace: () => Promise<void>
}

const HistoryItem: FC<HistoryItemProps> = ({ file, index, updateStorageSpace }): JSX.Element => {
  const [isDeleted, setIsDeleted] = useState(false)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)

  if (isDeleted) return <></>

  return (
    <div
      className={cn(
        'flex items-center justify-between w-full rounded-md bg-gradient-to-br from-primary/70 to-primary/50 font-light overflow-hidden',
        { 'from-secondary/60 to-secondary/40': index % 2 === 0 }
      )}
    >
      {/* Left side container */}
      <div className="relative w-full h-full overflow-hidden">
        {/* Button with file info */}
        <button
          onClick={() => !showDeleteConfirmation && window.open(file.url)}
          title={showDeleteConfirmation ? '' : 'Open'}
          disabled={showDeleteConfirmation}
          className="group relative w-full h-full text-left pl-3 pr-2 py-2 overflow-hidden"
        >
          <p className="w-full truncate text-sm">{file.name}</p>
          <p className="text-[0.64rem]">{formatBytes(file.size)}</p>
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-accent via-transparent bg-[length:200%_200%] bg-[100%_100%] group-hover:bg-[0%_0%] duration-300 shadow-accent drop-shadow-centered-base group-disabled:group-hover:bg-[100%_100%]" />
        </button>
        {/* Delete confirmation */}
        {showDeleteConfirmation && (
          <Confirmation
            fileName={file.name}
            setIsDeleted={setIsDeleted}
            updateStorageSpace={updateStorageSpace}
          />
        )}
      </div>
      <div
        className={cn('flex shrink-0 gap-1 px-2  py-1 border-l-[1px] border-secondary/50', {
          'border-secondary/80': index % 2 === 0
        })}
      >
        {/* Delete button */}
        <ProgressButton
          onClick={() => setShowDeleteConfirmation((prev) => !prev)}
          size="lg"
          title="Delete"
        >
          <img
            src={deleteIcon}
            alt="Delete Icon"
            className="h-full w-auto grayscale group-hover:grayscale-0 duration-150"
          />
        </ProgressButton>
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
