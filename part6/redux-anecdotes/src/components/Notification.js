import { useSelector } from "react-redux"

const Notification = () => {
  // any React component can access the anecdotes stored in the store with the useSelector-hook,the function either searches for or selects data from the react-redux store
  const notification = useSelector(state => state.notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  // if initially after loading the page there are no notifications to show i.e notification initialstate is null
  // then don't display the notification display style empty bar at the top
  if(notification === null) {
    return null
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification