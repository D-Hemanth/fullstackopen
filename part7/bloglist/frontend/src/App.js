import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  // useDispatch-hook provides any React component access to dispatch-function from the useDispatch -hook to send actions to react-redux store
  const dispatch = useDispatch()

  // use Useeffect to add a side effect after rendering the component i.e. here we use it to get data from the server
  // useEffect takes 2 parameters the effect function & the [] - array specifies how  often the effect function is run
  useEffect(() => {
    // https://github.com/reduxjs/redux-thunk
    // With Redux Thunk it is possible to implement action creators which return a function instead of an object
    dispatch(initializeBlogs())
  }, [dispatch])

  // application checks if user details of a logged-in user can already be found on the local storage. If they can, the details are saved to the state of the application and to blogService
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

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

      // call the method noteService.setToken(user.token) with a successful login for setting token for all axios requests
      blogService.setToken(user.token)
      setUser(user)
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

  // The useRef hook is used to create a noteFormRef ref, that is assigned to the Togglable component containing the creation note form
  // noteFormRef variable acts as a reference to the component
  const blogFormRef = useRef()

  // Logout & Ensure the browser does not remember the details of the user after logging out
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    // window.localStorage.clear()
    setUser(null)
  }

  // show the login form only if the user is not logged-in so when user === null
  if (user === null) {
    return (
      // Add the components for username & password for login
      // target.value sets the username, password value from the form to application's state variables username, password
      <div>
        <h2>Log in to application</h2>
        <Notification />

        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />

      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>
      <Blog user={user} />
    </div>
  )
}

export default App
