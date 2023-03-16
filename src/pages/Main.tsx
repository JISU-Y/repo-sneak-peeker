import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import styled from 'styled-components'
import Header from '../components/Header'
import NoList from '../components/NoList'
import RepoCard from '../components/RepoCard'
import Skeleton from '../components/SkeletonRepo'
import { cleanupFeedback, fetchRepos, loadMore } from '../redux/reducers/repoReducer'
import { Container } from '../styles/commonComponent'

type IntersectHandler = (entry: IntersectionObserverEntry, observer: IntersectionObserver) => void

const Main = () => {
  const [text, setText] = useState('')
  const ref = useRef<HTMLDivElement>(null)

  const dispatch = useDispatch()

  const { data, pageItems, page, maxPage, feedback, loading } = useSelector(
    (state: RootState) => state.repoData
  )

  const isResultNotFound = useMemo(() => {
    if (data) {
      return data?.items.length < 1
    }
    return false
  }, [data])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!text) {
      return
    }

    e.preventDefault()
    dispatch(fetchRepos(text))
    setText('')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  const onIntersect = useCallback<IntersectHandler>(
    (entry, observer) => {
      observer.unobserve(entry.target)

      if (page !== maxPage) {
        dispatch(loadMore(page + 1))
      }
    },
    [dispatch, page, maxPage]
  )

  const callback = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onIntersect(entry, observer)
        }
      })
    },
    [onIntersect]
  )

  useEffect(() => {
    if (!ref.current) {
      return
    }

    const observer = new IntersectionObserver(callback, {
      threshold: 0.2
    })
    observer.observe(ref.current)

    return () => {
      observer.disconnect()
    }
  }, [dispatch, ref, page, callback])

  useEffect(() => {
    dispatch(cleanupFeedback())

    if (feedback.msg) {
      alert(feedback.msg)
    }
  }, [feedback, dispatch])

  return (
    <Container>
      <Header title="레포 검색" />
      <SearchFormWrapper>
        <SearchForm onSubmit={handleSubmit}>
          <Input placeholder="repo를 검색해주세요." value={text} onChange={handleInputChange} />
          <SearchButton type="submit">검색</SearchButton>
        </SearchForm>
      </SearchFormWrapper>
      <ContentWrapper>
        {loading && Array.from([1, 2, 3, 4, 5], (el) => <Skeleton key={el} />)}
        {pageItems?.map((repo) => (
          <RepoCard key={repo.id} repoInfo={repo} />
        ))}
        {isResultNotFound && <NoList msg="검색 결과가 없습니다." />}
        <TargetDiv ref={ref} />
      </ContentWrapper>
    </Container>
  )
}

const SearchFormWrapper = styled.div`
  width: 100%;
  padding: 0 18px 18px;
`

const SearchForm = styled.form`
  width: 100%;
  height: 38px;
  border-radius: 5px;
  border: 1.5px solid black;
  display: flex;
  overflow: hidden;
`

const ContentWrapper = styled.div`
  width: 100%;
  height: calc(100% - 130px);
  overflow-y: auto;
  padding: 0 18px 12px;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    height: 30%;
    background-color: #7d6dc1;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: rgba(124, 109, 193, 0.25);
  }
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
  background-color: #f6ebff;
  cursor: pointer;
`

const TargetDiv = styled.div`
  height: 10px;
`

export default Main
