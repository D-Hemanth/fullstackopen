import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_BOOK, ALL_AUTHORS, ALL_BOOKS } from '../queries'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  // hook function useMutation provides the functionality for making mutations/changes to server data
  // You can provide the refetchQueries option to useMutation as a way to update your local data by fetching the latest data from the server
  // We can register an error handler function to the mutation using the useMutation hook's onError option
  const [createBook] = useMutation(ADD_BOOK, {
    onError: (error) => {
      props.setError(error.graphQLErrors[0].message)
    },
    // refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],     // refectQueries way of updating the cache by calling queries again
    refetchQueries: [{ query: ALL_AUTHORS }],
    // use update callback function instead of refetchQueries for handling every small changes for ALL_BOOKS but use refetchQueries Sfor ALL_AUTHORS to keep authors view upto date
    update: (cache, response) => {
      cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(response.data.addBook),
        }
      })
    },
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    // use Number in input element to convert the published value to int before saving to react state
    // console.log('int converted value of published', published)

    // use createBook query from useMutation to addBoook to gql server
    createBook({ variables: { title, published, author, genres } })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <h2>Add a New Book</h2>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(Number(target.value))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook
