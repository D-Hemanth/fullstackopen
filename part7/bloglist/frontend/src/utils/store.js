import { configureStore } from '@reduxjs/toolkit'
import notificatonReducer from '../reducers/notificationReducer'

// create a store using configureStore function of redux-toolkit which enables us to use redux-thunk(i.e return functions from action creators), createSlice func
const store = configureStore({
  reducer: {
    notification: notificatonReducer,
  },
})

console.log('store', store.getState())

export default store
