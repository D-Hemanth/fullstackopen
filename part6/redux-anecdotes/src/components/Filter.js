import { connect } from "react-redux"
import { filterAnecdote } from "../reducers/filterReducer"

// pass the props containing the redux-store state to the Filter component as props
const Filter = (props) => {
  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    const filter = event.target.value

    // props contains the actions creators/ dispatch function from mapDispatchToProps function for dispatching actions
    props.filterAnecdote(filter)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

// Alternative mapDispatchToProps function, connect will invoke it by passing the dispatch-function as its parameter. 
// The return value of the function is an object that defines a group of functions(here dispatch(filterAnecdote)) that get passed to the connected component as props
// there are situations where the more complicated definition is necessary, like if the dispatched actions need to reference the props of the component -https://github.com/gaearon/redux-devtools/issues/250#issuecomment-186429931

// const mapDispatchToProps = (dispatch) => {
//   return {
//     filterAnecdote: value => {
//       dispatch(filterAnecdote(value))
//     }
//   }
// }

// Since the component does not need to access the store's state, we can simply pass null as the first parameter to connect
// connect function accepts a mapDispatchToProps function as its second parameter, which is a group of action creator/dispatch functions passed to the connected component as props, here destructuring object literal is used
export default connect(null, { filterAnecdote })(Filter)