import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'
import AuthorBirthForm from './AuthorBirthForm'

// Authors renders the detailed info of each Author
const Authors = (props) => {
  // the hook function useQuery makes the query it receives as a parameter, It returns an object with multiple fields { loading, error, data: queryType }
  const result = useQuery(ALL_AUTHORS)
  // console.log('allAuthors useQuery result', result)

  if (!props.show) {
    return null
  }

  // The field loading is true if the query has not received a response yet
  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <AuthorBirthForm authors={authors} />
    </div>
  )
}

export default Authors
