import { FC } from 'react'
import StorageSpaceIndicator from './StorageSpaceIndicator'
import { StorageResponse } from 'src/types/types'
import refreshIcon from '../../../assets/refresh-icon.svg'

type FooterProps = {
  storageResponse: StorageResponse | 'error' | null
  updateStorageSpace: () => Promise<void>
}

const Footer: FC<FooterProps> = ({ storageResponse, updateStorageSpace }): JSX.Element => {
  return (
    <footer className="absolute bottom-3 w-full px-5 flex items-end justify-between gap-2 text-xs">
      {/* Storage space left */}
      {storageResponse === 'error' ? (
        <div className="flex items-center gap-1">
          <p className="text-nowrap opacity-70">{"Couldn't fetch storage space"}</p>
          <button
            onClick={updateStorageSpace}
            className="text-nowrap text-blue-500 hover:underline duration-200"
          >
            <img src={refreshIcon} alt="Refresh Icon" className="h-3 w-3 mt-[1px]" />
          </button>
        </div>
      ) : storageResponse ? (
        <StorageSpaceIndicator key={storageResponse.storageSpaceLeft} storage={storageResponse} />
      ) : (
        <p className="text-nowrap opacity-70">Fetching storage space...</p>
      )}
      {/* Credits */}
      <a
        href="https://wilzzu.dev/"
        target="_blank"
        rel="noopener noreferrer"
        className=" opacity-70 hover:opacity-100 duration-200"
      >
        Made with 💙 by Wilzzu
      </a>
    </footer>
  )
}

export default Footer
