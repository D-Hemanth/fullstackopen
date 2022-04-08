import { useState } from 'react'

// button component defined outside the App component
const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}

// Refratored each line in statistics into a new react component StatisticLine outside the main App component
const StatisticLine = ({ text, value }) => { 
  return (
          // to not get warning like <tr> cannot appear as a child of <div> we separate the table,tbody tags from the tr,td tags in another components
          <tr>
            <td>{text}</td>
            <td>{value}</td>
          </tr> 
  )
}

// Refratored the statistics into a new react component outside the main App component
const Statistics = ({ good, neutral, bad }) => {
  if ((good | neutral | bad) > 0) {
    return (
      // put all elements inside react fragments <>, </> so that JSX has link to atleast one parent element
      // to not get warning like <tr> cannot appear as a child of <div> we separate the table,tbody tags from the tr,td tags in another components
      <>
        <table>
          <tbody>
            <StatisticLine text='good' value={good} />
            <StatisticLine text='neutral' value={neutral} />
            <StatisticLine text='bad' value={bad} />
            <StatisticLine text='all' value={good + neutral + bad} />
            <StatisticLine text='average' value={(good - bad) / (good + neutral + bad)} />
            <StatisticLine text='positive ' value={`${(good / (good + neutral + bad)) * 100} %`} />
          </tbody>
        </table>
      </>
    )
  }
  return (
    <h3>No feedback given</h3> 
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
    <>
      <h1>give feedback</h1>
      <Button onClick={upGoodByOne} text='good' />
      <Button onClick={upNeutralByOne} text='neutral' />
      <Button onClick={upBadByOne} text='bad' />
      <h1>statistics</h1>
      <>{Statistics({ good, neutral, bad })}</>
    </>
  )
}

export default App