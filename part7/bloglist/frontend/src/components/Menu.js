import { useDispatch, useSelector } from 'react-redux'
import Notification from './Notification'
import { setUser } from '../reducers/userReducer'

const Menu = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  // Logout & Ensure the browser does not remember the details of the user after logging out
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    // window.localStorage.clear()
    dispatch(setUser(null))
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      <p>{user.name} logged in </p>
      <p>
        <button onClick={handleLogout}>logout</button>
      </p>
    </div>
  )
}

export default Menu
