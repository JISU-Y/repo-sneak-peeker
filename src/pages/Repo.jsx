import React from "react"
import styled from "styled-components"
import Header from "../components/Header"
import RepoCard from "../components/RepoCard"
import { Container } from "../styles/commonComponent"

const Repo = () => {
  return (
    <Container>
      <Header title="레포 보관함" />
      <ContentWrapper>
        <RepoCard useDelete />
      </ContentWrapper>
    </Container>
  )
}

const ContentWrapper = styled.div`
  width: 100%;
  padding: 0 18px;
`

export default Repo
