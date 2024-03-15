import LoadingSpinner from "../LoadingSpinner/LoadingSpinner"

import { Button } from "../ui/Button/Button"

function LoadingButton() {
  return (
    <div className="flex justify-center">
      <Button disabled className="ml-2">
        <LoadingSpinner width="10" height="10" />
        Updating...
      </Button>
    </div>
  )
}

export default LoadingButton
