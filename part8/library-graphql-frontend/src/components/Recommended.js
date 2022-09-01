import { useQuery } from '@apollo/client'
import { ALL_BOOKS, USER_INFO } from '../queries'
const Recommended = (props) => {
  // the hook function useQuery makes the query it receives as a parameter, It returns an object with multiple fields { loading, error, data: queryType }
  const result = useQuery(ALL_BOOKS)
  // console.log('allBooks query result', result)
  const userInfo = useQuery(USER_INFO)
  // console.log('current user info query result', userInfo)

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
  const userFavouriteGenre = userInfo.data.me.favouriteGenre

  // filter the books based on the current logged in user's favourite genre
  const filteredBooks = books.filter(book => 
    { 
      return book.genres.includes(userFavouriteGenre) 
    })

  return (
    <div>
      <h2>recommendations</h2>
      <p>Books in your favourite genre <strong>{userFavouriteGenre}</strong></p>
      
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
    </div>
  )
}

export default Recommended
