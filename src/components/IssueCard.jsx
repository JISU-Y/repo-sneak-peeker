import React from "react"
import styled from "styled-components"
import { ContentBox } from "../styles/commonComponent"

const IssueCard = ({ repoName, issue }) => {
  return (
    <ContentBox>
      <IssueInfoWrapper href={issue.html_url} target="_blank" rel="noopener noreferrer">
        <span>{repoName ?? "repo title"}</span>
        <Title>{issue.title ?? "이슈 title"}</Title>
        <span>state: {issue.state}</span>
        <span>writer: {issue.user.login}</span>
        <span>{issue.created_at}</span>
      </IssueInfoWrapper>
    </ContentBox>
  )
}

const IssueInfoWrapper = styled.a`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-decoration: none;
  color: black;
  height: 200px;
`

const Title = styled.span`
  font-size: 20px;
  font-weight: bold;
`

export default IssueCard
