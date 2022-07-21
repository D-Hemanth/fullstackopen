import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  // Add states for inputing new blogs by loggedIn users
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

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

  // Logout & Ensure the browser does not remember the details of the user after logging out
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    // window.localStorage.clear()
    setUser(null)
  } 


  const handleTitleChange = (event) => {
    console.log(event.target.value)
    setNewTitle(event.target.value)
  } 

  const handleAuthorChange = (event) => {
    console.log(event.target.value)
    setNewAuthor(event.target.value)
  } 

  const handleUrlChange = (event) => {
    console.log(event.target.value)
    setNewUrl(event.target.value)
  } 

  return (
    <div>
      <h2>Blogs</h2>
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>

      {/* Allow loggedin users to add new blog to mongodb through input forms & states */}
      <div>
        <h2>Create New Blog</h2>
        <form onSubmit={addBlog}>
          <div>
            title:
            <input id="title" value={newTitle} name="Title" onChange={handleTitleChange} />
          </div>
          <div>
            author:
            <input id="author" value={newAuthor} name="Author" onChange={handleAuthorChange} />
          </div>
          <div>
            url:
            <input id="url" value={newUrl} name="Url" onChange={handleUrlChange} />
          </div>
          <button type="submit">create</button>
        </form>
      </div>

      { blogs.map(blog =>
      <Blog key={blog.id} blog={blog} /> )}
    </div>
  )
}

export default App
