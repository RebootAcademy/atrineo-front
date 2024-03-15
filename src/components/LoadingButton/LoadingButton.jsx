import LoadingSpinner from "../LoadingSpinner/LoadingSpinner"

import { Button } from "../ui/Button/Button"

function LoadingButton() {
  return (
    <Button disabled className="ml-2">
      <LoadingSpinner width="10" height="10"/>
      Updating...
    </Button>
  )
}

export default LoadingButton
