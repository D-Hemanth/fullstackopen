import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

// With Redux Toolkit, we can easily create reducer and related action creators using the createSlice function
const blogSlice = createSlice({
  // createSlice function's name parameter defines the prefix(blog/) which is used in the action's type values along with reducer name(type: blog/appendBlogs)
  name: 'blog',
  initialState: [],
  reducers: {
    appendBlogs(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      // console.log('setblogs state', state)
      // console.log('setBlogs action payload: ', action.payload)
      return action.payload
    },
  },
})

// The reducer can be accessed by the blogSlice.reducer property, whereas the action creators by the blogSlice.actions
export const { appendBlogs, setBlogs } = blogSlice.actions

// With Redux Thunk it is possible to implement action creators which return a function instead of an object/action
// define an action creator initializeBlogs which initializes the blogs based on the data received from the server
export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    // console.log('initialize Blogs response', blogs)
    dispatch(setBlogs(blogs))
  }
}
