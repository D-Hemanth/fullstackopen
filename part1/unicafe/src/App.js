import { useState } from 'react'

// button component defined outside the App component
const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}

// Refratored the statistics into a new react component outside the main App component
const Statistics = ({ good, neutral, bad }) => {
  return (
    // put all elements inside react fragments <>, </> so that JSX has link to atleast one parent element
    <>
      <h1>statistics</h1>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
      <div>all {good + neutral + bad}</div>
      <div>average {(good - bad) / (good + neutral + bad)}</div>
      <div>positive {(good / (good + neutral + bad)) * 100} %</div>
    </>
  )
}

// const setValue  
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  // function call to change the state values of good, neutral, bad clicks
  const upGoodByOne = () => setGood(good + 1)
  const upNeutralByOne = () => setNeutral(neutral + 1)
  const upBadByOne = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={upGoodByOne} text='good' />
      <Button onClick={upNeutralByOne} text='neutral' />
      <Button onClick={upBadByOne} text='bad' />
      <>{Statistics({ good, neutral, bad })}</>
    </div>
  )
}

export default App