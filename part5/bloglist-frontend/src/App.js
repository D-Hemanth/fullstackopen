import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  // use Useeffect to add a side effect after rendering the component i.e. here we use it to get data from the server
  // useEffect takes 2 parameters the effect function & the [] - array specifies how  often the effect function is run
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    // console.log('logging in with', username, password)

    // If the login is successful, the form fields are emptied and the server response 
    // (including a token and the user details) is saved to the user field of the application's state.
    try {
      const user = await loginService.login({ 
        username, password 
      })
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      console.log('exception', exception)
    }
  }

  // show the login form only if the user is not logged-in so when user === null
  if(user === null) {
    return (
      // Add the components for username & password for login
      // target.value sets the username, password value from the form to application's state variables username, password
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
  )}

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>

      { blogs.map(blog =>
      <Blog key={blog.id} blog={blog} /> )}
    </div>
  )
}

export default App
