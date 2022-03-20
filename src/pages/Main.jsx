import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import styled from "styled-components"
import Header from "../components/Header"
import RepoCard from "../components/RepoCard"
import { fetchRepos, loadMore } from "../redux/reducers/repoReducer"
import { Container } from "../styles/commonComponent"

const Main = () => {
  const [target, setTarget] = useState(null)
  const [text, setText] = useState("")
  const dispatch = useDispatch()
  const [page, setPage] = useState(0)

  const { data, pageItems, maxPage, loading } = useSelector((state) => state.repoData)
  // input에 입력할때마다 불필요한 렌더링 일어나지 않도록 memo 사용하기

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(fetchRepos(text))
    setText("")
  }

  useEffect(() => {
    const onIntersect = async ([entry], observer) => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target)
        // next page
        setPage((prev) => prev + 1)
        observer.observe(entry.target)
      }
    }

    let observer
    if (target) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.4,
      })
      observer.observe(target)
    }
    return () => observer && observer.disconnect()
  }, [target])

  useEffect(() => {
    if (!data?.items && page !== maxPage) return

    // fetch more
    dispatch(loadMore(page))
  }, [dispatch, page, data?.items, maxPage])

  return (
    <Container>
      <Header title="메인" />
      <ContentWrapper>
        <SearchForm onSubmit={handleSubmit}>
          <Input placeholder="repo를 검색해주세요." value={text} onChange={(e) => setText(e.target.value)} />
          <SearchButton type="submit">검색</SearchButton>
        </SearchForm>
        {pageItems?.map((repo) => (
          <RepoCard key={repo.id} repoInfo={repo} />
        ))}
      </ContentWrapper>
      {data?.items.length > 0 && page !== maxPage && <TargetDiv ref={setTarget} />}
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

const TargetDiv = styled.div`
  height: 30px;
`

export default Main
