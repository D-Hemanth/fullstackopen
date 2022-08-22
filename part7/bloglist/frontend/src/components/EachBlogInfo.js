import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { increaseLikes, deleteBlog, addComment } from '../reducers/blogReducer'

// material UI stylesheet
import { TextField, Button } from '@mui/material'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import DeleteIcon from '@mui/icons-material/Delete'
import AddCommentIcon from '@mui/icons-material/AddComment'
// material UI stylesheet

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

  // dispatch an action creator containing the blog & comment value to the reducer
  const handleCommentSubmit = (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    // console.log('comment value', comment)
    // console.log('blog value in comment handler', blog)
    event.target.comment.value = ''
    dispatch(addComment(comment, blog))
  }

  return (
    <div>
      <h2>
        {blog.title} - {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <br></br>
      <br />
      likes {blog.likes}{' '}
      <Button
        id="likes-button"
        variant="contained"
        color="primary"
        size="small"
        endIcon={<ThumbUpOffAltIcon />}
        onClick={increaseBlogLikes}
      >
        like
      </Button>
      <br></br>
      <br />
      added by {blog.user.name}
      <br></br>
      <br />
      <Button
        style={deleteButtonVisibility}
        id="remove-button"
        variant="contained"
        color="primary"
        size="small"
        endIcon={<DeleteIcon />}
        onClick={handleRemoveBlogChange}
      >
        remove
      </Button>
      <h3>comments</h3>
      <form onSubmit={handleCommentSubmit}>
        <TextField
          id="comment"
          label="comment"
          variant="standard"
          name="comment"
          type="text"
        />
        <Button
          id="comment-button"
          variant="contained"
          color="primary"
          size="small"
          endIcon={<AddCommentIcon />}
          type="submit"
        >
          add comment
        </Button>
      </form>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default EachBlogInfo
