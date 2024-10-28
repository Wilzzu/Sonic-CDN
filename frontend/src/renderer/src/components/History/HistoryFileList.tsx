import { FC } from 'react'
import HistoryItem from './HistoryItem'
import { UploadedFile } from 'src/types/types'

type HistoryFileListProps = {
  files: UploadedFile[]
  updateStorageSpace: () => Promise<void>
}

const HistoryFileList: FC<HistoryFileListProps> = ({ files, updateStorageSpace }): JSX.Element => {
  if (files.length === 0) return <p className="pt-2">No files found in history</p>

  return (
    <div className="w-full px-3">
      {/* Scroll container */}
      <ul className="w-full h-[calc(100dvh-285px)] px-2 flex flex-col gap-1 overflow-y-auto scrollbar scrollbar-w-[6px] scrollbar-track-transparent scrollbar-thumb-secondary scrollbar-thumb-rounded-full">
        {[...files].reverse().map((file, index) => {
          return (
            <li key={file.name}>
              <HistoryItem file={file} index={index} updateStorageSpace={updateStorageSpace} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default HistoryFileList
