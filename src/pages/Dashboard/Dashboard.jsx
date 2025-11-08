import { useState, useEffect } from 'react'
import { userAPI } from '../../services/api'
import { useAppContext } from '../../context/AppContext'
import './Dashboard.css'

const Dashboard = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { addNotification } = useAppContext()

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    setLoading(true)
    setError(null)

    try {
      const data = await userAPI.getUsers()
      // Only show first 6 users
      setUsers(data.slice(0, 6))
      addNotification('Users loaded successfully!', 'success')
    } catch (err) {
      setError(err.message)
      addNotification('Failed to load users', 'error')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="dashboard">
        <h1>Dashboard</h1>
        <div className="loading">Loading users...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="dashboard">
        <h1>Dashboard</h1>
        <div className="card">
          <p className="error">Error: {error}</p>
          <button onClick={fetchUsers}>Retry</button>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <button onClick={fetchUsers}>Refresh</button>
      </div>

      <div className="card">
        <h2>API Integration Example</h2>
        <p>
          This page demonstrates fetching data from an external API using our
          custom service layer. Data is fetched from JSONPlaceholder API.
        </p>
      </div>

      <h2>Users ({users.length})</h2>
      <div className="grid">
        {users.map(user => (
          <div key={user.id} className="card user-card">
            <h3>{user.name}</h3>
            <p className="user-detail">
              <strong>Username:</strong> {user.username}
            </p>
            <p className="user-detail">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="user-detail">
              <strong>Phone:</strong> {user.phone}
            </p>
            <p className="user-detail">
              <strong>Website:</strong> {user.website}
            </p>
            <p className="user-detail">
              <strong>Company:</strong> {user.company.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
