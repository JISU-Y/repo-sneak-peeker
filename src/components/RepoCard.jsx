import React from "react"
import styled from "styled-components"
import { ContentBox } from "../styles/commonComponent"

const RepoCard = ({ repoName, description, ownerName, useDelete = false }) => {
  const addRepo = () => {
    console.log("add")
  }

  const deleteRepo = () => {
    console.log("delete")
  }

  return (
    <ContentBox>
      <RepoInfoWrapper>
        <RepoName>{repoName ?? "레포 이름"}</RepoName>
        <Description>{description ?? "레포 description"}</Description>
        <Owner>owner : {ownerName ?? "JISU-Y"}</Owner>
      </RepoInfoWrapper>
      <Button onClick={useDelete ? deleteRepo : addRepo}>레포 {useDelete ? "삭제" : "추가"}</Button>
    </ContentBox>
  )
}

const RepoInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;
`

const RepoName = styled.span`
  font-weight: bold;
`

const Description = styled.p``

const Owner = styled.span``

const Button = styled.button`
  font-size: 18px;
  font-weight: bold;
  color: white;
  background-color: pink;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`

export default RepoCard
