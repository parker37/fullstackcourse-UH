const Notification = ({ message, type }) => {
  if (message === null) return null
  if (type !== 'success')
    return console.log('Invalid type:', type);
  
  return (
    <div className={type}>
      {message}
    </div>
  )
}

export default Notification