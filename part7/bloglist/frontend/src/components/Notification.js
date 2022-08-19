const Notification = ({ notificationMessage, messageColor }) => {
  if (notificationMessage === null) {
    return null
  }

  return (
    <div id="notificationMessage" className={messageColor}>
      {notificationMessage}
    </div>
  )
}

export default Notification
