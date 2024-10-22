import { FC, ReactNode } from 'react'

type ProgressButtonProps = {
  onClick: () => void
  title: string
  disabled?: boolean
  tooltip?: boolean
  children: ReactNode
}

const ProgressButton: FC<ProgressButtonProps> = ({
  onClick,
  title,
  disabled = false,
  tooltip = false,
  children
}): JSX.Element => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={tooltip ? undefined : title}
      className="relative group shrink-0 rounded-full h-6 w-6 p-1 flex items-center justify-center disabled:opacity-30 duration-150"
    >
      {tooltip && (
        <span className="absolute opacity-0 group-disabled:group-hover:opacity-0 group-hover:opacity-100 -top-5 group-hover:-top-7 scale-[0.85] group-hover:scale-100 bg-gradient-to-br from-secondary to-[#303030] rounded-md px-[10px] py-[6px] pointer-events-none duration-150">
          <p className="text-[0.68rem]">{title}</p>
        </span>
      )}
      {children}
    </button>
  )
}

export default ProgressButton
