const Notification = ({ notificationMessage, messageColor }) => {
  if(notificationMessage === null) {
    return null
  }

  return (
    <div className={messageColor}>
      {notificationMessage}
    </div>
  )
}

export default Notification