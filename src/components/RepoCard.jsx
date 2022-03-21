import React from "react"
import { useDispatch } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { fetchIssues, selectRepo } from "../redux/reducers/issueReducer"
import { addRepoToStorage, deleteRepoFromStorage } from "../redux/reducers/repoReducer"
import { ContentBox } from "../styles/commonComponent"

const RepoCard = ({ repoInfo, useDelete = false }) => {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const addRepo = (e) => {
    e.stopPropagation()
    dispatch(addRepoToStorage(repoInfo))
  }

  const deleteRepo = (e) => {
    e.stopPropagation()
    const id = repoInfo.id
    dispatch(deleteRepoFromStorage({ id }))
  }

  const gotoIssues = () => {
    if (location.pathname === "/") return
    dispatch(selectRepo(repoInfo))
    dispatch(fetchIssues(repoInfo.full_name))
    navigate("/issue")
  }

  return (
    <ContentBox onClick={gotoIssues}>
      <RepoInfoWrapper>
        <RepoName>{repoInfo.name ?? "레포 이름"}</RepoName>
        <Description>{repoInfo.description ?? "레포 description"}</Description>
        <Owner>owner : {repoInfo.owner.login ?? "JISU-Y"}</Owner>
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
  flex: 1;
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
