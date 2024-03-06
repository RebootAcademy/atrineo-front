import { colorPalette, colorPaletteBlue, colorPaletteGreen } from '../../../helpers/colors'
import PropTypes from 'prop-types'

function PatternManager({ colorIndex }) {
  const color = colorPaletteGreen[colorIndex % colorPaletteGreen.length]

  return (
    <svg xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', width: 0, height: 0 }}>
      <defs>
        {/* Patrón de Puntos */}
        <pattern id="patternDots" patternUnits="userSpaceOnUse" width="10" height="10">
          <circle cx="5" cy="5" r="2" fill={color} />
        </pattern>
        {/* Patrón de Rayas Diagonales */}
        <pattern id="patternStripes" patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="10" stroke={color} strokeWidth="5" />
        </pattern>
        {/* Patrón de Cuadrícula */}
        <pattern id="patternGrid" patternUnits="userSpaceOnUse" width="10" height="10">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke={color} strokeWidth="1" />
        </pattern>
        {/* Patrón de Zigzag */}
        <pattern id="patternZigzag" patternUnits="userSpaceOnUse" width="10" height="10">
          <path d="M 0 10 l 5 -10 l 5 10 M 0 0 l 5 10 l 5 -10" stroke={color} strokeWidth="0.7" fill="none" />
        </pattern>
        {/* Define más patrones según sea necesario */}
      </defs>
    </svg>
  )
}

PatternManager.propTypes = {
  colorIndex: PropTypes.number // Add this line to validate the 'color' prop
}

export default PatternManager