import { css } from 'styled-components'

export const singleLineEllipsis = css`
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const multiLineEllipsis = css<{ lineClamp?: number }>`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: ${({ lineClamp }) => (lineClamp ? lineClamp : 2)};
  -webkit-box-orient: vertical;
`
