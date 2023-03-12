import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import { IssueType } from 'model/Issue'
import { RepoItemType } from 'model/Repo'
import { BASE_URL } from './repoReducer'

export interface IssueInitialType {
  repo: RepoItemType | null
  loading: boolean
  error: unknown
  issues: IssueType[]
  pageItems: IssueType[]
  page: number
  totalPage: number
}

const initialState: IssueInitialType = {
  repo: null,
  loading: false,
  issues: [],
  pageItems: [],
  error: null,
  page: 1,
  totalPage: 0
}

const splitIssuesByPage = ({
  items,
  page,
  state
}: {
  items: IssueType[]
  page: number
  state: IssueInitialType
}) => {
  const pageItems = items.slice((page - 1) * 6, page * 6)
  const { totalPage } = current(state)
  if (page >= state.totalPage) {
    state.page = state.totalPage
    return items.slice((totalPage - 1) * 6, totalPage * 6)
  } else if (page <= 1) {
    state.page = 1
    return items.slice(0, 6)
  } else {
    state.page = page
    return pageItems
  }
}

export const fetchIssues = createAsyncThunk(
  'issueData/fetchIssueData',
  async (fullName: string) => {
    const res = await fetch(`${BASE_URL}repos/${fullName}/issues`) // MEMO: fullname -> owner/reponame
    const issuesData = await res.json()
    const selectedRepo = localStorage.getItem('selectedRepo') ?? ''
    const parsedSelectedRepo = JSON.parse(selectedRepo)

    localStorage.setItem(
      'selectedRepo',
      JSON.stringify({ ...parsedSelectedRepo, issues: issuesData })
    )
    return issuesData
  }
)

export const issueReducer = createSlice({
  name: 'issue',
  initialState,
  reducers: {
    selectRepo: (state, action) => {
      const selectedRepoFromLocal = localStorage.getItem('selectedRepo') ?? ''
      const parsedselectedRepoFromLocal = JSON.parse(selectedRepoFromLocal)
      const selectedRepo = action.payload

      state.page = 1
      localStorage.setItem(
        'selectedRepo',
        JSON.stringify({ ...parsedselectedRepoFromLocal, repo: selectedRepo })
      )
      state.repo = selectedRepo
    },
    showCurrentRepo: (state) => {
      const selectedRepoFromLocal = localStorage.getItem('selectedRepo') ?? ''
      const selectedRepo = JSON.parse(selectedRepoFromLocal)

      if (!selectedRepo?.issues) return
      state.repo = selectedRepo.repo
      state.issues = selectedRepo.issues
      state.totalPage = Math.ceil(selectedRepo.issues.length / 6)
      state.pageItems = splitIssuesByPage({
        items: selectedRepo.issues,
        page: state.page,
        state: state
      })
    },
    movePage: (state, action) => {
      const page = action.payload
      state.pageItems = splitIssuesByPage({
        items: state.issues,
        page: page,
        state: state
      })
    },
    cleanupSelectedRepo: (state) => {
      localStorage.removeItem('selectedRepo')
      state.page = 1
      state.totalPage = 0
      state.issues = []
      state.pageItems = []
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIssues.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchIssues.fulfilled, (state, action) => {
        state.loading = false
        state.totalPage = Math.ceil(action.payload.length / 6)
        state.issues = action.payload
        state.pageItems = splitIssuesByPage({
          items: action.payload,
          page: state.page,
          state: state
        })
      })
      .addCase(fetchIssues.rejected, (state, action) => {
        state.loading = false
        state.repo = null
        state.issues = []
        state.error = {
          message: action.error.message,
          stack: action.error.stack
        }
      })
  }
})

export const { selectRepo, showCurrentRepo, movePage, cleanupSelectedRepo } = issueReducer.actions

export default issueReducer.reducer
