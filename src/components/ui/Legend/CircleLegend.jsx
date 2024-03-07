function CircleLegend() {
  return (
    <svg width="200" height="136" viewBox="0 0 183 136" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M103.731 80.5C103.731 109.359 80.5634 132.75 51.9903 132.75C23.4172 132.75 0.25 109.359 0.25 80.5C0.25 51.6408 23.4172 28.25 51.9903 28.25C80.5634 28.25 103.731 51.6408 103.731 80.5Z" fill='var(--primary)' fillOpacity="0.2" stroke='var(--primary)' strokeWidth="0.5" />
      <path d="M93.75 90.5C93.75 113.837 75.0551 132.75 52 132.75C28.9449 132.75 10.25 113.837 10.25 90.5C10.25 67.1632 28.9449 48.25 52 48.25C75.0551 48.25 93.75 67.1632 93.75 90.5Z" fill='var(--primary)' fillOpacity="0.2" stroke='var(--primary)' strokeWidth="0.5" />
      <circle cx="52" cy="99" r="33.75" fill='var(--primary)' fillOpacity="0.2" stroke='var(--primary)' strokeWidth="0.5" />
      <circle cx="52" cy="107" r="25.75" fill='var(--primary)' fillOpacity="0.2" stroke='var(--primary)' strokeWidth="0.5" />
      <circle cx="52" cy="115" r="17.75" fill='var(--primary)' fillOpacity="0.2" stroke='var(--primary)' strokeWidth="0.5" />
      
      <text x="154" y="30" fill="#0F172A" fontSize="10">Max</text>
      <text x="154" y="134" fill="#0F172A" fontSize="10">Min</text>

      <line x1="52" y1="132.75" x2="143" y2="132.75" stroke="black" strokeWidth="0.5" strokeDasharray="1 1" />
      <line x1="52" y1="27.75" x2="143" y2="27.75" stroke="black" strokeWidth="0.5" strokeDasharray="1 1" />
      
      <path d="M111 28L109.557 30.5L112.443 30.5L111 28ZM111 133L112.443 130.5L109.557 130.5L111 133ZM110.75 30.25L110.75 130.75L111.25 130.75L111.25 30.25L110.75 30.25Z" fill="black" />
      <path d="M119 48L117.557 50.5L120.443 50.5L119 48ZM119 133L120.443 130.5L117.557 130.5L119 133ZM118.75 50.25L118.75 130.75L119.25 130.75L119.25 50.25L118.75 50.25Z" fill="black" />
      <path d="M127 65L125.557 67.5L128.443 67.5L127 65ZM127 133L128.443 130.5L125.557 130.5L127 133ZM126.75 67.25L126.75 130.75L127.25 130.75L127.25 67.25L126.75 67.25Z" fill="black" />
      <path d="M135 81L133.557 83.5L136.443 83.5L135 81ZM135 133L136.443 130.5L133.557 130.5L135 133ZM134.75 83.25L134.75 130.75L135.25 130.75L135.25 83.25L134.75 83.25Z" fill="black" />
      <path d="M143 97L141.557 99.5L144.443 99.5L143 97ZM143 133L144.443 130.5L141.557 130.5L143 133ZM142.75 99.25L142.75 130.75L143.25 130.75L143.25 99.25L142.75 99.25Z" fill="black" />
    </svg>
  )
}

export default CircleLegend