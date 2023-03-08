import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import { RepoItemType, RepoResponseType } from '../../model/Repo'

export const BASE_URL = 'https://api.github.com/'

const initialFeedback = {
  type: '',
  msg: ''
}

export interface RepoInitialType {
  data: RepoResponseType | null
  loading: boolean
  error: unknown
  savedRepos: RepoItemType[]
  pageItems: any[]
  page: number
  maxPage: number
  feedback: typeof initialFeedback
}

interface ReducerType {
  showSavedRepos: (state: RepoInitialType) => void
  addRepoToStorage: (state: RepoInitialType, action: any) => void
  deleteRepoFromStorage: (state: RepoInitialType, action: any) => void
  loadMore: (state: RepoInitialType, action: any) => void
  cleanupFeedback: (state: RepoInitialType) => void
}

const initialState: RepoInitialType = {
  data: null,
  loading: false,
  error: null,
  savedRepos: [],
  pageItems: [],
  page: 0,
  maxPage: 0,
  feedback: initialFeedback
}

export const fetchRepos = createAsyncThunk<RepoResponseType, string>(
  'repoData/fetchRepoData',
  async (word) => {
    const res = await fetch(`${BASE_URL}search/repositories?q=${word}`)
    const data = await res.json()

    return data
  }
)

export const repoReducer = createSlice({
  name: 'repo',
  initialState,
  reducers: {
    showSavedRepos: (state) => {
      const repos = localStorage.getItem('repos')
      const savedRepos: RepoItemType[] = repos ? JSON.parse(repos) : null

      state.savedRepos = savedRepos
    },
    addRepoToStorage: (state, action) => {
      const repos = localStorage.getItem('repos')
      const newRepo = action.payload as RepoItemType
      const reposFromLocal = repos ? JSON.parse(repos) : null

      const { savedRepos } = current(state)

      if (reposFromLocal?.find((el) => el.id === newRepo.id)) {
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

      localStorage.setItem('repos', JSON.stringify([...savedRepos, newRepo]))
      state.savedRepos = [...savedRepos, newRepo]
      state.feedback = {
        type: 'success',
        msg: 'repo를 추가하였습니다.'
      }
    },
    deleteRepoFromStorage: (state, action) => {
      const { id } = action.payload
      const repos = localStorage.getItem('repos')
      const repoList = repos ? JSON.parse(repos) : null

      const filteredRepos = repoList.filter((repo) => repo.id !== id)

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
      state.maxPage = Math.ceil(data?.items.length || 10 / 10) // TODO: data?.items possibly undefined 수정 필요
      state.pageItems = pageItems ? [...state.pageItems, ...pageItems] : [...state.pageItems] // 수정
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
        state.pageItems = action.payload.items // TODO: items가 아닌 처음 10개만
        // state.data = []
        state.data = action.payload
      })
      .addCase(fetchRepos.rejected, (state, action) => {
        state.loading = false
        state.pageItems = []
        // state.data = []
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
