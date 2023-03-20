import { RepoItemType } from 'model/Repo'
import React, { memo } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { fetchIssues, selectRepo } from '../redux/reducers/issueReducer'
import { addRepoToStorage, deleteRepoFromStorage } from '../redux/reducers/repoReducer'
import { ContentBox, Tag } from '../styles/commonComponent'

interface RepoCardProps {
  repoInfo: RepoItemType
  useDelete?: boolean
}

function RepoCard({ repoInfo, useDelete = false }: RepoCardProps) {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const addRepo = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()

    dispatch(addRepoToStorage(repoInfo))
  }

  const deleteRepo = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()

    dispatch(deleteRepoFromStorage({ id: repoInfo.id }))
  }

  const gotoIssues = () => {
    if (location.pathname === '/') {
      return
    }

    dispatch(selectRepo(repoInfo))
    dispatch(fetchIssues(repoInfo.full_name))

    navigate('/issue')
  }

  return (
    <ContentBox onClick={gotoIssues}>
      <RepoInfoWrapper>
        <TitleAndLang>
          <RepoName>{repoInfo.name ?? 'unknown'}</RepoName>
          {repoInfo?.language && <LanguageTag>{repoInfo?.language}</LanguageTag>}
        </TitleAndLang>
        <Description lineHiding={2}>{repoInfo.description ?? 'unknown'}</Description>
        <Owner>owner: {repoInfo.owner.login ?? 'unknown'}</Owner>
      </RepoInfoWrapper>
      <Button onClick={useDelete ? deleteRepo : addRepo}>레포 {useDelete ? '삭제' : '추가'}</Button>
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

const TitleAndLang = styled.div`
  display: flex;
  align-items: center;
`

const RepoName = styled.span`
  font-weight: bold;
  max-width: 210px;
  height: 20px;
  margin-right: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const LanguageTag = styled(Tag)`
  font-size: 12px;
`

const Description = styled.p<{ lineHiding?: number }>`
  min-height: 32px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: ${({ lineHiding }) => (lineHiding ? lineHiding : 2)};
  -webkit-box-orient: vertical;
`

const Owner = styled.span`
  font-size: 14px;
`

const Button = styled.button`
  font-size: 18px;
  font-weight: bold;
  color: white;
  background-color: #7d6dc1;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`

export default memo(RepoCard)
