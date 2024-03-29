import React from 'react'
import styled from 'styled-components'
import { ContentBox, GrayBox } from '../styles/commonComponent'

const SkeletonRepo = () => {
  return (
    <ContentContainer>
      <RepoInfoWrapper>
        <GrayBox />
        <Description />
        <Owner />
      </RepoInfoWrapper>
      <Button />
    </ContentContainer>
  )
}

const ContentContainer = styled(ContentBox)`
  height: 100px;
  &:hover {
    transform: none;
  }
`

const RepoInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;
  flex: 1;
`

const Description = styled(GrayBox)`
  width: 300px;
`

const Owner = styled(GrayBox)`
  width: 100px;
`

const Button = styled.button`
  width: 90px;
  height: 27px;
  font-size: 18px;
  font-weight: bold;
  color: white;
  background-color: #f6ebff;
  border: none;
  border-radius: 4px;
`

export default SkeletonRepo
