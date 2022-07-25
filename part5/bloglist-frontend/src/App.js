import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [messageColor, setMessageColor] = useState(null)

  // use Useeffect to add a side effect after rendering the component i.e. here we use it to get data from the server
  // useEffect takes 2 parameters the effect function & the [] - array specifies how  often the effect function is run
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )  
  }, [])

  // application checks if user details of a logged-in user can already be found on the local storage. If they can, the details are saved to the state of the application and to blogService
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
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
        username, password 
      })

      // save the details of a logged-in user to the local storage of browser with window.localStorage
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      
      // call the method noteService.setToken(user.token) with a successful login for setting token for all axios requests
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      // console.log('exception', exception)
      // set message color to red for errors in the bloglist app
      setMessageColor('red')
      // Add a improved notification message when you've typed in a wrong username or password
      setNotificationMessage('Wrong username or password')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000);
    }
  }

  // The useRef hook is used to create a noteFormRef ref, that is assigned to the Togglable component containing the creation note form
  // noteFormRef variable acts as a reference to the component
  const blogFormRef = useRef()

  // show the login form only if the user is not logged-in so when user === null
  if(user === null) {
    return (
      // Add the components for username & password for login
      // target.value sets the username, password value from the form to application's state variables username, password
      <div>
        <h2>Log in to application</h2>

        <Notification notificationMessage={notificationMessage} messageColor={messageColor} />

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

  // Logout & Ensure the browser does not remember the details of the user after logging out
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    // window.localStorage.clear()
    setUser(null)
  } 

  const addBlog = async (newBlogObject) => {
    try {
      // use the toggleVisibility function referenced from the Toggable component to hide create noteform after creating a note
      blogFormRef.current.toggleVisibility()
      // Use blogservice create method to post data to the server
      const newBlog = await blogService.create(newBlogObject)
      setBlogs(blogs.concat(newBlog)) 
      
      setMessageColor('green')
      setNotificationMessage(`A new blog ${newBlog.title} by ${newBlog.author} added`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000);
    }
    catch (exception) {
      console.log(exception)
    }
  }

  return (
    <div>
      <h2>Blogs</h2>

      <Notification notificationMessage={notificationMessage} messageColor={messageColor} />

      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>

      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog}/>
      </Togglable>

      { blogs.map(blog =>
      <Blog key={blog.id} blog={blog} /> )}
    </div>
  )
}

export default App
