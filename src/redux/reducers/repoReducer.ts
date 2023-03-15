import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import repoAPI from 'api/repo'
import { RepoItemType, RepoResponseType } from '../../model/Repo'

const initialFeedback = {
  type: '',
  msg: ''
}

export interface RepoInitialType {
  data: RepoResponseType | null
  loading: boolean
  error: unknown
  savedRepos: RepoItemType[]
  pageItems: RepoItemType[]
  page: number
  maxPage: number
  feedback: typeof initialFeedback
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
  async (word: string) => {
    const res = await repoAPI.searchReposWith(word)
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

      if (reposFromLocal?.find((el: RepoItemType) => el.id === newRepo.id)) {
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

      const filteredRepos = repoList.filter((repo: RepoItemType) => repo.id !== id)

      localStorage.setItem('repos', JSON.stringify(filteredRepos))

      state.savedRepos = filteredRepos
      state.feedback = {
        type: 'success',
        msg: 'repo를 삭제하였습니다.'
      }
    },
    loadMore: (state, action) => {
      const page = action.payload
      const { data } = current(state)
      const pageItems = data?.items.slice(page * 10, (page + 1) * 10)
      state.page = page
      state.pageItems = pageItems ? [...state.pageItems, ...pageItems] : [...state.pageItems]
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
        state.data = action.payload
        state.page = 0
        state.pageItems = action.payload.items.slice(0, 10)
        state.maxPage = Math.ceil(action.payload.items.length / 10)
      })
      .addCase(fetchRepos.rejected, (state, action) => {
        state.loading = false
        state.pageItems = []
        state.data = null
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
