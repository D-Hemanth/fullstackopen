import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

// material UI stylesheet
import { Box, TextField, Button } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
// material UI stylesheet

const BlogForm = ({ blogFormRef }) => {
  // Add states for inputing new blogs by loggedIn users
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  // useDispatch-hook provides any React component access to dispatch-function from the useDispatch -hook to send actions to react-redux store
  const dispatch = useDispatch()

  const handleTitleChange = (event) => {
    console.log(event.target.value)
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    console.log(event.target.value)
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    console.log(event.target.value)
    setNewUrl(event.target.value)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    // console.log('create new Blog button clicked', event.target);

    const newBlogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }

    try {
      // use the toggleVisibility function referenced from the Toggable component to hide create noteform after creating a note
      blogFormRef.current.toggleVisibility()
      // Use dispatch createBlog action creator to add new blogs using blogservice create method to post data to the server
      dispatch(createBlog(newBlogObject))
      // console.log(newBlogObject)

      // set message color to green for errors in the bloglist app using dispatch hook to send actions to react store and similarly
      // Add a improved notification message when you add a new blog into the list
      const notificationMessage = `A new blog "${newBlogObject.title}" by ${newBlogObject.author} added`
      const messageColor = 'green'
      dispatch(setNotification({ messageColor, notificationMessage }, 5))
    } catch (exception) {
      console.log(exception)
    }

    // set the states of title, author, url to blank after sending their data back to App.js with createNewBlogs
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    // Allow loggedIn users to add new blog to mongodb through input forms, states, useRef for toggleVisibility, props.children
    <div className="blogFormDiv">
      <h2>Create New Blog</h2>
      <Box
        component="form"
        sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
        onSubmit={addBlog}
      >
        <div>
          <TextField
            id="title"
            label="Title"
            multiline
            maxRows={4}
            variant="filled"
            value={newTitle}
            name="Title"
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <TextField
            id="author"
            label="Author"
            multiline
            maxRows={4}
            variant="filled"
            value={newAuthor}
            name="Author"
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          <TextField
            id="url"
            label="URL"
            multiline
            maxRows={4}
            variant="filled"
            value={newUrl}
            name="Url"
            onChange={handleUrlChange}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          endIcon={<SendIcon />}
          type="submit"
        >
          create
        </Button>
      </Box>
      <br></br>
    </div>
  )
}

export default BlogForm
