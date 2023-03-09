import { configureStore } from '@reduxjs/toolkit'
import issueReducer from './reducers/issueReducer'
import repoReducer from './reducers/repoReducer'

export const store = configureStore({
  reducer: {
    repoData: repoReducer,
    issueData: issueReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
