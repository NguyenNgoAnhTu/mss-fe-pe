import { useAppContext } from '../../context/AppContext'
import './Notifications.css'

const Notifications = () => {
  const { notifications, removeNotification } = useAppContext()

  if (notifications.length === 0) return null

  return (
    <div className="notifications-container">
      {notifications.map(notification => (
        <div
          key={notification.id}
          className={`notification notification-${notification.type}`}
        >
          <span>{notification.message}</span>
          <button
            onClick={() => removeNotification(notification.id)}
            className="notification-close"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}

export default Notifications
