import { createSlice } from "@reduxjs/toolkit";

// With Redux Toolkit, we can easily create reducer and related action creators using the createSlice function
const filterSlice = createSlice({
  // createSlice function's name parameter defines the prefix(filter/) which is used in the action's type values along with reducer name(type: filter/filterAnecdote)
  name: 'filter',
  initialState: null,
  reducers: {
    filterAnecdote(state, action) {
      // console.log('filter state:', state)
      return action.payload
    }
  }
})

// The reducer can be accessed by the anecdoteSlice.reducer property, whereas the action creators by the anecdoteSlice.actions
export const { filterAnecdote } = filterSlice.actions
export default filterSlice.reducer