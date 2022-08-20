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

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  // useDispatch-hook provides any React component access to dispatch-function from the useDispatch -hook to send actions to react-redux store
  const dispatch = useDispatch()

  // use Useeffect to add a side effect after rendering the component i.e. here we use it to get data from the server
  // useEffect takes 2 parameters the effect function & the [] - array specifies how  often the effect function is run
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

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

  const addBlog = async (newBlogObject) => {
    try {
      // use the toggleVisibility function referenced from the Toggable component to hide create noteform after creating a note
      blogFormRef.current.toggleVisibility()
      // Use blogservice create method to post data to the server
      const newBlog = await blogService.create(newBlogObject)
      // console.log(newBlog)
      setBlogs(blogs.concat(newBlog))

      // set message color to green for errors in the bloglist app using dispatch hook to send actions to react store and similarly
      // Add a improved notification message when you add a new blog into the list
      const notificationMessage = `A new blog "${newBlog.title}" by ${newBlog.author} added`
      const messageColor = 'green'
      dispatch(setNotification({ messageColor, notificationMessage }, 5))
    } catch (exception) {
      console.log(exception)
    }
  }

  const updateBlog = async (likesBlogObject) => {
    try {
      // Use blogservice update method to put data to the server, specifically increase likes by 1 when likes button is clicked
      const likesIncreaseBlog = await blogService.update(likesBlogObject)
      setBlogs(
        blogs.map((blog) =>
          blog.id !== likesBlogObject.id ? blog : likesIncreaseBlog,
        ),
      )
    } catch (exception) {
      console.log(exception)
    }
  }

  const deleteBlog = async (blogToDelete) => {
    try {
      if (
        window.confirm(
          `Remove blog ${blogToDelete.title} by ${blogToDelete.author}`,
        )
      ) {
        // Use blogservice remove method to delete data from the server, only if the blog was created by that user
        blogService.remove(blogToDelete)
        setBlogs(blogs.filter((blog) => blog.id !== blogToDelete.id))
      }
    } catch (exception) {
      console.log(exception)
    }
  }

  // show the login form only if the user is not logged-in so when user === null
  if (user === null) {
    return (
      // Add the components for username & password for login
      // target.value sets the username, password value from the form to application's state variables username, password
      <div>
        <h2>Log in to application</h2>

        <Notification
          notificationMessage={notificationMessage}
          messageColor={messageColor}
        />

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

      <Notification
        notificationMessage={notificationMessage}
        messageColor={messageColor}
      />

      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>

      {/* sort the list of blog posts by the number of likes using sort method with compare function inside [(a,b) => a.likes - b.likes] */}
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={updateBlog}
            deleteBlog={deleteBlog}
            user={user}
          />
        ))}
    </div>
  )
}

export default App
