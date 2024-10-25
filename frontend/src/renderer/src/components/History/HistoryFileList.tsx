import { FC } from 'react'
import HistoryItem from './HistoryItem'
import { UploadedFile } from 'src/types/types'

const HistoryFileList: FC<{ files: UploadedFile[] }> = ({ files }): JSX.Element => {
  if (files.length === 0) return <p className="pt-2">No files uploaded</p>

  return (
    <div className="w-full px-3">
      {/* Scroll container */}
      <ul className="w-full h-[calc(100dvh-300px)] px-2 flex flex-col gap-1 overflow-y-auto scrollbar scrollbar-w-[6px] scrollbar-track-transparent scrollbar-thumb-secondary scrollbar-thumb-rounded-full">
        {[...files].reverse().map((file, index) => {
          return (
            <li key={file.name}>
              <HistoryItem file={file} index={index} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default HistoryFileList
