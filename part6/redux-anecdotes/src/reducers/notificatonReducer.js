import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    displayNotification(state, action) {
      // console.log('displayNotification action payload: ', action.payload)
      return action.payload
    },
  },
})

export const { displayNotification } = notificationSlice.actions

// Add setNotification an asynchronous action creator using redux-thunk to handle notifications
// https://github.com/reduxjs/redux-thunk
export const setNotification = (notification, displayTime) => {
  return async (dispatch) => {
    dispatch(displayNotification(notification))

    // after clicking vote button multiple times in a row, last vote is displayed for five seconds
    // by cancelling the removal of the previous notification(using clearTimeout) when a new notification is displayed
    let previousTimeout = 0
    clearTimeout(previousTimeout)
    setTimeout(() => {
      dispatch(displayNotification(null))
    }, displayTime * 1000)
  }
}

export default notificationSlice.reducer
