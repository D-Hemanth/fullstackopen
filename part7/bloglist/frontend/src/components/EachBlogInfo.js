import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { increaseLikes, deleteBlog } from '../reducers/blogReducer'

const EachBlogInfo = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)
  // console.log('EachBlogInfo blogs from state', blogs)
  // use useParams to get the id from the address bar
  const id = useParams().id
  // console.log('blog id from useParams', id)
  const blog = blogs.find((blog) => blog.id === id)
  // console.log('blog info to display', blog)
  // console.log('comments in blog', blog.comments)

  // use useNavigate to navigate to home page('/') after a blog is deleted
  const navigate = useNavigate()

  // update the blog with new likes by dispatching increaseLikes action creator using axios put request
  const increaseBlogLikes = () => {
    dispatch(increaseLikes(blog))
  }

  // delete blogs from bloglist by dispatching deleteBlog action creator to send axios delete request
  const handleRemoveBlogChange = () => {
    dispatch(deleteBlog(blog))
    navigate('/')
  }

  // the button for deleting a blog post is visible only if the blog post was added by that user
  const deleteButtonVisibility = {
    display: user.name === blog.user.name ? '' : 'none',
  }

  return (
    <div>
      <h2>
        {blog.title} - {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <br />
      likes {blog.likes}{' '}
      <button id="likes-button" onClick={increaseBlogLikes}>
        like
      </button>
      <br />
      added by {blog.user.name}
      <br />
      <button
        style={deleteButtonVisibility}
        id="remove-button"
        onClick={handleRemoveBlogChange}
      >
        remove
      </button>
      <h3>comments</h3>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default EachBlogInfo
