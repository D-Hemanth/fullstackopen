import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = ({ show, setPage, setError, setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // hook function useMutation provides the functionality for making mutations/changes to server data
  // so We can use the result field returned by the useMutation hook as its second parameter to get the response returned by gql server
  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    },
  })

  // when a user is logged-in then we have to set the token from result parameter from useMutation to token state & localstorage
  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
    }
  }, [result.data]) // eslint-disable-line

  if (!show) {
    return null
  }

  // use login query from useMutation for logging in a person already in phonebook gql server
  const submit = async (event) => {
    event.preventDefault()

    login({ variables: { username, password } })
    // on logging-in change view back to authors by setting setPage state to authors
    setPage('authors')
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div>
          username{' '}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{' '}
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
