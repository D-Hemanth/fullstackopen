  const [visible, setVisible] = useState(false)

  // visibility of the component is defined by an inline style rule, when the display property is set to none the component is not displayed
  const hideWhenVisible = { display: visible ? 'none' : ''}
  const showWhenVisible = { display: visible ? '' : 'none'}

  const toggleVisibility = () => {
    setVisible(!visible)
  }



export default Togglable