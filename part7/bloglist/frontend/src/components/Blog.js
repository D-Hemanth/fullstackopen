import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

// material UI stylesheet
import {
  TableContainer,
  Table,
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
// material UI stylesheet

const BlogList = ({ blog }) => {
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableBody>
            <TableRow>
              <StyledTableCell>
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title} - {blog.author}
                </Link>
              </StyledTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

const Blog = () => {
  const blogs = useSelector((state) => state.blogs)
  // console.log('Blogs state gotten from store', blogs)

  // sort the list of blog posts by the number of likes using sort method with compare function inside [(a,b) => a.likes - b.likes]
  // use the spread syntax to copy the state before mutating it using sort method to sort the blog list
  // by no. of likes in descending order and to avoid sort not a function error
  const blogsToSort = [...blogs]
  const sortedBlogs = blogsToSort.sort((a, b) => b.likes - a.likes)
  // console.log('sorted Blogs: ', sortedBlogs)

  return (
    <div>
      {sortedBlogs.map((blog) => (
        <BlogList key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default Blog
