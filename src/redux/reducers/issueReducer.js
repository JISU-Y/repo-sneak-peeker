import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit"
import { BASE_URL } from "./repoReducer"

const initialState = {
  repo: null,
  loading: false,
  issues: [],
  pageItems: [],
  page: 1,
  totalPage: 0,
}

const splitIssuesByPage = (items, page, state) => {
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

export const fetchIssues = createAsyncThunk("issueData/fetchIssueData", async (fullName) => {
  const res = await fetch(`${BASE_URL}repos/${fullName}/issues`)
  const data = await res.json()
  const selectedRepo = JSON.parse(localStorage.getItem("selectedRepo"))
  localStorage.setItem("selectedRepo", JSON.stringify({ ...selectedRepo, issues: data }))
  return data
})

export const issueReducer = createSlice({
  name: "issue",
  initialState,
  reducers: {
    selectRepo: (state, action) => {
      const selectedRepoFromLocal = JSON.parse(localStorage.getItem("selectedRepo"))
      const selectedRepo = action.payload
      localStorage.setItem("selectedRepo", JSON.stringify({ ...selectedRepoFromLocal, repo: selectedRepo }))
      state.repo = selectedRepo
    },
    showCurrentRepo: (state) => {
      const selectedRepo = JSON.parse(localStorage.getItem("selectedRepo"))
      if (!selectedRepo?.issues) return
      state.repo = selectedRepo.repo
      state.issues = selectedRepo.issues
      state.totalPage = Math.ceil(selectedRepo.issues.length / 6)
      state.pageItems = splitIssuesByPage(selectedRepo.issues, state.page, state)
    },
    movePage: (state, action) => {
      const page = action.payload
      state.pageItems = splitIssuesByPage(state.issues, page, state)
    },
    cleanupSelectedRepo: (state) => {
      localStorage.removeItem("selectedRepo")
      state.page = 1
      state.totalPage = 0
      state.issues = []
      state.pageItems = []
    },
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
        state.pageItems = splitIssuesByPage(action.payload, state.page, state)
      })
      .addCase(fetchIssues.rejected, (state, action) => {
        state.loading = false
        state.repo = null
        state.issues = []
        state.error = {
          message: action.error.message,
          stack: action.error.stack,
        }
      })
  },
})

export const { selectRepo, showCurrentRepo, movePage, cleanupSelectedRepo } = issueReducer.actions

export default issueReducer.reducer
