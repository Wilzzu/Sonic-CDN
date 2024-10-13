import icon from './assets/icon.svg'
import TitleBar from './components/TitleBar'
import FileSelectButton from './components/FileSelectButton'
import UploadButton from './components/UploadButton'
import { useEffect, useState } from 'react'
import ProgressBar from './components/ProgressBar'
import RenameFile from './components/RenameFile'

function App(): JSX.Element {
  const [file, setFile] = useState<File | null>(null)
  const [progress, setProgress] = useState<number>(0)
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [fileName, setFileName] = useState<string>('')
  const [fileUploaded, setFileUploaded] = useState<boolean>(false)

  useEffect(() => {
    if (file) {
      setProgress(0)
      setFileName('')
      setFileUploaded(false)
    }
  }, [file])

  return (
    <div className="rounded-xl overflow-hidden">
      <main className="relative h-[calc(100dvh-10px)] flex flex-col items-center justify-evenly gap-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1b1b1b]  to-background">
        <TitleBar />
        {/* Title */}
        <div className="flex items-center justify-center gap-3">
          <img src={icon} alt="Sonic CDN Icon" className="h-12 w-auto mb-[1px]" />
          <h1 className="uppercase text-nowrap font-bold text-3xl">Sonic CDN</h1>
        </div>
        {/* File Upload */}
        <section className="flex flex-col gap-2 items-center justify-center w-full px-5">
          <FileSelectButton
            file={file}
            setFile={setFile}
            isUploading={isUploading}
            fileUploaded={fileUploaded}
          />
          <div className="w-full grid grid-cols-5 gap-4">
            <RenameFile
              fileName={fileName}
              setFileName={setFileName}
              file={file}
              isUploading={isUploading}
              fileUploaded={fileUploaded}
            />
            <UploadButton
              file={file}
              fileName={fileName}
              setProgress={setProgress}
              isUploading={isUploading}
              setIsUploading={setIsUploading}
              fileUploaded={fileUploaded}
              setFileUploaded={setFileUploaded}
            />
          </div>
          <ProgressBar progress={progress} />
        </section>
        {/* Footer */}
        <footer className="flex items-center justify-center gap-2">
          <a
            href="https://wilzzu.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs opacity-70 hover:opacity-100 duration-200"
          >
            Made with 💙 by Wilzzu
          </a>
        </footer>
      </main>
    </div>
  )
}

export default App
