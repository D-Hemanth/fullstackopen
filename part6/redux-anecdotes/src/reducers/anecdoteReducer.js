import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

// With Redux Toolkit, we can easily create reducer and related action creators using the createSlice function
const anecdoteSlice = createSlice({
  // createSlice function's name parameter defines the prefix(anecdote/) which is used in the action's type values along with reducer name(type: anecdote/createAnecdotes)
  name: 'anecdote',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

// The reducer can be accessed by the anecdoteSlice.reducer property, whereas the action creators by the anecdoteSlice.actions
export const { toggleIncreaseVote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

// With Redux Thunk it is possible to implement action creators which return a function instead of an object/action
// define an action creator initializeAnecdotes which initializes the anecdotes based on the data received from the server
export const initializeAnecdotes = () => {
  return async dispatch => {
    // initialize the notes state based on the data received from the server fetch request & 
    // to dispatch an action using the setAnecdotes action creator for getting the anecdotes object array
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

// replace the createAnecdote action creator created by the createSlice function with an asynchronous action creator using redux-thunk
// https://github.com/reduxjs/redux-thunk
export const createAnecdote = content => {
  return async dispatch => {
    // make a request to backend with anecdoteService to post/add the new anecdote to backend & then add dispatch appendAnecdote action to update the state
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

// replace the toggleIncreseVotes action creator created by the createSlice function with an asynchronous action creator using redux-thunk
export const increaseAnecdoteVotes = anecdote => {
  return async dispatch => {
    const changedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    // make a request to backend with anecdoteService to put/update the votes in backend & then dispatch initializeAnecdotes action to display the updated state
    await anecdoteService.updateLikes(changedAnecdote) 
    dispatch(initializeAnecdotes())
  }
}

export default anecdoteSlice.reducer