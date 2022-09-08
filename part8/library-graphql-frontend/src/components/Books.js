import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { ALL_BOOKS, ALL_BOOKS_BY_GENRE } from '../queries'

// Books renders the detailed info of each book
const Books = (props) => {
  const [genre, setGenre] = useState('')
  const [filteredBooks, setFilteredBooks] = useState([])

  // the hook function useQuery makes the query it receives as a parameter, It returns an object with multiple fields { loading, error, data: queryType }
  const result = useQuery(ALL_BOOKS)
  // console.log('allBooks query result', result)

  // filter the books based on the genre choosen by the user using useQuery hook
  const response = useQuery(ALL_BOOKS_BY_GENRE, {
    variables: { genre },
  })
  // console.log('genre, response', genre, response)

  // if user has selected a genre & useQuery of ALL_BOOKS_BY_GENRE has given a valid response then setFilteredBooks state value
  useEffect(() => {
    if (genre && response.data) {
      setFilteredBooks(response.data.allBooks)
      // console.log('books filtered using useQuery', response.data.allBooks)
    }
  }, [response.data, genre])

  if (!props.show) {
    return null
  }

  // The field loading is true if the query has not received a response yet
  if (result.loading) {
    return <div>loading...</div>
  }

  if (!result.data || result.data.length === 0) {
    return <div>No Books saved yet</div>
  }

  const books = result.data.allBooks

  const handleGenreSubmit = (event) => {
    event.preventDefault()
    setGenre(event.target.value)
  }

  // use map, flatMap to combine all genre arrays from all books into single genre array
  const allGenres = books.map((book) => book.genres).flatMap((genre) => genre)
  // use Set to remove the duplicate genre elements in the genre array
  const filteredAllGenres = [...new Set(allGenres)]

  return (
    <div>
      <h2>books</h2>
      <p>
        in genre <strong>{genre}</strong>
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/*  select the genre to filter the library books by */}
      {filteredAllGenres.map((genre) => (
        <button value={genre} key={genre} onClick={handleGenreSubmit}>
          {genre}
        </button>
      ))}
    </div>
  )
}

export default Books
