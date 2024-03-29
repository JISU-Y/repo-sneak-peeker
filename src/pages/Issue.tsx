import React, { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import styled from 'styled-components'
import Header from '../components/Header'
import IssueCard from '../components/IssueCard'
import NoList from '../components/NoList'
import PageNavigation from '../components/PageNavigation'
import Skeleton from '../components/SkeletonIssue'
import { showCurrentRepo } from '../redux/reducers/issueReducer'
import { Container } from '../styles/commonComponent'

const Issue = () => {
  const dispatch = useDispatch()
  const { repo, pageItems, loading } = useSelector((state: RootState) => state.issueData)

  const noItem = useMemo(() => pageItems?.length < 1, [pageItems])

  useEffect(() => {
    dispatch(showCurrentRepo())
  }, [dispatch])

  return (
    <Container>
      <Header title="이슈 리스트" />
      <RepoInfoBox>
        <RepoName>{repo?.name ?? '레포 이름'}</RepoName>
        <Owner>owner : {repo?.owner.login ?? 'JISU-Y'}</Owner>
      </RepoInfoBox>
      <IssueContainer>
        {noItem ? (
          <NoList msg="현재 레포에 등록된 이슈가 없습니다." />
        ) : (
          <>
            <CardWrapper>
              {loading
                ? Array.from([1, 2, 3, 4, 5, 6], (el) => <Skeleton key={el} />)
                : pageItems.map((issue) => (
                    <IssueCard key={issue.id} repoName={repo?.name || ''} issue={issue} />
                  ))}
            </CardWrapper>
            <PageNavigation />
          </>
        )}
      </IssueContainer>
    </Container>
  )
}

const RepoInfoBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px 8px;
`

const RepoName = styled.span`
  font-size: 18px;
  font-weight: bold;
`

const Owner = styled.span``

const IssueContainer = styled.div`
  width: 100%;
  height: calc(100% - 100px);
  overflow-y: auto;
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

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 226px;
  padding: 16px;
  gap: 8px;
`

export default Issue
