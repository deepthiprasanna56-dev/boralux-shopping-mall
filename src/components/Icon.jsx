import React from 'react'

export default function Icon({ name, size = 20, className = '', ...props }) {
  const icons = {
    bts: (
      <g fill="currentColor">
        <path d="M4.5 4.5 L10.5 6.2 L10.5 17.8 L4.5 19.5 Z" />
        <path d="M13.5 6.2 L19.5 4.5 L19.5 19.5 L13.5 17.8 Z" />
      </g>
    ),
    army: (
      <g fill="currentColor">
        <path d="M4.5 6.2 L10.5 4.5 L10.5 19.5 L4.5 17.8 Z" />
        <path d="M13.5 4.5 L19.5 6.2 L19.5 17.8 L13.5 19.5 Z" />
      </g>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" strokeWidth="1.8" />
        <path d="m20 20-4.35-4.35" strokeWidth="1.8" />
      </>
    ),
    bag: (
      <>
        <path d="M6 7h12l1.2 13H4.8L6 7Z" strokeWidth="1.8" />
        <path d="M9 8V5.5a3 3 0 0 1 6 0V8" strokeWidth="1.8" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" strokeWidth="1.8" />
        <path d="M5 20a7 7 0 0 1 14 0" strokeWidth="1.8" />
      </>
    ),
    heart: (
      <path
        d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8Z"
        strokeWidth="1.8"
      />
    ),
    arrow: (
      <>
        <path d="M5 12h14" strokeWidth="1.8" />
        <path d="m13 6 6 6-6 6" strokeWidth="1.8" />
      </>
    ),
    arrowLeft: (
      <>
        <path d="M19 12H5" strokeWidth="1.8" />
        <path d="m11 18-6-6 6-6" strokeWidth="1.8" />
      </>
    ),
    menu: (
      <>
        <path d="M4 6h16" strokeWidth="2" />
        <path d="M4 12h16" strokeWidth="2" />
        <path d="M4 18h16" strokeWidth="2" />
      </>
    ),
    close: (
      <>
        <path d="m18 6-12 12" strokeWidth="2" />
        <path d="m6 6 12 12" strokeWidth="2" />
      </>
    ),
    check: <path d="m4.5 12.5 5 5 10-10" strokeWidth="2" />,
    trash: (
      <>
        <path d="M3 6h18" strokeWidth="1.8" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" strokeWidth="1.8" />
        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" strokeWidth="1.8" />
        <line x1="10" y1="11" x2="10" y2="17" strokeWidth="1.8" />
        <line x1="14" y1="11" x2="14" y2="17" strokeWidth="1.8" />
      </>
    ),
    star: (
      <polygon
        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
        strokeWidth="1.6"
      />
    ),
    sparkles: (
      <>
        <path d="m12 3 1.9 4.8L18.7 9.7l-4.8 1.9L12 16.4l-1.9-4.8L5.3 9.7l4.8-1.9L12 3z" strokeWidth="1.6" />
        <path d="M19 16l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8.8-2z" strokeWidth="1.3" />
      </>
    ),
    truck: (
      <>
        <rect x="1" y="5" width="14" height="11" rx="1.5" strokeWidth="1.8" />
        <path d="M15 8h4l3 3v5h-7V8z" strokeWidth="1.8" />
        <circle cx="5.5" cy="18.5" r="2.5" strokeWidth="1.8" />
        <circle cx="17.5" cy="18.5" r="2.5" strokeWidth="1.8" />
      </>
    ),
    shield: (
      <path
        d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
        strokeWidth="1.8"
      />
    ),
    rotate: (
      <>
        <path d="M21 12a9 9 0 1 1-2.6-6.4L21 8" strokeWidth="1.8" />
        <path d="M21 3v5h-5" strokeWidth="1.8" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="10" strokeWidth="1.8" />
        <polyline points="12 6 12 12 16 14" strokeWidth="1.8" />
      </>
    ),
    pin: (
      <>
        <path d="M12 21s-7-6.5-7-11.5a7 7 0 0 1 14 0c0 5-7 11.5-7 11.5z" strokeWidth="1.8" />
        <circle cx="12" cy="9.5" r="2.5" strokeWidth="1.8" />
      </>
    ),
    phone: (
      <path
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
        strokeWidth="1.8"
      />
    ),
    mail: (
      <>
        <rect x="2" y="4" width="20" height="16" rx="2" strokeWidth="1.8" />
        <path d="m22 7-10 6L2 7" strokeWidth="1.8" />
      </>
    ),
    tag: (
      <>
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" strokeWidth="1.8" />
        <line x1="7" y1="7" x2="7.01" y2="7" strokeWidth="2.5" />
      </>
    ),
    filter: (
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" strokeWidth="1.8" />
    ),
    chevronRight: <polyline points="9 18 15 12 9 6" strokeWidth="2" />,
    chevronLeft: <polyline points="15 18 9 12 15 6" strokeWidth="2" />,
    chevronDown: <polyline points="6 9 12 15 18 9" strokeWidth="2" />,
    eye: (
      <>
        <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="3" strokeWidth="1.8" />
      </>
    ),
    eyeOff: (
      <>
        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" strokeWidth="1.8" />
        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c6.36 0 10 7 10 7a13.9 13.9 0 0 1-2.92 4.14" strokeWidth="1.8" />
        <path d="M6.1 6.1A14.28 14.28 0 0 0 2 12s3.64 7 10 7a10.4 10.4 0 0 0 4.27-.88" strokeWidth="1.8" />
        <line x1="2" y1="2" x2="22" y2="22" strokeWidth="2" />
      </>
    ),
    copy: (
      <>
        <rect x="9" y="9" width="13" height="13" rx="2" strokeWidth="1.8" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" strokeWidth="1.8" />
      </>
    ),
    ticket: (
      <>
        <path d="M2 9a3 3 0 0 1 0 6v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a3 3 0 0 1 0-6V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v5z" strokeWidth="1.8" />
        <line x1="9" y1="2" x2="9" y2="22" strokeWidth="1.5" strokeDasharray="3 3" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="1.8" />
        <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2" />
        <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2" />
        <line x1="3" y1="10" x2="21" y2="10" strokeWidth="1.8" />
      </>
    ),
    external: (
      <>
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" strokeWidth="1.8" />
        <polyline points="15 3 21 3 21 9" strokeWidth="2" />
        <line x1="10" y1="14" x2="21" y2="3" strokeWidth="2" />
      </>
    ),
    plus: (
      <>
        <line x1="12" y1="5" x2="12" y2="19" strokeWidth="2" />
        <line x1="5" y1="12" x2="19" y2="12" strokeWidth="2" />
      </>
    ),
    minus: <line x1="5" y1="12" x2="19" y2="12" strokeWidth="2" />,
    gift: (
      <>
        <polyline points="20 12 20 22 4 22 4 12" strokeWidth="1.8" />
        <rect x="2" y="7" width="20" height="5" strokeWidth="1.8" />
        <line x1="12" y1="22" x2="12" y2="7" strokeWidth="1.8" />
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" strokeWidth="1.8" />
        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" strokeWidth="1.8" />
      </>
    ),
  }

  const isEmblem = name === 'bts' || name === 'army'

  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={isEmblem ? 'currentColor' : 'none'}
      stroke={isEmblem ? 'none' : 'currentColor'}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {icons[name] || icons.sparkles}
    </svg>
  )
}
