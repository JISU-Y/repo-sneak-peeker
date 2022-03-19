import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const BASE_URL = "https://api.github.com/"

const initialState = {
  data: null,
  loading: false,
  error: null,
  savedRepos: [],
}

export const fetchRepos = createAsyncThunk("repoData/fetchRepoData", async (word) => {
  const res = await fetch(`${BASE_URL}search/repositories?q=${word}`)
  const data = await res.json()
  console.log(data)
  return data
})

export const repoReducer = createSlice({
  name: "repo",
  initialState,
  reducers: {
    showSavedRepos: (state) => {
      const data = JSON.parse(localStorage.getItem("repos"))
      state.savedRepos = data
    },
    addRepoToStorage: (state, action) => {
      const repo = action.payload

      localStorage.setItem("repos", JSON.stringify([...state.savedRepos, repo]))
      state.savedRepos = [...state.savedRepos, repo]
    },
    deleteRepoFromStorage: (state, action) => {
      const { id } = action.payload
      const filteredRepos = JSON.parse(localStorage.getItem("repos")).filter((repo) => repo.id !== id)

      localStorage.setItem("repos", JSON.stringify(filteredRepos))
      state.savedRepos = filteredRepos
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepos.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchRepos.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchRepos.rejected, (state, action) => {
        state.loading = false
        state.error = {
          message: action.error.message,
          stack: action.error.stack,
        }
      })
  },
})

export const { addRepoToStorage, showSavedRepos, deleteRepoFromStorage } = repoReducer.actions

export default repoReducer.reducer
