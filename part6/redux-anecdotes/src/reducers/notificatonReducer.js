import { createSlice } from "@reduxjs/toolkit";

const initialState = ['Initial state has 6 anecdotes']

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {

    },
    removeNotification(state, action) {

    }
  }
})

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer