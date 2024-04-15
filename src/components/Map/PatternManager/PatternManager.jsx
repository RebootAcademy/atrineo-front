import PropTypes from 'prop-types'

function PatternManager({color}) {

  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', width: 0, height: 0 }} >
        <defs>
          <pattern id="patternDots" patternUnits="userSpaceOnUse" width="10" height="10" >
            <circle cx="5" cy="5" r="2" fill={color} />
          </pattern>

          <pattern id="patternStripes" patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="10" stroke={color} strokeWidth="5" />
          </pattern>

          <pattern id="patternGrid" patternUnits="userSpaceOnUse" width="10" height="10">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke={color} strokeWidth="1" />
          </pattern>

          <pattern id="patternZigzag" patternUnits="userSpaceOnUse" width="10" height="10">
            <path d="M 0 10 l 5 -10 l 5 10 M 0 0 l 5 10 l 5 -10" stroke={color} strokeWidth="0.7" fill="none" />
          </pattern>
        </defs>
      </svg>
    </>
  )
}

PatternManager.propTypes = {
  color: PropTypes.string 
}

export default PatternManager