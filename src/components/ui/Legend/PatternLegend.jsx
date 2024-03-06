import { colorPalette, colorPaletteBlue, colorPaletteGreen } from '../../../helpers/colors'
import PropTypes from 'prop-types'

function PatternLegend({ colorIndex }) {
  const color = colorPaletteGreen[colorIndex % colorPaletteGreen.length]

  return (
    <div className='ml-4'>
      <svg width="203" height="112" viewBox="0 0 203 112" fill="none" xmlns="http://www.w3.org/2000/svg">

        <g clipPath="url(#clip0_2140_57350)">
          <path fillRule="evenodd" clipRule="evenodd" d="M3.64023 1.27792L3.41594 1.05363L2.66008 1.80949L1.9043 1.05371L1.68001 1.278L2.43579 2.03378L1.68001 2.78956L1.9043 3.01385L2.66008 2.25807L3.41594 3.01393L3.64023 2.78963L2.88437 2.03378L3.64023 1.27792Z" fill={color} />
          <path fillRule="evenodd" clipRule="evenodd" d="M7.38632 1.27792L7.16203 1.05363L6.40617 1.80949L5.65039 1.05371L5.4261 1.278L6.18188 2.03378L5.4261 2.78956L5.65039 3.01385L6.40617 2.25807L7.16203 3.01393L7.38632 2.78963L6.63047 2.03378L7.38632 1.27792Z" fill={color} />
          <path fillRule="evenodd" clipRule="evenodd" d="M11.3844 1.27792L11.1601 1.05363L10.4042 1.80949L9.64844 1.05371L9.42415 1.278L10.1799 2.03378L9.42415 2.78956L9.64844 3.01385L10.4042 2.25807L11.1601 3.01393L11.3844 2.78963L10.6285 2.03378L11.3844 1.27792Z" fill={color} />
          <path fillRule="evenodd" clipRule="evenodd" d="M15.3824 1.27792L15.1581 1.05363L14.4023 1.80949L13.6465 1.05371L13.4222 1.278L14.178 2.03378L13.4222 2.78956L13.6465 3.01385L14.4023 2.25807L15.1581 3.01393L15.3824 2.78963L14.6266 2.03378L15.3824 1.27792Z" fill={color} />
          <path fillRule="evenodd" clipRule="evenodd" d="M19.3805 1.27792L19.1562 1.05363L18.4003 1.80949L17.6445 1.05371L17.4202 1.278L18.176 2.03378L17.4202 2.78956L17.6445 3.01385L18.4003 2.25807L19.1562 3.01393L19.3805 2.78963L18.6246 2.03378L19.3805 1.27792Z" fill={color} />
          <path fillRule="evenodd" clipRule="evenodd" d="M23.3785 1.27792L23.1542 1.05363L22.3984 1.80949L21.6426 1.05371L21.4183 1.278L22.1741 2.03378L21.4183 2.78956L21.6426 3.01385L22.3984 2.25807L23.1542 3.01393L23.3785 2.78963L22.6227 2.03378L23.3785 1.27792Z" fill={color} />
          <path fillRule="evenodd" clipRule="evenodd" d="M27.3766 1.27792L27.1523 1.05363L26.3964 1.80949L25.6406 1.05371L25.4163 1.278L26.1721 2.03378L25.4163 2.78956L25.6406 3.01385L26.3964 2.25807L27.1523 3.01393L27.3766 2.78963L26.6207 2.03378L27.3766 1.27792Z" fill={color} />
          <path fillRule="evenodd" clipRule="evenodd" d="M1.64023 4.71738L1.41594 4.49309L0.660081 5.24894L-0.0956992 4.49316L-0.31999 4.71745L0.43579 5.47323L-0.319991 6.22901L-0.0956992 6.4533L0.660081 5.69752L1.41594 6.45338L1.64023 6.22909L0.884372 5.47323L1.64023 4.71738Z" fill={color} />
          <path fillRule="evenodd" clipRule="evenodd" d="M5.38632 4.71738L5.16203 4.49309L4.40617 5.24894L3.65039 4.49316L3.4261 4.71745L4.18188 5.47323L3.4261 6.22901L3.65039 6.4533L4.40617 5.69752L5.16203 6.45338L5.38632 6.22909L4.63047 5.47323L5.38632 4.71738Z" fill={color} />
          <path fillRule="evenodd" clipRule="evenodd" d="M9.38437 4.71738L9.16008 4.49309L8.40422 5.24894L7.64844 4.49316L7.42415 4.71745L8.17993 5.47323L7.42415 6.22901L7.64844 6.4533L8.40422 5.69752L9.16008 6.45338L9.38437 6.22909L8.62851 5.47323L9.38437 4.71738Z" fill={color} />
          <path fillRule="evenodd" clipRule="evenodd" d="M13.3824 4.71738L13.1581 4.49309L12.4023 5.24894L11.6465 4.49316L11.4222 4.71745L12.178 5.47323L11.4222 6.22901L11.6465 6.4533L12.4023 5.69752L13.1581 6.45338L13.3824 6.22909L12.6266 5.47323L13.3824 4.71738Z" fill={color} />
          <path fillRule="evenodd" clipRule="evenodd" d="M17.3805 4.71738L17.1562 4.49309L16.4003 5.24894L15.6445 4.49316L15.4202 4.71745L16.176 5.47323L15.4202 6.22901L15.6445 6.4533L16.4003 5.69752L17.1562 6.45338L17.3805 6.22909L16.6246 5.47323L17.3805 4.71738Z" fill={color} />
          <path fillRule="evenodd" clipRule="evenodd" d="M21.3785 4.71738L21.1542 4.49309L20.3984 5.24894L19.6426 4.49316L19.4183 4.71745L20.1741 5.47323L19.4183 6.22901L19.6426 6.4533L20.3984 5.69752L21.1542 6.45338L21.3785 6.22909L20.6227 5.47323L21.3785 4.71738Z" fill={color} />
          <path fillRule="evenodd" clipRule="evenodd" d="M25.3766 4.71738L25.1523 4.49309L24.3964 5.24894L23.6406 4.49316L23.4163 4.71745L24.1721 5.47323L23.4163 6.22901L23.6406 6.4533L24.3964 5.69752L25.1523 6.45338L25.3766 6.22909L24.6207 5.47323L25.3766 4.71738Z" fill={color} />
          <path fillRule="evenodd" clipRule="evenodd" d="M28.8492 4.71738L28.6249 4.49309L27.8691 5.24894L27.1133 4.49316L26.889 4.71745L27.6448 5.47323L26.889 6.22901L27.1133 6.4533L27.8691 5.69752L28.6249 6.45338L28.8492 6.22909L28.0934 5.47323L28.8492 4.71738Z" fill={color} />
          <path fillRule="evenodd" clipRule="evenodd" d="M3.64023 8.66855L3.41594 8.44426L2.66008 9.20011L1.9043 8.44433L1.68001 8.66862L2.43579 9.4244L1.68001 10.1802L1.9043 10.4045L2.66008 9.6487L3.41594 10.4046L3.64023 10.1803L2.88437 9.4244L3.64023 8.66855Z" fill={color} />
          <path fillRule="evenodd" clipRule="evenodd" d="M1.64023 12.6207L1.41594 12.3964L0.660081 13.1523L-0.0956992 12.3965L-0.31999 12.6208L0.43579 13.3766L-0.319991 14.1323L-0.0956992 14.3566L0.660081 13.6008L1.41594 14.3567L1.64023 14.1324L0.884372 13.3766L1.64023 12.6207Z" fill={color} />
          <path fillRule="evenodd" clipRule="evenodd" d="M3.64023 16.5719L3.41594 16.3476L2.66008 17.1034L1.9043 16.3477L1.68001 16.5719L2.43579 17.3277L1.68001 18.0835L1.9043 18.3078L2.66008 17.552L3.41594 18.3079L3.64023 18.0836L2.88437 17.3277L3.64023 16.5719Z" fill={color} />
          <path fillRule="evenodd" clipRule="evenodd" d="M7.38632 8.66855L7.16203 8.44426L6.40617 9.20011L5.65039 8.44433L5.4261 8.66862L6.18188 9.4244L5.4261 10.1802L5.65039 10.4045L6.40617 9.6487L7.16203 10.4046L7.38632 10.1803L6.63047 9.4244L7.38632 8.66855Z" fill={color} />
          <path fillRule="evenodd" clipRule="evenodd" d="M5.38632 12.6207L5.16203 12.3964L4.40617 13.1523L3.65039 12.3965L3.4261 12.6208L4.18188 13.3766L3.4261 14.1323L3.65039 14.3566L4.40617 13.6008L5.16203 14.3567L5.38632 14.1324L4.63047 13.3766L5.38632 12.6207Z" fill={color} />
          <path fillRule="evenodd" clipRule="evenodd" d="M7.38632 16.5719L7.16203 16.3476L6.40617 17.1034L5.65039 16.3477L5.4261 16.5719L6.18188 17.3277L5.4261 18.0835L5.65039 18.3078L6.40617 17.552L7.16203 18.3079L7.38632 18.0836L6.63047 17.3277L7.38632 16.5719Z" fill={color} />
          <path fillRule="evenodd" clipRule="evenodd" d="M11.3844 8.66855L11.1601 8.44426L10.4042 9.20011L9.64844 8.44433L9.42415 8.66862L10.1799 9.4244L9.42415 10.1802L9.64844 10.4045L10.4042 9.6487L11.1601 10.4046L11.3844 10.1803L10.6285 9.4244L11.3844 8.66855Z" fill={color} />
          <path fillRule="evenodd" clipRule="evenodd" d="M9.38437 12.6207L9.16008 12.3964L8.40422 13.1523L7.64844 12.3965L7.42415 12.6208L8.17993 13.3766L7.42415 14.1323L7.64844 14.3566L8.40422 13.6008L9.16008 14.3567L9.38437 14.1324L8.62851 13.3766L9.38437 12.6207Z" fill={color} />
          <path fillRule="evenodd" clipRule="evenodd" d="M11.3844 16.5719L11.1601 16.3476L10.4042 17.1034L9.64844 16.3477L9.42415 16.5719L10.1799 17.3277L9.42415 18.0835L9.64844 18.3078L10.4042 17.552L11.1601 18.3079L11.3844 18.0836L10.6285 17.3277L11.3844 16.5719Z" fill={color} />
          <path fillRule="evenodd" clipRule="evenodd" d="M15.3824 8.66855L15.1581 8.44426L14.4023 9.20011L13.6465 8.44433L13.4222 8.66862L14.178 9.4244L13.4222 10.1802L13.6465 10.4045L14.4023 9.6487L15.1581 10.4046L15.3824 10.1803L14.6266 9.4244L15.3824 8.66855Z" fill={color} />
          <path fillRule="evenodd" clipRule="evenodd" d="M13.3824 12.6207L13.1581 12.3964L12.4023 13.1523L11.6465 12.3965L11.4222 12.6208L12.178 13.3766L11.4222 14.1323L11.6465 14.3566L12.4023 13.6008L13.1581 14.3567L13.3824 14.1324L12.6266 13.3766L13.3824 12.6207Z" fill={color} />
          <path fillRule="evenodd" clipRule="evenodd" d="M15.3824 16.5719L15.1581 16.3476L14.4023 17.1034L13.6465 16.3477L13.4222 16.5719L14.178 17.3277L13.4222 18.0835L13.6465 18.3078L14.4023 17.552L15.1581 18.3079L15.3824 18.0836L14.6266 17.3277L15.3824 16.5719Z" fill={color} />
          <path fillRule="evenodd" clipRule="evenodd" d="M19.3805 8.66855L19.1562 8.44426L18.4003 9.20011L17.6445 8.44433L17.4202 8.66862L18.176 9.4244L17.4202 10.1802L17.6445 10.4045L18.4003 9.6487L19.1562 10.4046L19.3805 10.1803L18.6246 9.4244L19.3805 8.66855Z" fill={color} />
          <path fillRule="evenodd" clipRule="evenodd" d="M17.3805 12.6207L17.1562 12.3964L16.4003 13.1523L15.6445 12.3965L15.4202 12.6208L16.176 13.3766L15.4202 14.1323L15.6445 14.3566L16.4003 13.6008L17.1562 14.3567L17.3805 14.1324L16.6246 13.3766L17.3805 12.6207Z" fill={color} />
          <path fillRule="evenodd" clipRule="evenodd" d="M19.3805 16.5719L19.1562 16.3476L18.4003 17.1034L17.6445 16.3477L17.4202 16.5719L18.176 17.3277L17.4202 18.0835L17.6445 18.3078L18.4003 17.552L19.1562 18.3079L19.3805 18.0836L18.6246 17.3277L19.3805 16.5719Z" fill={color} />
          <path fillRule="evenodd" clipRule="evenodd" d="M23.3785 8.66855L23.1542 8.44426L22.3984 9.20011L21.6426 8.44433L21.4183 8.66862L22.1741 9.4244L21.4183 10.1802L21.6426 10.4045L22.3984 9.6487L23.1542 10.4046L23.3785 10.1803L22.6227 9.4244L23.3785 8.66855Z" fill={color} />
          <path fillRule="evenodd" clipRule="evenodd" d="M21.3785 12.6207L21.1542 12.3964L20.3984 13.1523L19.6426 12.3965L19.4183 12.6208L20.1741 13.3766L19.4183 14.1323L19.6426 14.3566L20.3984 13.6008L21.1542 14.3567L21.3785 14.1324L20.6227 13.3766L21.3785 12.6207Z" fill={color} />
          <path fillRule="evenodd" clipRule="evenodd" d="M23.3785 16.5719L23.1542 16.3476L22.3984 17.1034L21.6426 16.3477L21.4183 16.5719L22.1741 17.3277L21.4183 18.0835L21.6426 18.3078L22.3984 17.552L23.1542 18.3079L23.3785 18.0836L22.6227 17.3277L23.3785 16.5719Z" fill={color} />
          <path fillRule="evenodd" clipRule="evenodd" d="M25.3766 12.6207L25.1523 12.3964L24.3964 13.1523L23.6406 12.3965L23.4163 12.6208L24.1721 13.3766L23.4163 14.1323L23.6406 14.3566L24.3964 13.6008L25.1523 14.3567L25.3766 14.1324L24.6207 13.3766L25.3766 12.6207Z" fill={color} />
          <path fillRule="evenodd" clipRule="evenodd" d="M27.3766 8.66855L27.1523 8.44426L26.3964 9.20011L25.6406 8.44433L25.4163 8.66862L26.1721 9.4244L25.4163 10.1802L25.6406 10.4045L26.3964 9.6487L27.1523 10.4046L27.3766 10.1803L26.6207 9.4244L27.3766 8.66855Z" fill={color} />
          <path fillRule="evenodd" clipRule="evenodd" d="M28.8492 12.6207L28.6249 12.3964L27.8691 13.1523L27.1133 12.3965L26.889 12.6208L27.6448 13.3766L26.889 14.1323L27.1133 14.3566L27.8691 13.6008L28.6249 14.3567L28.8492 14.1324L28.0934 13.3766L28.8492 12.6207Z" fill={color} />
          <path fillRule="evenodd" clipRule="evenodd" d="M27.3766 16.5719L27.1523 16.3476L26.3964 17.1034L25.6406 16.3477L25.4163 16.5719L26.1721 17.3277L25.4163 18.0835L25.6406 18.3078L26.3964 17.552L27.1523 18.3079L27.3766 18.0836L26.6207 17.3277L27.3766 16.5719Z" fill={color} />
        </g>
        <rect x="0.75" y="0.75" width="27.5" height="18.5" stroke={"#3E5E5F"} strokeWidth="0.5" />
        <text x="49" y="15" fill="#0F172A" fontSize="16">0 - 25%</text>

        <g clipPath="url(#clip1_2140_57350)">
          <line y1="-0.25" x2="25.6125" y2="-0.25" transform="matrix(0.624695 0.780869 0.780869 -0.624695 24 75)" stroke={color} strokeOpacity="0.7" strokeWidth="0.5" />
          <line y1="-0.25" x2="25.6125" y2="-0.25" transform="matrix(0.624695 0.780869 0.780869 -0.624695 20 75)" stroke={color} strokeOpacity="0.7" strokeWidth="0.5" />
          <line y1="-0.25" x2="25.6125" y2="-0.25" transform="matrix(0.624695 0.780869 0.780869 -0.624695 16 75)" stroke={color} strokeOpacity="0.7" strokeWidth="0.5" />
          <line y1="-0.25" x2="25.6125" y2="-0.25" transform="matrix(0.624695 0.780869 0.780869 -0.624695 12 75)" stroke={color} strokeOpacity="0.7" strokeWidth="0.5" />
          <line y1="-0.25" x2="25.6125" y2="-0.25" transform="matrix(0.624695 0.780869 0.780869 -0.624695 8 75)" stroke={color} strokeOpacity="0.7" strokeWidth="0.5" />
          <line y1="-0.25" x2="25.6125" y2="-0.25" transform="matrix(0.624695 0.780869 0.780869 -0.624695 4 75)" stroke={color} strokeOpacity="0.7" strokeWidth="0.5" />
          <line y1="-0.25" x2="25.6125" y2="-0.25" transform="matrix(0.624695 0.780869 0.780869 -0.624695 0 75)" stroke={color} strokeOpacity="0.7" strokeWidth="0.5" />
          <line y1="-0.25" x2="25.6125" y2="-0.25" transform="matrix(0.624695 0.780869 0.780869 -0.624695 -4 75)" stroke={color} strokeOpacity="0.7" strokeWidth="0.5" />
          <line y1="-0.25" x2="25.6125" y2="-0.25" transform="matrix(0.624695 0.780869 0.780869 -0.624695 -8 75)" stroke={color} strokeOpacity="0.7" strokeWidth="0.5" />
          <line y1="-0.25" x2="25.6125" y2="-0.25" transform="matrix(0.624695 0.780869 0.780869 -0.624695 -12 75)" stroke={color} strokeOpacity="0.7" strokeWidth="0.5" />
        </g>
        <rect x="0.75" y="75.75" width="27.5" height="18.5" stroke={"#3E5E5F"} strokeWidth="0.5" />
        <text x="49" y="40" fill="#0F172A" fontSize="16">25 - 50%</text>

        <g clipPath="url(#clip2_2140_57350)">
          <circle cx="3.27344" cy="52.7949" r="0.466797" fill={color} />
          <circle cx="7.21875" cy="52.7949" r="0.466797" fill={color} />
          <circle cx="11.1641" cy="52.7949" r="0.466797" fill={color} />
          <circle cx="15.1094" cy="52.7949" r="0.466797" fill={color} />
          <circle cx="19.0547" cy="52.7949" r="0.466797" fill={color} />
          <circle cx="23" cy="52.7949" r="0.466797" fill={color} />
          <circle cx="26.9453" cy="52.7949" r="0.466797" fill={color} />
          <circle cx="1.32812" cy="54.8535" r="0.466797" fill={color} />
          <circle cx="1.32812" cy="58.9707" r="0.466797" fill={color} />
          <circle cx="1.32812" cy="63.0879" r="0.466797" fill={color} />
          <circle cx="1.32812" cy="67.2051" r="0.466797" fill={color} />
          <circle cx="5.27344" cy="54.8535" r="0.466797" fill={color} />
          <circle cx="3.27344" cy="56.9121" r="0.466797" fill={color} />
          <circle cx="5.27344" cy="58.9707" r="0.466797" fill={color} />
          <circle cx="3.27344" cy="61.0293" r="0.466797" fill={color} />
          <circle cx="3.27344" cy="65.1465" r="0.466797" fill={color} />
          <circle cx="5.27344" cy="63.0879" r="0.466797" fill={color} />
          <circle cx="5.27344" cy="67.2051" r="0.466797" fill={color} />
          <circle cx="9.21875" cy="54.8535" r="0.466797" fill={color} />
          <circle cx="7.21875" cy="56.9121" r="0.466797" fill={color} />
          <circle cx="9.21875" cy="58.9707" r="0.466797" fill={color} />
          <circle cx="7.21875" cy="61.0293" r="0.466797" fill={color} />
          <circle cx="7.21875" cy="65.1465" r="0.466797" fill={color} />
          <circle cx="9.21875" cy="63.0879" r="0.466797" fill={color} />
          <circle cx="9.21875" cy="67.2051" r="0.466797" fill={color} />
          <circle cx="13.1641" cy="54.8535" r="0.466797" fill={color} />
          <circle cx="11.1641" cy="56.9121" r="0.466797" fill={color} />
          <circle cx="13.1641" cy="58.9707" r="0.466797" fill={color} />
          <circle cx="11.1641" cy="61.0293" r="0.466797" fill={color} />
          <circle cx="11.1641" cy="65.1465" r="0.466797" fill={color} />
          <circle cx="13.1641" cy="63.0879" r="0.466797" fill={color} />
          <circle cx="13.1641" cy="67.2051" r="0.466797" fill={color} />
          <circle cx="17.1094" cy="54.8535" r="0.466797" fill={color} />
          <circle cx="15.1094" cy="56.9121" r="0.466797" fill={color} />
          <circle cx="17.1094" cy="58.9707" r="0.466797" fill={color} />
          <circle cx="15.1094" cy="61.0293" r="0.466797" fill={color} />
          <circle cx="15.1094" cy="65.1465" r="0.466797" fill={color} />
          <circle cx="17.1094" cy="63.0879" r="0.466797" fill={color} />
          <circle cx="17.1094" cy="67.2051" r="0.466797" fill={color} />
          <circle cx="21.0547" cy="54.8535" r="0.466797" fill={color} />
          <circle cx="19.0547" cy="56.9121" r="0.466797" fill={color} />
          <circle cx="21.0547" cy="58.9707" r="0.466797" fill={color} />
          <circle cx="19.0547" cy="61.0293" r="0.466797" fill={color} />
          <circle cx="19.0547" cy="65.1465" r="0.466797" fill={color} />
          <circle cx="21.0547" cy="63.0879" r="0.466797" fill={color} />
          <circle cx="21.0547" cy="67.2051" r="0.466797" fill={color} />
          <circle cx="25" cy="54.8535" r="0.466797" fill={color} />
          <circle cx="23" cy="56.9121" r="0.466797" fill={color} />
          <circle cx="25" cy="58.9707" r="0.466797" fill={color} />
          <circle cx="23" cy="61.0293" r="0.466797" fill={color} />
          <circle cx="23" cy="65.1465" r="0.466797" fill={color} />
          <circle cx="25" cy="63.0879" r="0.466797" fill={color} />
          <circle cx="25" cy="67.2051" r="0.466797" fill={color} />
          <circle cx="26.9453" cy="56.9121" r="0.466797" fill={color} />
          <circle cx="26.9453" cy="61.0293" r="0.466797" fill={color} />
          <circle cx="26.9453" cy="65.1465" r="0.466797" fill={color} />
        </g>
        <rect x="0.75" y="50.75" width="27.5" height="18.5" stroke={"#3E5E5F"} strokeWidth="0.5" />
        <text x="49" y="65" fill="#0F172A" fontSize="16">50 - 75%</text>

        <g clipPath="url(#clip3_2140_57350)">
          <line x1="4.19522" y1="25.1562" x2="-11.8048" y2="45.1562" stroke={color} strokeOpacity="0.7" strokeWidth="0.5" />
          <line y1="-0.25" x2="25.6125" y2="-0.25" transform="matrix(0.624695 0.780869 0.780869 -0.624695 24 25)" stroke={color} strokeOpacity="0.7" strokeWidth="0.5" />
          <line x1="8.19522" y1="25.1562" x2="-7.80478" y2="45.1562" stroke={color} strokeOpacity="0.7" strokeWidth="0.5" />
          <line y1="-0.25" x2="25.6125" y2="-0.25" transform="matrix(0.624695 0.780869 0.780869 -0.624695 20 25)" stroke={color} strokeOpacity="0.7" strokeWidth="0.5" />
          <line x1="12.1952" y1="25.1562" x2="-3.80478" y2="45.1562" stroke={color} strokeOpacity="0.7" strokeWidth="0.5" />
          <line y1="-0.25" x2="25.6125" y2="-0.25" transform="matrix(0.624695 0.780869 0.780869 -0.624695 16 25)" stroke={color} strokeOpacity="0.7" strokeWidth="0.5" />
          <line x1="16.1952" y1="25.1562" x2="0.195217" y2="45.1562" stroke={color} strokeOpacity="0.7" strokeWidth="0.5" />
          <line y1="-0.25" x2="25.6125" y2="-0.25" transform="matrix(0.624695 0.780869 0.780869 -0.624695 12 25)" stroke={color} strokeOpacity="0.7" strokeWidth="0.5" />
          <line x1="20.1952" y1="25.1562" x2="4.19522" y2="45.1562" stroke={color} strokeOpacity="0.7" strokeWidth="0.5" />
          <line y1="-0.25" x2="25.6125" y2="-0.25" transform="matrix(0.624695 0.780869 0.780869 -0.624695 8 25)" stroke={color} strokeOpacity="0.7" strokeWidth="0.5" />
          <line x1="24.1952" y1="25.1562" x2="8.19522" y2="45.1562" stroke={color} strokeOpacity="0.7" strokeWidth="0.5" />
          <line y1="-0.25" x2="25.6125" y2="-0.25" transform="matrix(0.624695 0.780869 0.780869 -0.624695 4 25)" stroke={color} strokeOpacity="0.7" strokeWidth="0.5" />
          <line x1="28.1952" y1="25.1562" x2="12.1952" y2="45.1562" stroke={color} strokeOpacity="0.7" strokeWidth="0.5" />
          <line y1="-0.25" x2="25.6125" y2="-0.25" transform="matrix(0.624695 0.780869 0.780869 -0.624695 0 25)" stroke={color} strokeOpacity="0.7" strokeWidth="0.5" />
          <line x1="32.1952" y1="25.1562" x2="16.1952" y2="45.1562" stroke={color} strokeOpacity="0.7" strokeWidth="0.5" />
          <line y1="-0.25" x2="25.6125" y2="-0.25" transform="matrix(0.624695 0.780869 0.780869 -0.624695 -4 25)" stroke={color} strokeOpacity="0.7" strokeWidth="0.5" />
          <line x1="36.1952" y1="25.1562" x2="20.1952" y2="45.1562" stroke={color} strokeOpacity="0.7" strokeWidth="0.5" />
          <line y1="-0.25" x2="25.6125" y2="-0.25" transform="matrix(0.624695 0.780869 0.780869 -0.624695 -8 25)" stroke={color} strokeOpacity="0.7" strokeWidth="0.5" />
          <line x1="40.1952" y1="25.1562" x2="24.1952" y2="45.1562" stroke={color} strokeOpacity="0.7" strokeWidth="0.5" />
          <line y1="-0.25" x2="25.6125" y2="-0.25" transform="matrix(0.624695 0.780869 0.780869 -0.624695 -12 25)" stroke={color} strokeOpacity="0.7" strokeWidth="0.5" />
        </g>
        <rect x="0.75" y="25.75" width="27.5" height="18.5" stroke={"#3E5E5F"} strokeWidth="0.5" />
        <text x="49" y="90" fill="#0F172A" fontSize="16">{">"} 75%</text>

        <defs>
          <clipPath id="clip0_2140_57350">
            <rect x="1" y="1" width="27" height="18" fill="white" />
          </clipPath>
          <clipPath id="clip1_2140_57350">
            <rect x="1" y="76" width="27" height="18" fill="white" />
          </clipPath>
          <clipPath id="clip2_2140_57350">
            <rect x="1" y="51" width="27" height="18" fill="white" />
          </clipPath>
          <clipPath id="clip3_2140_57350">
            <rect x="1" y="26" width="27" height="18" fill="white" />
          </clipPath>
        </defs>
        
      </svg>
    </div>
  )
}

PatternLegend.propTypes = {
  colorIndex: PropTypes.string // Add this line to validate the 'color' prop
}

export default PatternLegend