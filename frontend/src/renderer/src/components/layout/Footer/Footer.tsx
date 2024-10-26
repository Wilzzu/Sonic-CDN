import { FC, useEffect } from 'react'
import StorageSpaceIndicator from './StorageSpaceIndicator'
import { StorageResponse } from 'src/types/types'

type FooterProps = {
  storageResponse: StorageResponse | 'error' | null
}

const Footer: FC<FooterProps> = ({ storageResponse }): JSX.Element => {
  useEffect(() => {
    console.log('Update storage space bar:', storageResponse)
  }, [storageResponse])

  return (
    <footer className="absolute bottom-3 w-full px-5 flex items-end justify-between gap-2 text-xs">
      {/* Storage space left */}
      {storageResponse === 'error' ? (
        <p className="text-nowrap opacity-70">{"Couldn't fetch storage space"}</p>
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
