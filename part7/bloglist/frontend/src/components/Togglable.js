import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

// material UI stylesheet
import { Button } from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel'
import AddIcon from '@mui/icons-material/Add'
// material UI stylesheet

// React.forwardRef creates a React component that forwards the ref attribute it receives to another component below in the tree
const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  // visibility of the component is defined by an inline style rule, when the display property is set to none the component is not displayed
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  // useImperativeHandle customizes the instance value that is exposed to parent components when using ref, useImperativeHandle should be used with forwardRef
  // component uses the useImperativeHandle hook to make its toggleVisibility function available outside of the component
  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button
          variant="contained"
          color="primary"
          endIcon={<AddIcon />}
          size="small"
          onClick={toggleVisibility}
        >
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button
          variant="contained"
          color="primary"
          endIcon={<CancelIcon />}
          onClick={toggleVisibility}
        >
          cancel
        </Button>
      </div>
      <br></br>
    </div>
  )
})

// expected and required props of a component can be defined with the prop-types package
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

// to remove the component definition is missing display name error in eslint add the following lines
Togglable.displayName = 'Togglable'

export default Togglable
