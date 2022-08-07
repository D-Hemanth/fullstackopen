import { createSlice } from "@reduxjs/toolkit";

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      // console.log('setNotification action payload: ', action.payload)
      return state = action.payload
    },
    removeNotification(state, action) {
      // console.log('removeNotification action payload: ', action.payload)
      return action.payload
    }
  }
})

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer