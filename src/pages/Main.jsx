import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import styled from "styled-components"
import Header from "../components/Header"
import RepoCard from "../components/RepoCard"
import { fetchRepos } from "../redux/reducers/repoReducer"
import { Container } from "../styles/commonComponent"

const Main = () => {
  const [text, setText] = useState("")
  const dispatch = useDispatch()

  const { data, loading } = useSelector((state) => state.repoData)
  // input에 입력할때마다 불필요한 렌더링 일어나지 않도록 memo 사용하기

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(fetchRepos(text))
    setText("")
  }

  // 무한 스크롤 구현
  // console.log(data?.items)

  return (
    <Container>
      <Header title="메인" />
      <ContentWrapper>
        <SearchForm onSubmit={handleSubmit}>
          <Input placeholder="repo를 검색해주세요." value={text} onChange={(e) => setText(e.target.value)} />
          <SearchButton type="submit">검색</SearchButton>
        </SearchForm>
        {data?.items.map((repo) => (
          <RepoCard key={repo.id} repoInfo={repo} />
        ))}
      </ContentWrapper>
    </Container>
  )
}

const ContentWrapper = styled.div`
  width: 100%;
  padding: 0 18px;
`

const SearchForm = styled.form`
  width: 100%;
  border-radius: 5px;
  border: 1.5px solid black;
  display: flex;
  overflow: hidden;
`

const Input = styled.input`
  font-size: 14px;
  padding: 8px 12px;
  border: none;
  flex: 1;
  &:focus {
    outline: none;
  }
`

const SearchButton = styled.button`
  font-size: 14px;
  height: 100%;
  padding: 8px 12px;
  border: none;
  cursor: pointer;
`

export default Main
