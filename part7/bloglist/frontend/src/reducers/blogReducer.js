import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

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

// replace the createAnecdote action creator created by the createSlice function with an asynchronous action creator using redux-thunk
// https://github.com/reduxjs/redux-thunk
export const createBlog = (newBlogObject) => {
  return async (dispatch) => {
    // make a request to backend with blogService to post/add the new blogs to backend & then add dispatch appendBlogs action to update the state
    const newBlog = await blogService.create(newBlogObject)
    dispatch(appendBlogs(newBlog))
  }
}

export const increaseLikes = (increaseLikesObject) => {
  return async (dispatch) => {
    // Using the spread operator to update blog object's likes value by 1
    const likesIncreaseBlog = {
      ...increaseLikesObject,
      likes: increaseLikesObject.likes + 1,
    }
    // console.log(likesIncreaseBlog)
    // make a request to backend with blogService to put/update the likes in backend & then dispatch initializeBlogs action to display the updated state
    await blogService.update(likesIncreaseBlog)
    dispatch(initializeBlogs())
    // set message color to green & Add a improved notification message when you update likes of a blog
    const notificationMessage = `You've liked the blog "${likesIncreaseBlog.title}" by ${likesIncreaseBlog.author}`
    const messageColor = 'green'
    dispatch(setNotification({ messageColor, notificationMessage }, 5))
  }
}

export const deleteBlog = (blogToDelete) => {
  return async (dispatch) => {
    if (
      window.confirm(
        `Remove blog ${blogToDelete.title} by ${blogToDelete.author}`,
      )
    ) {
      // make a request to backend with blogService to delete a blog in backend & then dispatch initializeBlogs action to display the updated state
      await blogService.remove(blogToDelete)
      dispatch(initializeBlogs())
      // set message color to green & Add a improved notification message when you delete a blog
      const notificationMessage = `You've deleted the blog "${blogToDelete.title}" by ${blogToDelete.author}`
      const messageColor = 'green'
      dispatch(setNotification({ messageColor, notificationMessage }, 5))
    }
  }
}

export default blogSlice.reducer
