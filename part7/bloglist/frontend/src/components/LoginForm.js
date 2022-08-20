// import PropTypes from 'prop-types'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { setUser } from '../reducers/userReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleUsernameChange = (event) => setUsername(event.target.value)
  const handlePasswordChange = (event) => setPassword(event.target.value)

  const handleLogin = async (event) => {
    event.preventDefault()
    // console.log('logging in with', username, password)

    // If the login is successful, the form fields are emptied and the server response
    // (including a token and the user details) is saved to the user field of the application's state.
    try {
      const user = await loginService.login({
        username,
        password,
      })

      // save the details of a logged-in user to the local storage of browser with window.localStorage
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      // call the method blogService.setToken(user.token) with a successful login for setting token for all axios requests
      blogService.setToken(user.token)
      // setUser(user)
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('exception', exception)
      // set message color to red for errors in the bloglist app using dispatch hook to send actions to react store and similarly
      // Add a improved notification message when you've typed in a wrong username or password with
      const notificationMessage = 'Wrong username or password'
      const messageColor = 'red'
      dispatch(setNotification({ messageColor, notificationMessage }, 5))
    }
  }

  return (
    <div>
      {/* Add the components for username & password for login */}
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  )
}

// expected and required props of a component can be defined with the prop-types package
// LoginForm.prototypes = {
// handleSubmit: PropTypes.func.isRequired,
// handleUsernameChange: PropTypes.func.isRequired,
// handlePasswordChange: PropTypes.func.isRequired,
// username: PropTypes.string.isRequired,
// password: PropTypes.string.isRequired,
// }

export default LoginForm
