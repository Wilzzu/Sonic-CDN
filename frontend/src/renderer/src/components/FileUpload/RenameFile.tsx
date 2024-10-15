import { cn } from '@renderer/lib/utils'
import { Dispatch, FC, SetStateAction, useRef } from 'react'

type RenameFileProps = {
  file: File | null
  fileName: string
  setFileName: Dispatch<SetStateAction<string>>
  isUploading: boolean
  fileUploaded: string | null
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
      onClick={() => inputRef.current?.focus()}
      className={cn(
        'col-span-3 bg-gradient-to-br from-primary to-primary/70 rounded-md px-2 py-1',
        {
          'opacity-50': isUploading || !file || fileUploaded
        }
      )}
    >
      <p className="text-xs text-white/60 select-none">Rename file</p>
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
