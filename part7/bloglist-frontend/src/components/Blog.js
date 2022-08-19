import { useState } from 'react'

const Blog = ({ blog, user, updateBlog, deleteBlog }) => {
  const [visible, setVisible] = useState(false)

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

  const increaseLikes = () => {
    // Using the spread operator to update blog object's likes value by 1
    const likesIncreaseBlog = ({ ...blog, likes: blog.likes + 1 })
    // console.log(likesIncreaseBlog)
    // pass the update blog with new likes value to the update function props from the App file
    updateBlog(likesIncreaseBlog)
  }

  // delete blogs from bloglist using deleteBlog function props to send axios delete request
  const handleRemoveBlogChange = () => {
    deleteBlog(blog)
  }

  // the button for deleting a blog post is visible only if the blog post was added by that user
  const deleteButtonVisibility = { display: user.name === blog.user.name ? '' : 'none' }

  return (
    <div style={blogStyle} className='blog'>
      {blog.title} - {blog.author}&nbsp;
      <button onClick={toggleVisibility}>{buttonLabel}</button>
      <div style={showWhenVisible} className='showFullBlog'>
        {blog.url}<br />
        likes {blog.likes} <button id='likes-button' onClick={increaseLikes}>like</button><br />
        {blog.user.name}<br />
        <button style={deleteButtonVisibility} id='remove-button' onClick={handleRemoveBlogChange}>remove</button>
      </div>
    </div>
  )
}

export default Blog