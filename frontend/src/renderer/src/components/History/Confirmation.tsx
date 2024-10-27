import { deleteFile } from '@renderer/api/fileAPI'
import useFileHistory from '@renderer/hooks/useFileHistory'
import { cn } from '@renderer/lib/utils'
import { AxiosError } from 'axios'
import { Dispatch, FC, SetStateAction, useState } from 'react'

type ConfirmationProps = {
  fileName: string
  setIsDeleted: Dispatch<SetStateAction<boolean>>
  updateStorageSpace: () => Promise<void>
}

type ConfirmationButtonProps = {
  text: string
  onClick: () => void
  title?: string
  color?: 'warning' | 'success'
}

const ConfirmationButton: FC<ConfirmationButtonProps> = ({
  text,
  onClick,
  title,
  color
}): JSX.Element => (
  <button
    title={title}
    className={cn(
      'bg-secondary text-white px-2 py-1 rounded-md text-sm font-normal hover:bg-[#2b2b2b] duration-150',
      { 'border-[1px] border-warning py-[3px]': color === 'warning' },
      { 'bg-accent': color === 'success' }
    )}
    onClick={onClick}
  >
    <p className="shadow-black/40 drop-shadow-text">{text}</p>
  </button>
)

const Confirmation: FC<ConfirmationProps> = ({ fileName, setIsDeleted, updateStorageSpace }) => {
  const { removeFileFromHistory } = useFileHistory()
  const [status, setStatus] = useState<null | { msg: string; err?: boolean }>(null)

  const removeFromHistory = (fileName: string): void => {
    removeFileFromHistory(fileName)
    setIsDeleted(true)
  }

  const deleteFileHandler = async (fileName: string): Promise<void> => {
    setStatus({ msg: 'Deleting file...' })
    try {
      await deleteFile(fileName)
      removeFileFromHistory(fileName)
      setIsDeleted(true)
      updateStorageSpace()
    } catch (error) {
      setStatus({
        msg: `Error: ${
          ((error as AxiosError).response?.data as string) ||
          ((error as AxiosError).message as string)
        }`,
        err: true
      })
    }
  }

  return (
    <div
      className={cn(
        'absolute right-0 top-0 h-full flex items-center gap-2 px-3 bg-black/25 backdrop-blur-sm rounded-l-md animate-slide-from-right duration-150',
        { 'w-full bg-primary duration-0': status?.err }
      )}
    >
      {/* Status text */}
      {status ? (
        <p
          className={cn(
            'text-sm font-normal text-balance shadow-black/40 drop-shadow-text pr-[7.4rem]',
            {
              'text-warning pr-0 font-medium': status.err
            }
          )}
        >
          {status.msg}
        </p>
      ) : (
        // Buttons
        <>
          <ConfirmationButton
            onClick={() => removeFromHistory(fileName)}
            text="Remove from history"
            title="Removes file from history, it can still exist in the CDN"
          />
          <ConfirmationButton
            onClick={() => deleteFileHandler(fileName)}
            text="Delete"
            title="Deletes file from CDN"
            color="warning"
          />
        </>
      )}
    </div>
  )
}

export default Confirmation
