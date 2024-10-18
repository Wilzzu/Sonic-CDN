import { cn } from '@renderer/lib/utils'
import { Dispatch, FC, MouseEvent, RefObject, SetStateAction, useRef } from 'react'
import randomizeIcon from '@renderer/assets/refresh-icon.svg'
import { v4 as uuidv4 } from 'uuid'

type RenameFileProps = {
  file: File | null
  fileName: string
  setFileName: Dispatch<SetStateAction<string>>
  isUploading: boolean
  fileUploaded: string | null
}

const randomName = (): string => {
  const uuidArray = uuidv4().split('-')
  return `${uuidArray[0]}-${uuidArray[1]}-${uuidArray[2]}`
}

// Focus input field when the user clicks on the component, ignore the refresh button
const focustInput = (event: MouseEvent, inputRef: RefObject<HTMLInputElement>): void => {
  if (event.target instanceof HTMLButtonElement) return
  inputRef.current?.focus()
}

const RenameFile: FC<RenameFileProps> = ({
  file,
  fileName,
  setFileName,
  isUploading,
  fileUploaded
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <div
      onClick={(event) => focustInput(event, inputRef)}
      className={cn(
        'col-span-3 bg-gradient-to-br from-primary to-primary/70 rounded-md px-2 py-1',
        {
          'opacity-50': isUploading || !file || fileUploaded
        }
      )}
    >
      <div className="flex items-center gap-1">
        <p className="text-xs text-white/60 select-none">Rename file</p>
        <button
          className="w-3 h-3 p-[1px] rounded-full opacity-60 hover:opacity-100 disabled:hover:opacity-60 duration-150 overflow-hidden"
          disabled={isUploading || !file || !!fileUploaded}
          onClick={() => setFileName(randomName)}
        >
          <img src={randomizeIcon} alt="Randomize Icon" className="pointer-events-none" />
        </button>
      </div>
      <input
        ref={inputRef}
        type="text"
        placeholder={file ? file.name : 'Enter new file name'}
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
        disabled={isUploading || !file || !!fileUploaded}
        className="w-full bg-transparent text-sm outline-none placeholder:text-white/40 text-white"
      />
    </div>
  )
}

export default RenameFile
