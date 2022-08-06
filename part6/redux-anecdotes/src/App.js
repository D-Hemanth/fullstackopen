import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    // We can get the content of the new anecdote straight from the form field. Because the field has a name, 
    // we can access the content via the event object event.target.anecdote.value.
    const content = event.target.anecdote.value
    console.log('content log:', `${ content }`)
    event.target.anecdote.value = ''
    dispatch({
      type: 'NEW_ANECDOTE',
      data: `${ content }`
    })
  }

  const vote = (id) => {
    console.log('vote', id)
    dispatch({
      type: 'TOGGLE_VOTE',
      data: { id }
    })
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
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
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App