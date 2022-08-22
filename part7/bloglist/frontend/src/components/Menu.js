import { useDispatch, useSelector } from 'react-redux'
import Notification from './Notification'
import { setUser } from '../reducers/userReducer'

// material UI stylesheet
import { Button } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
// material UI stylesheet

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
        <Button
          variant="contained"
          color="primary"
          size="small"
          endIcon={<LogoutIcon />}
          onClick={handleLogout}
        >
          logout
        </Button>
      </p>
    </div>
  )
}

export default Menu
