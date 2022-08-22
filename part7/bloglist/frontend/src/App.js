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
import Menu from './components/Menu'
import { initializeAllUsers } from './reducers/usersReducer'
import EachBlogInfo from './components/EachBlogInfo'

// material UI stylesheet imports
import { Container, AppBar, Toolbar, IconButton, Button } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
// material UI stylesheet imports

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

  // show the login form only if the user is not logged-in so when user === null
  if (user === null) {
    return (
      // add inline styling to display the login form in center of page
      <Container style={{ display: 'flex', justifyContent: 'center' }}>
        <div>
          <h2>Log in to Bloglist App</h2>
          <Notification />
          <LoginForm />
        </div>
      </Container>
    )
  }

  return (
    <Container>
      <Router>
        <div>
          <>
            <AppBar position="static">
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                ></IconButton>
                <Button color="inherit" component={Link} to="/">
                  Home
                </Button>
                <Button color="inherit" component={Link} to="/blogs">
                  Blogs
                </Button>
                <Button color="inherit" component={Link} to="/users">
                  Users
                </Button>
              </Toolbar>
            </AppBar>
          </>
          <Routes>
            <Route
              path="/users/:id"
              element={
                <div>
                  <Menu />
                  <UserBlogsList />
                </div>
              }
            />
            <Route
              path="/blogs/:id"
              element={
                <div>
                  <Menu />
                  <EachBlogInfo />
                </div>
              }
            />
            <Route
              path="/blogs"
              element={
                <div>
                  <Menu />
                  <Togglable buttonLabel="new blog" ref={blogFormRef}>
                    <BlogForm blogFormRef={blogFormRef} />
                  </Togglable>
                  <Blog />
                </div>
              }
            />
            <Route
              path="/users"
              element={
                <div>
                  <Menu />
                  <UsersList />
                </div>
              }
            />
            <Route
              path="/"
              element={
                <>
                  <br></br>
                  <span>{user.name} logged in </span>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    endIcon={<LogoutIcon />}
                    onClick={handleLogout}
                  >
                    logout
                  </Button>
                  <h2>Blogs</h2>
                  <Notification />
                  <Blog />
                </>
              }
            />
          </Routes>
        </div>
      </Router>
    </Container>
  )
}

export default App
