import { useState } from 'react'

const Header = () => <h1>Anecdote of the day</h1>

const Anecdote = ({ text, votesCount}) =>{
  return (
    <>
      <div>{text}</div>
      <div>has {votesCount} votes</div>
    </>
  )
}

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const MostVotes = ({ mostVotes, anecdotes }) => {
  // Find the max no. of votes in the array mostVotes
  const maxVotes = Math.max(...mostVotes)
  // Find the index of the maxVotes of  maxVotes so that we can use it to display the anecdote
  const maxVoteIndex = mostVotes.indexOf(maxVotes)
  // console.log(mostVotes)
  // console.log(maxVotes)
  // console.log(maxVoteIndex)
  // console.log(anecdotes[maxVoteIndex])

  if (maxVotes === 0) {
    return (
      <>
        <h1>Anecdote with most votes</h1>
        <div>No votes yet</div>
      </>
    )
  }
  
  return (
    <>
      <h1>Anecdote with most votes</h1>
      <div>{anecdotes[maxVoteIndex]}</div>
      <div>has {maxVotes} votes</div>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  //  create a zero-filled array of a desired length and make it using usestate so that it is not local soped within the handleVoteClicks function
  const [allVotes, setAllVotes] = useState(Array(7).fill(0))
  // console.log(allVotes)

  const handleAnecdoteClick = () => {
    const randomarrayindex = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomarrayindex)
  }

  const handleVoteClick = () => {
    //  correct way of updating state stored in complex data structures like objects and arrays is to make a copy of the state
    const newAllVotes = [...allVotes]
    newAllVotes[selected] += 1
    setAllVotes(newAllVotes)
  }

  return (
    <div>
      <Header />
      <Anecdote text={anecdotes[selected]} votesCount={allVotes[selected]} />
      <Button onClick={handleVoteClick} text='vote' />
      <Button onClick={handleAnecdoteClick} text='next anecdote' />
      <MostVotes mostVotes={allVotes} anecdotes={anecdotes} />
    </div>
  )
}

export default App
