import React from "react"
import styled from "styled-components"
import Header from "../components/Header"
import RepoCard from "../components/RepoCard"

const Main = () => {
  return (
    <Container>
      <Header title="메인" />
      <ContentWrapper>
        <Input placeholder="repo를 검색해주세요." />
        <RepoCard />
      </ContentWrapper>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`

const Input = styled.input`
  width: 100%;
  border-radius: 5px;
  font-size: 14px;
  padding: 8px 12px;
  border: 1.5px solid black;
`

const ContentWrapper = styled.div`
  width: 100%;
  padding: 0 18px;
`

export default Main
