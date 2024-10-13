import FileUpload from './components/FileUpload'
import icon from './assets/icon.svg'
import TitleBar from './components/TitleBar'

function App(): JSX.Element {
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
        <section className="flex flex-col items-center justify-center w-full px-5">
          <FileUpload />
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
