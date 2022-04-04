import { useState } from 'react'

// button component defined outside the App component
const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}

// const setValue  
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  // function call to change the state values of good, neutral, bad clicksupGoodByOne = () => setGood(good + 1) 
  const upGoodByOne = () => setGood(good + 1)
  const upNeutralByOne = () => setNeutral(neutral + 1)
  const upBadByOne = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      {/* <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button> */}
      <Button onClick={upGoodByOne} text='good' />
      <Button onClick={upNeutralByOne} text='neutral' />
      <Button onClick={upBadByOne} text='bad' />
      <h1>statistics</h1>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
    </div>
  )
}

export default App