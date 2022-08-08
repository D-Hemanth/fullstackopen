import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from '../reducers/anecdoteReducer'
import notificatonReducer from '../reducers/notificatonReducer'
import filterReducer from '../reducers/filterReducer'

// create a store using configureStore function of redux-toolkit
const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    notification: notificatonReducer,
    filter: filterReducer
  }
})

console.log(store.getState())

export default store