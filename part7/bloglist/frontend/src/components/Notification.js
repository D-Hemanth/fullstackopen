import { useSelector } from 'react-redux'

const Notification = () => {
  // any React component can access the notification stored in the store with the useSelector-hook,the function either searches for or selects data from the react-redux store
  const message = useSelector((state) => state.notification)

  // if initially after loading the page there are no notifications to show i.e notification initialstate is null
  // then don't display the notification display style empty bar at the top
  if (message === null) {
    return null
  }

  return (
    <div id="notificationMessage" className={message.messageColor}>
      {message.notificationMessage}
    </div>
  )
}

export default Notification
