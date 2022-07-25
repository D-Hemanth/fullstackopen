import { useState } from "react"

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  // visibility of the component is defined by an inline style rule, when the display property is set to none the component is not displayed
  const showWhenVisible = {display: visible ? '' : 'none'}

  const buttonLabel = visible ? 'hide' : 'view'

  return (
      {blog.title} {blog.author}&nbsp; 
      <button onClick={toggleVisibility} blog={blog}>{buttonLabel}</button>
      <div style={showWhenVisible}>
        {blog.url}<br />
        likes {blog.likes} <button>like</button><br />
        {blog.user.name}<br />
      </div>
  </div>  
)
}

export default Blog