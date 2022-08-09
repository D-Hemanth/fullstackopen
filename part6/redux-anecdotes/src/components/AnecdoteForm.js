import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificatonReducer'

const AnecdoteForm = () => {
  // useDispatch-hook provides any React component access to dispatch-function from the useDispatch -hook to send actions to react-redux store
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    // We can get the content of the new anecdote straight from the form field. Because the field has a name, 
    // we can access the content via the event object event.target.anecdote.value.
    const content = event.target.anecdote.value
    console.log('content log:', `${ content }`)
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(setNotification(`You added a new anecdote "${content}"`, 5))
  }

  return (
    <form onSubmit={addAnecdote}>
      <h2>create new</h2>
      <div><input name='anecdote' /></div>
      <button type='submit'>create</button>
    </form>
  )
}

export default AnecdoteForm