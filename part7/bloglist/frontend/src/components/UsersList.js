import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

// material UI stylesheet
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  styled,
  tableCellClasses,
} from '@mui/material'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))
// material UI stylesheet

// Implement a view to the application that displays all of the basic information related to users
const User = ({ users }) => {
  // console.log('sorted users', users)
  return (
    <div>
      <h2>Users</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <StyledTableCell>User</StyledTableCell>
              <StyledTableCell align="center">Blogs created</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <StyledTableRow key={user.id}>
                <StyledTableCell>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </StyledTableCell>
                <StyledTableCell align="center">
                  {user.blogs.length}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
