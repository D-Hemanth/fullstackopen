import { useSelector, useDispatch } from 'react-redux'
import { toggleIncreaseVote } from '../reducers/anecdoteReducer'

const Anecdote = ({anecdote, handleVoteIncrease}) => {
  return (
    <li>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleVoteIncrease}>vote</button>
      </div>
    </li>
  )
}

const AnecdoteList = () => {
  // any React component can access the anecdotes stored in the store with the useSelector-hook,the function either searches for or selects data from the react-redux store
  const anecdotes = useSelector(state => state.anecdote)
  // console.log('anecdotes from useSelector', anecdotes)
  // useDispatch-hook provides any React component access to dispatch-function from the useDispatch -hook to send actions to react-redux store
  const dispatch = useDispatch()

  // use the spread syntax to copy the state before mutating it using sort method to sort the anecdote list 
  // by no. of votes in descending order and to avoid sort not a function error
  const anecdotesToSort = [...anecdotes]
  const sortedAnecdotes = anecdotesToSort.sort((a, b) => b.votes - a.votes)
  // console.log('sorted anecdotes: ', sortedAnecdotes)

  return (
    <ul>
      {sortedAnecdotes.map(anecdote =>
        <Anecdote 
          key={anecdote.id}
          anecdote={anecdote}
          handleVoteIncrease={() => dispatch(toggleIncreaseVote(anecdote.id))}
        />
      )}
    </ul>
  )
}

export default AnecdoteList