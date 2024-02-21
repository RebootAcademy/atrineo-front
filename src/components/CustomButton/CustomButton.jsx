/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types'
import { Button } from '../ui/Button/Button'

function CustomButton ({ text, variant = 'default', fn, img }) {
  return (
    <Button
      variant={variant}
      onClick={fn}
    >
      {
        img &&
        <img
          src={img}
          className='mr-2'
        />
      }
      { text }
    </Button>
  )
}

CustomButton.propTypes = {
  variant: PropTypes.string,
  text: PropTypes.string,
  fn: PropTypes.func,
  img: PropTypes.string
}

export default CustomButton
