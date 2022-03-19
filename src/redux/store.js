import { configureStore } from "@reduxjs/toolkit"
import repoReducer from "./reducers/repoReducer"

export const store = configureStore({
  reducer: {
    repoData: repoReducer,
  },
})
