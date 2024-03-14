import PropTypes from 'prop-types'
import { cn } from "@/lib/utils"

function LoadingSpinner({ width, height }) {
  return (
    <div className="w-full h-5/6 flex flex-col justify-center items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={ width }
        height={ height }
        viewBox="0 0 24 24"
        fill="none"
        stroke="#006AB6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("animate-spin")}
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
    </div>
  )
}

LoadingSpinner.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string
}

export default LoadingSpinner