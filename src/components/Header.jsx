import React from "react"
import styled from "styled-components"

const Header = ({ title }) => {
  return (
    <Container>
      <span>{"<"}</span>
      <Title>{title ?? "Header"}</Title>
      <button>보관함 가기</button>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 56px;
  border-bottom: 1px solid gray;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 18px;
  cursor: default;
`

const Title = styled.h3`
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 18px;
  font-weight: bold;
  transform: translate(-50%, -50%);
`

export default Header
