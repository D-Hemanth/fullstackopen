import { useState } from "react"

const BlogForm = ({ createBlog }) => {
  // Add states for inputing new blogs by loggedIn users
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

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

  // send back the title, author, url as props to createNewBlog callback function to perform axios create
  createBlog({
    title: newTitle,
    author: newAuthor,
    url: newUrl
  })
    // set the states of title, author, url to blank after sending their data back to App.js with createNewBlogs
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    // Allow loggedIn users to add new blog to mongodb through input forms, states, useRef for toggleVisibility, props.children
    <div>
      <h2>Create New Blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input id="title" value={newTitle} name="Title" onChange={handleTitleChange} />
        </div>
        <div>
          author:
          <input id="author" value={newAuthor} name="Author" onChange={handleAuthorChange} />
        </div>
        <div>
          url:
          <input id="url" value={newUrl} name="Url" onChange={handleUrlChange} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm