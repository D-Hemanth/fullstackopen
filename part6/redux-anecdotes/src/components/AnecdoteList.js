import { useSelector, useDispatch } from 'react-redux'
import { toggleIncreaseVote } from '../reducers/anecdoteReducer'
import { removeNotification, setNotification } from '../reducers/notificatonReducer'

const Anecdote = ({anecdote, handleVoteIncrease}) => {
  // useDispatch-hook provides any React component access to dispatch-function from the useDispatch -hook to send actions to react-redux store
  const dispatch = useDispatch()

  const voteIncrease = () => {
    dispatch(toggleIncreaseVote(anecdote.id))
    dispatch(setNotification(`You voted for "${anecdote.content}"`))
    setTimeout(() => {
      dispatch(removeNotification(null))
    }, 5000);
  }

  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => voteIncrease(anecdote)}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  // any React component can access the anecdotes stored in the store with the useSelector-hook,the function either searches for or selects data from the react-redux store
  const filteredAnecdotes = useSelector(({filter, anecdotes}) => {
    if (filter === null) {
      return anecdotes
    }
    // use regular Expression to filter out the anecdotes with case-insensitive matching(i) of the filter string content
    const regex = new RegExp( filter, 'i' )
    return anecdotes.filter(anecdote => anecdote.content.match(regex))
  })


  // use the spread syntax to copy the state before mutating it using sort method to sort the anecdote list 
  // by no. of votes in descending order and to avoid sort not a function error
  const anecdotesToSort = [...filteredAnecdotes]
  const sortedAnecdotes = anecdotesToSort.sort((a, b) => b.votes - a.votes)
  // console.log('sorted anecdotes: ', sortedAnecdotes)

  return (
    <div>
      {sortedAnecdotes.map(anecdote =>
        <Anecdote 
          key={anecdote.id}
          anecdote={anecdote}
        />
      )}
    </div>
  )
}

export default AnecdoteList