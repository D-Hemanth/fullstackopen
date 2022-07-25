import { useState } from "react"

const Blog = ({ blog, updateBlog }) => {
  const [visible, setVisible] = useState(false)
  // to store the name of the user after updating the likes
  const [likesUpdateBlog, setLikesUpdateBlog] = useState(blog)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  // visibility of the component is defined by an inline style rule, when the display property is set to none the component is not displayed
  const showWhenVisible = {display: visible ? '' : 'none'}

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
    const likesIncreaseBlog = ({...blog, likes: blog.likes + 1})
    console.log(likesIncreaseBlog)
    // pass the update blog with new likes value to the update function props from the App file
    setLikesUpdateBlog(likesIncreaseBlog)
    updateBlog(likesIncreaseBlog)
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}&nbsp; 
      <button onClick={toggleVisibility}>{buttonLabel}</button>
      <div style={showWhenVisible}>
        {blog.url}<br />
        likes {blog.likes} <button onClick={increaseLikes}>like</button><br />
        {likesUpdateBlog.user.name}<br />
      </div>
    </div>  
  )
}

export default Blog