import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR_BIRTHYEAR } from '../queries'

const AuthorBirthForm = ({ authors }) => {
  const [name, setName] = useState('')
  const [setBornTo, setSetBornTo] = useState('')

  // hook function useMutation provides the functionality for making mutations/changes to server data
  // if person is not in gql server the response given in backend resolver is return null, in gql this is not onError,
  // so We can use the result field returned by the useMutation hook as its second parameter to generate an error message
  const [editAuthorBirthyear] = useMutation(EDIT_AUTHOR_BIRTHYEAR)

  const submit = (event) => {
    event.preventDefault()

    // use editAuthorBirthyear query from useMutation to edit born year of an author already in phonebook gql server
    // when a Author's birthyear is changed, the new bornyear automatically appears on the list of authors rendered by the Authors component because each author has an identifying field of type ID
    editAuthorBirthyear({ variables: { name, setBornTo } })

    setName('')
    setSetBornTo('')
  }

  const handleNameSelection = (event) => {
    setName(event.target.value)
  }

  return (
    <div>
      <h2>Set Birthyear</h2>
      <form onSubmit={submit}>
        <select value={name} onChange={handleNameSelection}>
          {authors.map((author) => (
            <option key={author.name}>{author.name}</option>
          ))}
        </select>
        <div>
          born{' '}
          <input
            value={setBornTo}
            onChange={({ target }) => setSetBornTo(Number(target.value))}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default AuthorBirthForm
