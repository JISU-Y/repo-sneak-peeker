import React from 'react'
import styled from 'styled-components'
import { ContentBox, GrayBox } from '../styles/commonComponent'

const SkeletonIssue = () => {
  return (
    <ContentContainer>
      <RepoTitle></RepoTitle>
      <IssueTitle></IssueTitle>
      <IssueBody></IssueBody>
      <BottomInfo>
        <BottomInfoEl></BottomInfoEl>
        <BottomInfoEl></BottomInfoEl>
      </BottomInfo>
    </ContentContainer>
  )
}

const ContentContainer = styled(ContentBox)`
  margin: 0;
  background-color: #483d8b;
  width: 220px;
  height: 226px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`

const RepoTitle = styled(GrayBox)`
  width: 100px;
`

const IssueTitle = styled(GrayBox)`
  width: 200px;
  height: 40px;
`

const IssueBody = styled(GrayBox)`
  width: 200px;
  height: 30px;
`

const BottomInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const BottomInfoEl = styled(GrayBox)`
  width: 75px;
  height: 15px;
`

export default SkeletonIssue
