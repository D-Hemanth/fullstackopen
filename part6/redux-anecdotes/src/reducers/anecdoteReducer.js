import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

// With Redux Toolkit, we can easily create reducer and related action creators using the createSlice function
const anecdoteSlice = createSlice({
  // createSlice function's name parameter defines the prefix(anecdote/) which is used in the action's type values along with reducer name(type: anecdote/createAnecdotes)
  name: 'anecdote',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      // since backend generates ids for the anecdotes we can directly change the state because of immer without additional formatting
      state.push(action.payload)
    },
    // createSlice function's name parameter defines the prefix(anecdote/) which is used in the action's type values along with reducer name(type: anecdote/toggleIncreaseVote)
    toggleIncreaseVote(state, action) {
      const id = action.payload
      // console.log('actoin payload: ', action.payload)
      const anecdoteToChange = state.find(anecdote => anecdote.id === id)
      // console.log(anecdoteToChange)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

// The reducer can be accessed by the anecdoteSlice.reducer property, whereas the action creators by the anecdoteSlice.actions
export const { createAnecdote, toggleIncreaseVote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

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

export default anecdoteSlice.reducer