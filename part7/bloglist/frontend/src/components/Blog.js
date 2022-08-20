import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increaseLikes, deleteBlog } from '../reducers/blogReducer'

const BlogList = ({ user, blog }) => {
  const [visible, setVisible] = useState(false)

  // useDispatch-hook provides any React component access to dispatch-function from the useDispatch -hook to send actions to react-redux store
  const dispatch = useDispatch()

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  // visibility of the component is defined by an inline style rule, when the display property is set to none the component is not displayed
  const showWhenVisible = { display: visible ? '' : 'none' }

  const buttonLabel = visible ? 'hide' : 'view'

  // add styles to the application using inline styles
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  // update the blog with new likes by dispatching increaseLikes action creator using axios put request
  const increaseBlogLikes = () => {
    dispatch(increaseLikes(blog))
  }

  // delete blogs from bloglist by dispatching deleteBlog action creator to send axios delete request
  const handleRemoveBlogChange = () => {
    dispatch(deleteBlog(blog))
  }

  // the button for deleting a blog post is visible only if the blog post was added by that user
  const deleteButtonVisibility = {
    display: user.name === blog.user.name ? '' : 'none',
  }

  return (
    <div style={blogStyle} className="blog">
      {blog.title} - {blog.author}&nbsp;
      <button onClick={toggleVisibility}>{buttonLabel}</button>
      <div style={showWhenVisible} className="showFullBlog">
        {blog.url}
        <br />
        likes {blog.likes}{' '}
        <button id="likes-button" onClick={increaseBlogLikes}>
          like
        </button>
        <br />
        {blog.user.name}
        <br />
        <button
          style={deleteButtonVisibility}
          id="remove-button"
          onClick={handleRemoveBlogChange}
        >
          remove
        </button>
      </div>
    </div>
  )
}

const Blog = () => {
  const user = useSelector((state) => state.user)
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
        <BlogList key={blog.id} user={user} blog={blog} />
      ))}
    </div>
  )
}

export default Blog
