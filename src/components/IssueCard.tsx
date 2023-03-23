import React from 'react'
import { IssueType } from 'model/Issue'
import styled, { css } from 'styled-components'
import { multiLineEllipsis } from 'styles/mixins'
import { ContentBox, Tag } from '../styles/commonComponent'

interface IssueCardProps {
  repoName: string
  issue: IssueType
}

const IssueCard = ({ repoName, issue }: IssueCardProps) => {
  return (
    <ContentContainer isOpen={issue.state === 'open'}>
      <IssueInfoWrapper href={issue.html_url} target="_blank" rel="noopener noreferrer">
        <RepoTitle>{repoName ?? 'repo title'}</RepoTitle>
        <IssueTitle>{issue.title}</IssueTitle>
        <StateTag>{issue.state}</StateTag>
        <IssueBody lineClamp={3}>{issue?.body}</IssueBody>
        <BottomInfo>
          <Writer>{issue.user.login}</Writer>
          <Time>{issue.created_at.split('T')[0]}</Time>
        </BottomInfo>
      </IssueInfoWrapper>
    </ContentContainer>
  )
}

const ContentContainer = styled(ContentBox)<{ isOpen: boolean }>`
  margin: 0;
  background-color: ${({ isOpen }) => (isOpen ? '#483d8b' : '#483d8b54')};
`

const IssueInfoWrapper = styled.a`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-decoration: none;
  color: white;
  width: 100%;
  height: 200px;
`

const RepoTitle = styled.span`
  font-weight: bold;
`

const IssueTitle = styled.span`
  font-size: 20px;
  font-weight: bold;
  word-break: keep-all;
  ${multiLineEllipsis}
`

const StateTag = styled(Tag)`
  position: absolute;
  top: -2px;
  right: -2px;
`

const IssueBody = styled.p`
  word-break: break-all;
  ${multiLineEllipsis}
`

const BottomInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
`

const Writer = styled.span``

const Time = styled.span``

export default IssueCard
