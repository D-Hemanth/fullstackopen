import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from '../reducers/anecdoteReducer'
import notificatonReducer from '../reducers/notificatonReducer'

// create a store using configureStore function of redux-toolkit
const store = configureStore({
  reducer: {
    anecdote: anecdoteReducer,
    notification: notificatonReducer
  }
})

console.log(store.getState())

export default store