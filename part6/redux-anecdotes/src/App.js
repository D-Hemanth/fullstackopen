import { useSelector, useDispatch } from 'react-redux'
import { createAnecdote, toggleIncreaseVote } from './reducers/anecdoteReducer'

const App = () => {
  // any React component can access the anecdotes stored in the store with the useSelector-hook,the function either searches for or selects data from the react-redux store
  const anecdotes = useSelector(state => state)
  // useDispatch-hook provides any React component access to dispatch-function from the useDispatch -hook to send actions to react-redux store
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(toggleIncreaseVote(id))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {/* use sort method to sort the anecdote list by no. of votes in descending order */}
      {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    <AnecdoteForm />
    </div>
  )
}

export default App