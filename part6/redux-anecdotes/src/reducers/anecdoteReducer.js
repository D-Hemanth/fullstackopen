import { createSlice } from "@reduxjs/toolkit"

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)
// console.log('initialState', initialState)

// With Redux Toolkit, we can easily create reducer and related action creators using the createSlice function
const anecdoteSlice = createSlice({
  // createSlice function's name parameter defines the prefix(anecdote/) which is used in the action's type values along with reducer name(type: anecdote/createAnecdotes)
  name: 'anecdote',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      const content = action.payload
      state.push({
        content,
        id: getId(),
        votes: 0
      })
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
export const { createAnecdote, toggleIncreaseVote } = anecdoteSlice.actions
export default anecdoteSlice.reducer