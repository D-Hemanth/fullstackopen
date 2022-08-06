import { useSelector, useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import { toggleIncreaseVote } from './reducers/anecdoteReducer'

const App = () => {

  return (
    <div>
      <h2>Anecdotes</h2>
    <AnecdoteForm />
      <AnecdoteList />
    </div>
  )
}

export default App