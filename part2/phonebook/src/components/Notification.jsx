const Notification = ( { notification }) => {
    if (notification === null) {
      return null
    }

    const {message, type} = notification

    let notificationType;

    if (type === 'error') {
        notificationType = 'error';
    } else if (type === 'success') {
        notificationType = 'success';
    } else {
        notificationType = 'success'; // Default case
    }
  
    return (
      <div className={notificationType}>
        {message}
      </div>
    )
  }

  export default Notification