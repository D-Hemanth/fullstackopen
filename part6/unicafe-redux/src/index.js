import React from 'react';
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import reducer from './reducers/counterReducer'

// whole state of the application is stored into one JavaScript-object in the store & it is created using createStore
const store = createStore(reducer)

const App = () => {
  // actions dispatched/sent to store using dispatch method
  const good = () => {
    store.dispatch({ type: 'GOOD' })
  }

  const ok = () => {
    store.dispatch({ type: 'OK' })
  }

  const bad = () => {
    store.dispatch({ type: 'BAD' })
  }

  const resetStats = () => {
    store.dispatch({ type: 'ZERO' })
  }

  return (
    <div>
      <button onClick={good}>good</button>
      <button onClick={ok}>ok</button>
      <button onClick={bad}>bad</button>
      <button onClick={resetStats}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => {
  root.render(<App />)
}

// function renderApp listens for changes in the store with the store.subscribe method which then renders the whole app
renderApp()
store.subscribe(renderApp)
