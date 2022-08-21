import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'

// With Redux Toolkit, we can easily create reducer and related action creators using the createSlice function
const usersSlice = createSlice({
  // createSlice function's name parameter defines the prefix(users/) which is used in the action's type values along with reducer name(type: users/setUsers)
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
  },
})

// The reducer can be accessed by the usersSlice.reducer property, whereas the action creators by the usersSlice.actions
export const { setUsers } = usersSlice.actions

// With Redux Thunk it is possible to implement action creators which return a function instead of an object/action
// define an action creator initializeUsers which initializes the users based on the data received from the server
export const initializeAllUsers = () => {
  return async (dispatch) => {
    // dispatch action to backend with usersService to get all the users from the backend
    const allBlogsUsers = await usersService.getAll()
    dispatch(setUsers(allBlogsUsers))
  }
}

export default usersSlice.reducer
