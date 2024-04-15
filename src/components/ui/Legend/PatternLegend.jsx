import PropTypes from 'prop-types'

function PatternLegend({ layer }) {
  const {color} = layer.data

  console.log(layer)

  return (
    <div className='ml-4'>
      <svg width="203" height="112" viewBox="0 0 203 112" fill="none" xmlns="http://www.w3.org/2000/svg">

        <defs>
          <pattern id="patternDotsLegend" patternUnits="userSpaceOnUse" width="10" height="10">
            <circle cx="5" cy="5" r="2" fill={color} />
          </pattern>
          <pattern id="patternStripesLegend" patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="10" stroke={color} strokeWidth="5" />
          </pattern>
          <pattern id="patternGridLegend" patternUnits="userSpaceOnUse" width="10" height="10">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke={color} strokeWidth="1" />
          </pattern>

          <pattern id="patternZigzagLegend" patternUnits="userSpaceOnUse" width="10" height="10">
            <path d="M 0 10 l 5 -10 l 5 10 M 0 0 l 5 10 l 5 -10" stroke={color} strokeWidth="0.7" fill="none" />
          </pattern>
        </defs>

        <g clipPath="url(#clip0_2140_57350)">
          <rect x="1" y="1" width="27" height="18" fill='url(#patternDotsLegend)' stroke={"#3E5E5F"} strokeWidth="0.5"/>
          <rect x="1" y="1" width="27" height="18" fill={color} fillOpacity={0.3} stroke={"#3E5E5F"} strokeWidth="0.5"/>
        </g>
        <text x="49" y="15" fill="#0F172A" fontSize="16">0 - 25%</text>

        <g clipPath="url(#clip3_2140_57350)">
          <rect x="1" y="25" width="27" height="18" fill='url(#patternZigzagLegend)' stroke={"#3E5E5F"} strokeWidth="0.5"/>
          <rect x="1" y="25" width="27" height="18" fill={color} fillOpacity={0.3} stroke={"#3E5E5F"} strokeWidth="0.5"/>
        </g>
        <text x="49" y="40" fill="#0F172A" fontSize="16">25 - 50%</text>

        <g clipPath="url(#clip2_2140_57350)">
          <rect x="1" y="51" width="27" height="18" fill='url(#patternGridLegend)' stroke={"#3E5E5F"} strokeWidth="0.5" />
          <rect x="1" y="51" width="27" height="18" fill={color} fillOpacity={0.3} stroke={"#3E5E5F"} strokeWidth="0.5" />
        </g>
        <text x="49" y="65" fill="#0F172A" fontSize="16">50 - 75%</text>

        <g clipPath="url(#clip1_2140_57350)">
          <rect x="1" y="76" width="27" height="18" fill='url(#patternStripesLegend)' stroke={"#3E5E5F"} strokeWidth="0.5"/>
          <rect x="1" y="76" width="27" height="18" fill={color} fillOpacity={0.3} stroke={"#3E5E5F"} strokeWidth="0.5"/>
        </g>
        <text x="49" y="90" fill="#0F172A" fontSize="16">{">"} 75%</text>

      </svg>
    </div>
  )
}

PatternLegend.propTypes = {
  layer: PropTypes.object,
}

export default PatternLegend


