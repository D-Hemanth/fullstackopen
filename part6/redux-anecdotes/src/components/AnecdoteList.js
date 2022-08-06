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
  const anecdotes = useSelector(state => state)
  // useDispatch-hook provides any React component access to dispatch-function from the useDispatch -hook to send actions to react-redux store
  const dispatch = useDispatch()

  return (
    // use sort method to sort the anecdote list by no. of votes in descending order
    <ul>
      {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
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