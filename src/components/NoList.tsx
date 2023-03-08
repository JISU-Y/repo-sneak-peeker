import React from 'react'
import styled from 'styled-components'

interface NoListProps {
  msg: string
}

const NoList = ({ msg = '리스트가 없습니다.' }: NoListProps) => {
  return <Container>{msg}</Container>
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  padding: 36px 0;
`

export default NoList
