import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const UserBlogsList = () => {
  const users = useSelector((state) => state.users)
  // console.log('userblogList users', users)
  const id = useParams().id
  // console.log('useParams id', id)
  const user = users.find((user) => user.id === id)
  // console.log('user', user)

  // when we navigate directly to the page of an individual user(http://localhost:3000/users/62cd180cd1309afb19e7821b),
  // the React application has not yet received the user data then return null
  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default UserBlogsList
