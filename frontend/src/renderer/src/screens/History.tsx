import HistoryFileList from '@renderer/components/History/HistoryFileList'
import useFileHistory from '@renderer/hooks/useFileHistory'
import { FC, useMemo } from 'react'

type HistoryProps = {
  updateStorageSpace: () => Promise<void>
}

const History: FC<HistoryProps> = ({ updateStorageSpace }): JSX.Element => {
  const { getFileHistory } = useFileHistory()
  const files = useMemo(() => getFileHistory(), [])

  return (
    <section className="flex flex-col gap-2 items-center justify-center w-full">
      {/* Title */}
      <div className="w-full px-5">
        <h1 className="text-xl font-normal">History</h1>
        <div className="h-[1px] w-full bg-gradient-to-br from-secondary to-transparent" />
      </div>
      {/* Files */}
      <HistoryFileList files={files} updateStorageSpace={updateStorageSpace} />
    </section>
  )
}

export default History
