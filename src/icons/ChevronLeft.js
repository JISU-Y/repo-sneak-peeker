import React from 'react'

export default function ChevronLeft({ width = '1em', height = '1em', fill, ...rest }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 64 64"
      fill={fill}
      preserveAspectRatio="xMinYMin meet"
      {...rest}
    >
      <path
        clipRule="evenodd"
        d="M12.533 32c0 1.091.514 2.119 1.387 2.773l32 24a3.467 3.467 0 0 0 4.16-5.546L21.778 32 50.08 10.773a3.467 3.467 0 1 0-4.16-5.546l-32 24A3.467 3.467 0 0 0 12.533 32z"
      />
    </svg>
  )
}
