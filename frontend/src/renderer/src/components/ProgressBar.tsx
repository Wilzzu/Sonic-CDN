import { FC } from 'react'

type ProgressBarProps = {
  progress: number
}

const ProgressBar: FC<ProgressBarProps> = ({ progress }): JSX.Element => {
  return (
    <div className="w-full">
      <div className="relative bg-primary w-full h-2 rounded-full overflow-hidden">
        <div
          style={{ width: `${progress}%` }}
          className="absolute h-full bg-accent rounded-full duration-500"
        />
      </div>
      <p>{progress}%</p>
    </div>
  )
}

export default ProgressBar
