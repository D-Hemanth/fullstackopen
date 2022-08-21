import { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser, setUser } from './reducers/userReducer'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import UsersList from './components/UsersList'
import UserBlogsList from './components/UserBlogsList'
import { initializeAllUsers } from './reducers/usersReducer'

const App = () => {
  // useDispatch-hook provides any React component access to dispatch-function from the useDispatch -hook to send actions to react-redux store
  const dispatch = useDispatch()

  // use Useeffect to add a side effect after rendering the component i.e. here we use it to get data from the server
  // useEffect takes 2 parameters the effect function & the [] - array specifies how  often the effect function is run
  useEffect(() => {
    // https://github.com/reduxjs/redux-thunk
    // With Redux Thunk it is possible to implement action creators which return a function instead of an object
    dispatch(initializeBlogs())
    dispatch(initializeUser())
    dispatch(initializeAllUsers())
  }, [])

  // use useSelector to access the redux store from any react component
  const user = useSelector((state) => state.user)
  // console.log('user state', user)

  // The useRef hook is used to create a blogFormRef ref, that is assigned to the Togglable component containing the creation blog form
  // blogFormRef variable acts as a reference to the component
  const blogFormRef = useRef()

  // Logout & Ensure the browser does not remember the details of the user after logging out
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    // window.localStorage.clear()
    dispatch(setUser(null))
  }

  const padding = {
    paddingRight: 5,
  }

  // show the login form only if the user is not logged-in so when user === null
  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/users/:id"
            element={
              <div>
                <h2>Blogs</h2>
                <Notification />
                <p>{user.name} logged in </p>
                <p>
                  <button onClick={handleLogout}>logout</button>
                </p>
                <UserBlogsList />
              </div>
            }
          />
          <Route
            path="/users"
            element={
              <div>
                <h2>Blogs</h2>
                <Notification />
                <p>{user.name} logged in </p>
                <p>
                  <button onClick={handleLogout}>logout</button>
                </p>
                <UsersList />
              </div>
            }
          />
          <Route
            path="/"
            element={
              <div>
                <Link style={padding} to="/users">
                  users
                </Link>
                <span>{user.name} logged in </span>
                <button style={padding} onClick={handleLogout}>
                  logout
                </button>
                <h2>Blogs</h2>
                <Notification />
                <Togglable buttonLabel="new blog" ref={blogFormRef}>
                  <BlogForm blogFormRef={blogFormRef} />
                </Togglable>
                <Blog />
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
