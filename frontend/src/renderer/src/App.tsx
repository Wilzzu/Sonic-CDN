import { useState } from 'react'
import icon from './assets/icon.svg'
import TitleBar from './components/TitleBar'
import FileUpload from './screens/FileUpload'
import History from './screens/History'
import Footer from './components/layout/Footer/Footer'
import useStorageSpace from './hooks/useStorageSpace'

function App(): JSX.Element {
  const [showHistory, setShowHistory] = useState<boolean>(false)
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const { storageResponse, updateStorageSpace } = useStorageSpace()

  return (
    <div className="rounded-xl overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1b1b1b]  to-background">
      <TitleBar setShowHistory={setShowHistory} isUploading={isUploading} />
      <main className="relative h-[calc(100dvh-48px)] flex flex-col items-center gap-10">
        {/* Title */}
        <div className="flex items-center justify-center gap-3 mt-6 mb-4 select-none">
          <img src={icon} draggable={false} alt="Sonic CDN Icon" className="h-12 w-auto mb-[1px]" />
          <h1 className="uppercase text-nowrap font-bold text-3xl">Sonic CDN</h1>
        </div>
        {/* Content */}
        {showHistory ? (
          <History />
        ) : (
          <FileUpload
            isUploading={isUploading}
            setIsUploading={setIsUploading}
            updateStorageSpace={updateStorageSpace}
          />
        )}
        <Footer storageResponse={storageResponse} />
      </main>
    </div>
  )
}

export default App
