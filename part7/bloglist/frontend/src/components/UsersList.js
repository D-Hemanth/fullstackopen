import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

// Implement a view to the application that displays all of the basic information related to users
const User = ({ users }) => {
  // console.log('sorted users', users)
  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const UsersList = () => {
  const users = useSelector((state) => state.users)
  const usersToSort = [...users]
  // console.log('all users from store', users)
  // sort the users based on the no. of blogs created by them in decreasing order & don't mutate state directly else sort error will come
  const sortedUsers = usersToSort.sort(
    (a, b) => b.blogs.length - a.blogs.length,
  )

  return (
    <div>
      <User users={sortedUsers} />
    </div>
  )
}

export default UsersList
