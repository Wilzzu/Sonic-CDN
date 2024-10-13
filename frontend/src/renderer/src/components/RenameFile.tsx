import { cn } from '@renderer/lib/utils'
import { Dispatch, FC, SetStateAction } from 'react'

type RenameFileProps = {
  file: File | null
  fileName: string
  setFileName: Dispatch<SetStateAction<string>>
  isUploading: boolean
  fileUploaded: boolean
}

const RenameFile: FC<RenameFileProps> = ({
  file,
  fileName,
  setFileName,
  isUploading,
  fileUploaded
}) => {
  return (
    <div
      className={cn('col-span-3 bg-primary rounded-md px-2 py-1', {
        'opacity-50': isUploading || !file || fileUploaded
      })}
    >
      <p className="text-xs text-white/60 select-none">Rename file</p>
      <input
        type="text"
        placeholder={file ? file.name : 'Enter new file name'}
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
        disabled={isUploading || !file || fileUploaded}
        className="w-full bg-transparent text-sm outline-none placeholder:text-white/40 text-white"
      />
    </div>
  )
}

export default RenameFile
