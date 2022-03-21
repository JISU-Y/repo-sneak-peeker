import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { BASE_URL } from "./repoReducer"

const initialState = {
  repo: null,
  loading: false,
  issues: [],
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
      // 새로고침하면 issue 페이지에서 에러나니까 local에 저장
      localStorage.setItem("selectedRepo", JSON.stringify({ ...selectedRepoFromLocal, repo: selectedRepo }))
      state.repo = selectedRepo
    },
    showCurrentRepo: (state) => {
      const selectedRepo = JSON.parse(localStorage.getItem("selectedRepo"))
      state.repo = selectedRepo.repo
      state.issues = selectedRepo.issues
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIssues.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchIssues.fulfilled, (state, action) => {
        state.loading = false
        state.issues = action.payload
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

export const { selectRepo, showCurrentRepo } = issueReducer.actions

export default issueReducer.reducer
