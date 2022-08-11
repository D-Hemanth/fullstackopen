import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'

// It is not possible to use the useMatch hook inside Router component which defines the routed part of the application, so move Router here from App
ReactDOM.createRoot(document.getElementById('root')).render(
  // BrowserRouter(used as Router) is a Router that uses the HTML5 history API (pushState, replaceState and the popState event) to keep your UI in sync with the URL
  <Router>
    <App />
  </Router>
)
