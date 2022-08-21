import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = ({ blog }) => {
  // add styles to the application using inline styles
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} - {blog.author}
      </Link>
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
