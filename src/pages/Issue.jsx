import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import Header from "../components/Header"
import IssueCard from "../components/IssueCard"
import { showCurrentRepo } from "../redux/reducers/issueReducer"
import { Container } from "../styles/commonComponent"

const Issue = () => {
  const dispatch = useDispatch()
  const { repo, issues } = useSelector((state) => state.issueData)

  useEffect(() => {
    dispatch(showCurrentRepo())
  }, [dispatch])

  return (
    <Container>
      <Header title="이슈 리스트" />
      <RepoInfoBox>
        <RepoName>{repo.name ?? "레포 이름"}</RepoName>
        <Owner>owner : {repo.owner.login ?? "JISU-Y"}</Owner>
      </RepoInfoBox>
      <IssueContainer>
        {issues?.map((issue) => (
          <IssueCard key={issue.id} repoName={repo.name} issue={issue} />
        ))}
      </IssueContainer>
    </Container>
  )
}

const RepoInfoBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  padding-top: 0;
`

const RepoName = styled.span`
  font-size: 18px;
  font-weight: bold;
`

const Owner = styled.span``

const IssueContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 16px;
  gap: 8px;
`

export default Issue
