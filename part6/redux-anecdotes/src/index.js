import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import store from './utils/store'

// application is now defined as a child of a Provider component provided by the react redux library. 
// The application's store is given to the Provider as its attribute store
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
