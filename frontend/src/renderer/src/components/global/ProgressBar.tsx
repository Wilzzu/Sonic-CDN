import { FC } from 'react'

type ProgressBarProps = {
  progress: number
  showPercentage?: boolean
}

const ProgressBar: FC<ProgressBarProps> = ({ progress, showPercentage = false }): JSX.Element => {
  return (
    <>
      <div
        style={{ width: `${progress}%` }}
        className={
          'absolute left-0 h-full bg-gradient-to-br from-accent to-[#39A4F4] rounded-full shadow-centered-base duration-500 ' +
          (progress >= 5 ? 'shadow-accent/50' : 'shadow-accent/0')
        }
      />
      {showPercentage && (
        <p className="text-[0.60rem] shadow-black/40 drop-shadow-text z-[1]">{progress}%</p>
      )}
    </>
  )
}

export default ProgressBar
