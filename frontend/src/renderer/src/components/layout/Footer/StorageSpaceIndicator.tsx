import ProgressBar from '@renderer/components/global/ProgressBar'
import { formatBytes } from '@renderer/lib/utils'
import { FC, useMemo } from 'react'
import { StorageResponse } from 'src/types/types'

type StorageSpaceIndicatorProps = {
  storage: StorageResponse
}

const StorageSpaceIndicator: FC<StorageSpaceIndicatorProps> = ({ storage }): JSX.Element => {
  const spaceUsed = useMemo(() => storage.storageSize - storage.storageSpaceLeft, [storage])

  return (
    <div className="flex flex-col">
      {/* Storage amount */}
      <p className="text-nowrap opacity-70 leading-none">
        Storage{' '}
        <span className="text-[0.64rem] font-light">
          {'('}
          <span className="font-normal">{formatBytes(spaceUsed, 0)}</span> of{' '}
          <span className="font-normal">{formatBytes(storage.storageSize, 0)}</span> used{')'}
        </span>
      </p>
      {/* Progress bar */}
      <div className="h-full w-full flex items-center gap-[6px]">
        <div className="relative h-1 w-full bg-secondary rounded-full">
          <ProgressBar progress={(spaceUsed / storage.storageSize) * 100} />
        </div>
        {/* Percentage */}
        <p className="text-[0.6rem] text-nowrap opacity-70">
          {`${Math.floor((spaceUsed / storage.storageSize) * 100)}%`}{' '}
        </p>
      </div>
    </div>
  )
}

export default StorageSpaceIndicator
