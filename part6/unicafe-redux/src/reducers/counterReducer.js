const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

// A reducer defined should be such that if there is a change in the state, the old object is not changed, 
// but it is replaced with a new, changed, object i.e state should not be directly mutated/modified
const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      return {...state, good: state.good + 1}  // incrementing good by 1 using the JavaScript array spread-syntax
    case 'OK':
      return {...state, ok: state.ok + 1}
    case 'BAD':
      return {...state, bad: state.bad + 1}
    case 'ZERO':
      return state = initialState
    default: return state
  }
  
}

export default counterReducer