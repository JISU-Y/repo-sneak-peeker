import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'

export const BASE_URL = 'https://api.github.com/'

const initialFeedback = {
  type: '',
  msg: ''
}

const initialState = {
  data: null,
  loading: false,
  error: null,
  savedRepos: [],
  pageItems: [],
  page: 0,
  maxPage: null,
  feedback: initialFeedback
}

export const fetchRepos = createAsyncThunk('repoData/fetchRepoData', async (word) => {
  const res = await fetch(`${BASE_URL}search/repositories?q=${word}`)
  const data = await res.json()
  return data
})

export const repoReducer = createSlice({
  name: 'repo',
  initialState,
  reducers: {
    showSavedRepos: (state) => {
      const data = JSON.parse(localStorage.getItem('repos'))
      state.savedRepos = data
    },
    addRepoToStorage: (state, action) => {
      const repo = action.payload
      const reposFromLocal = JSON.parse(localStorage.getItem('repos'))
      const { savedRepos } = current(state)

      if (reposFromLocal?.find((el) => el.id === repo.id)) {
        state.feedback = {
          type: 'failure',
          msg: '이미 추가하신 repo입니다.'
        }
        return
      } else if (reposFromLocal?.length >= 4) {
        state.feedback = {
          type: 'failure',
          msg: '최대 저장 repo를 초과하였습니다. (최대 4개)'
        }
        return
      }

      localStorage.setItem('repos', JSON.stringify([...savedRepos, repo]))
      state.savedRepos = [...savedRepos, repo]
      state.feedback = {
        type: 'success',
        msg: 'repo를 추가하였습니다.'
      }
    },
    deleteRepoFromStorage: (state, action) => {
      const { id } = action.payload
      const filteredRepos = JSON.parse(localStorage.getItem('repos')).filter(
        (repo) => repo.id !== id
      )

      localStorage.setItem('repos', JSON.stringify(filteredRepos))
      state.savedRepos = filteredRepos
      state.feedback = {
        type: 'success',
        msg: 'repo를 삭제하였습니다.'
      }
    },
    loadMore: (state, action) => {
      // loadMore 하기
      const page = action.payload
      const { data } = current(state)
      const pageItems = data?.items.slice((page - 1) * 10, page * 10)
      state.page = page
      state.maxPage = Math.ceil(data?.items.length / 10)
      state.pageItems = [...state.pageItems, ...pageItems]
    },
    cleanupFeedback: (state) => {
      state.feedback = initialFeedback
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepos.pending, (state) => {
        state.loading = true
        state.page = 0
        state.pageItems = []
      })
      .addCase(fetchRepos.fulfilled, (state, action) => {
        state.loading = false
        state.page = 0
        state.pageItems = []
        state.data = []
        state.data = action.payload
      })
      .addCase(fetchRepos.rejected, (state, action) => {
        state.loading = false
        state.pageItems = []
        state.data = []
        state.page = 0
        state.error = {
          message: action.error.message,
          stack: action.error.stack
        }
      })
  }
})

export const {
  addRepoToStorage,
  showSavedRepos,
  deleteRepoFromStorage,
  loadMore,
  cleanupFeedback
} = repoReducer.actions

export default repoReducer.reducer
