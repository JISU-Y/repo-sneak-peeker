import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit"

export const BASE_URL = "https://api.github.com/"

const initialState = {
  data: null,
  loading: false,
  error: null,
  pageItems: [],
  savedRepos: [],
  maxPage: null,
}

export const fetchRepos = createAsyncThunk("repoData/fetchRepoData", async (word) => {
  const res = await fetch(`${BASE_URL}search/repositories?q=${word}`)
  const data = await res.json()
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
    loadMore: (state, action) => {
      // loadMore 하기
      const page = action.payload
      const { data } = current(state)
      state.maxPage = Math.ceil(data?.items.length / 10)
      state.pageItems = [...state.pageItems, ...data?.items.slice((page - 1) * 10, page * 10)]
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

export const { addRepoToStorage, showSavedRepos, deleteRepoFromStorage, loadMore } = repoReducer.actions

export default repoReducer.reducer
