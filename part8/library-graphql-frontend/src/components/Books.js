import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

// Books renders the detailed info of each book
const Books = (props) => {
  // the hook function useQuery makes the query it receives as a parameter, It returns an object with multiple fields { loading, error, data: queryType }
  const result = useQuery(ALL_BOOKS)
  // console.log('allBooks query result', result)

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

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
