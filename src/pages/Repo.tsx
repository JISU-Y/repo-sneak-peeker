import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import styled from 'styled-components'
import Header from '../components/Header'
import NoList from '../components/NoList'
import RepoCard from '../components/RepoCard'
import { cleanupFeedback, showSavedRepos } from '../redux/reducers/repoReducer'
import { Container } from '../styles/commonComponent'

const Repo = () => {
  const dispatch = useDispatch()
  const { savedRepos, feedback } = useSelector((state: RootState) => state.repoData)

  useEffect(() => {
    dispatch(showSavedRepos())
  }, [dispatch])

  useEffect(() => {
    dispatch(cleanupFeedback())

    if (feedback.msg) {
      alert(feedback.msg)
    }
  }, [feedback.msg, dispatch])

  return (
    <Container>
      <Header title="레포 보관함" />
      <ContentWrapper>
        {savedRepos ? (
          savedRepos.map((repo) => <RepoCard key={repo.id} repoInfo={repo} useDelete />)
        ) : (
          <NoList msg="저장된 레포가 없습니다." />
        )}
      </ContentWrapper>
    </Container>
  )
}

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 18px 12px;
`

export default Repo
