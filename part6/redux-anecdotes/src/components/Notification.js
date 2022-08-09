import { connect } from "react-redux"

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  // if initially after loading the page there are no notifications to show i.e notification initialstate is null
  // then don't display the notification display style empty bar at the top
  if(props.notification === null) {
    return null
  }

  return (
    <div style={style}>
      {props.notification}
    </div>
  )
}

// by using mapStateToProps the Notification component can access the state of the store directly through the props
const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

// connect function accepts a mapStateToProps function as its first parameter, which can be used for defining the props of the connected component that are based on the state of the Redux store
// connect function accepts a mapDispatchToProps function as its second parameter, which is a group of action creator/dispatch functions passed to the connected component as props, here dispatch not needed so skip this argument
export default connect(mapStateToProps)(Notification)