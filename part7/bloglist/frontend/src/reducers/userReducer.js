import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

// With Redux Toolkit, we can easily create reducer and related action creators using the createSlice function
const userSlice = createSlice({
  // createSlice function's name parameter defines the prefix(user/) which is used in the action's type values along with reducer name(type: user/setUser)
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      // console.log('setUser action payload', action.payload)
      return action.payload
    },
  },
})

// The reducer can be accessed by the userSlice.reducer property, whereas the action creators by the userSlice.actions
export const { setUser } = userSlice.actions

// application checks if user details of a logged-in user can already be found on the local storage. If they can, the details are saved to the state of the application and to blogService
// define an action creator initializeUser which initializes the loggedin user based on the data received from the server
export const initializeUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      await blogService.setToken(user.token)
    }
  }
}

export default userSlice.reducer
