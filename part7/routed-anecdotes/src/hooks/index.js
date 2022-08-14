import { useState } from 'react'

// create useField a custom hook for anecdote creation form in your application  
const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  // In React, you should use onReset instead of just reset property on input tags or it will cause 
  // warning: Invalid value for prop `reset` on <input> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM.
  const onReset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    onReset
  }
}

export default useField