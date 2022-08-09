import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificatonReducer'

const AnecdoteForm = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault()
    // We can get the content of the new anecdote straight from the form field. Because the field has a name, 
    // we can access the content via the event object event.target.anecdote.value.
    const content = event.target.anecdote.value
    console.log('content log:', `${ content }`)
    event.target.anecdote.value = ''

    // props contains the actions creators/dispatch function from mapDispatchToProps function for dispatching actions
    props.createAnecdote(content)
    props.setNotification(`You added a new anecdote "${content}"`, 5)
  }

  return (
    <form onSubmit={addAnecdote}>
      <h2>create new</h2>
      <div><input name='anecdote' /></div>
      <button type='submit'>create</button>
    </form>
  )
}

// Alternative mapDispatchToProps function, connect will invoke it by passing the dispatch-function as its parameter. 
// The return value of the function is an object that defines a group of functions(here dispatch(filterAnecdote)) that get passed to the connected component as props
// there are situations where the more complicated definition is necessary, like if the dispatched actions need to reference the props of the component -https://github.com/gaearon/redux-devtools/issues/250#issuecomment-186429931

// const mapDispatchToProps = (dispatch) => {
//   return {
//     createAnecdote: value => {
//       dispatch(createAnecdote(value))
//     },
//     setNotification: value => {
//       dispatch(setNotification(value))
//     }
//   }
// }

// Since the component does not need to access the store's state, we can simply pass null as the first parameter to connect
// connect function accepts a mapDispatchToProps function as its second parameter, which is a group of action creator/dispatch functions passed to the connected component as props, here destructuring object literal is used
export default connect(null, { createAnecdote, setNotification })(AnecdoteForm)