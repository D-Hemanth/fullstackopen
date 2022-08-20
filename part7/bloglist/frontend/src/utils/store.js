import { configureStore } from '@reduxjs/toolkit'
import blogReducer from '../reducers/blogReducer'
import notificatonReducer from '../reducers/notificationReducer'
import userReducer from '../reducers/userReducer'

// create a store using configureStore function of redux-toolkit which enables us to use redux-thunk(i.e return functions from action creators), createSlice func
const store = configureStore({
  reducer: {
    blogs: blogReducer,
    user: userReducer,
    notification: notificatonReducer,
  },
})

console.log('store', store.getState())

export default store
