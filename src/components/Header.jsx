import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import styled from "styled-components"

const Header = ({ title }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [presentPage, setPresentPage] = useState("")

  useEffect(() => {
    setPresentPage(location.pathname.slice(1))
  }, [location.pathname])

  const backToPrevPage = () => navigate(-1)

  const goToRepoPage = () => navigate("/repo")

  return (
    <Container>
      <span onClick={backToPrevPage}>{"<"}</span>
      <Title>{title ?? "Header"}</Title>
      {presentPage === "" && <button onClick={goToRepoPage}>보관함 가기</button>}
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
  margin-bottom: 18px;
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
