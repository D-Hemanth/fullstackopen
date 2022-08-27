import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR_BIRTHYEAR } from '../queries'

const AuthorBirthForm = () => {
  const [name, setName] = useState('')
  const [setBornTo, setSetBornTo] = useState('')

  const [editAuthorBirthyear] = useMutation(EDIT_AUTHOR_BIRTHYEAR)

  const submit = (event) => {
    event.preventDefault()

    // use editAuthorBirthyear query from useMutation to edit born year of an author already in phonebook gql server
    // when a Author's birthyear is changed, the new bornyear automatically appears on the list of authors rendered by the Authors component because each author has an identifying field of type ID
    editAuthorBirthyear({ variables: { name, setBornTo } })

    setName('')
    setSetBornTo('')
  }

  return (
    <div>
      <h2>Set Birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name{' '}
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          name{' '}
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
