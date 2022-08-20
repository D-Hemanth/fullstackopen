import { createSlice } from '@reduxjs/toolkit'

// With Redux Toolkit, we can easily create reducer and related action creators using the createSlice function
const notificationSlice = createSlice({
  // createSlice function's name parameter defines the prefix(notification/) which is used in the action's type values along with reducer name(type: notification/displayNotification)
  name: 'notification',
  initialState: null,
  reducers: {
    displayNotification(state, action) {
      // console.log('displayNotification action payload: ', action.payload)
      return action.payload
    },
  },
})

// The reducer can be accessed by the notificationSlice.reducer property, whereas the action creators by the notificationSlice.actions
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
