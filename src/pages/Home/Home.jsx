import { Link } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import './Home.css'

const Home = () => {
  const { user, isAdmin } = useAppContext()
  const userIsAdmin = isAdmin()

  return (
    <div className="home">
      <div className="hero">
        <h1>MSS BlindBox System</h1>
        <p className="subtitle">Brand & Product Management Platform</p>

        {user && (
          <p className="welcome-message">
            Welcome, <strong>{user.email}</strong>
            {userIsAdmin && <span className="role-badge">Admin</span>}
          </p>
        )}

        <div className="actions">
          <Link to="/blindboxes" className="btn btn-primary">
            View Products
          </Link>
          {userIsAdmin && (
            <Link to="/admin/dashboard" className="btn btn-secondary">
              Dashboard
            </Link>
          )}
        </div>
      </div>

      <div className="quick-access">
        <Link to="/blindboxes" className="access-card">
          <span className="icon">📦</span>
          <h3>Products</h3>
          <p>Browse catalog</p>
        </Link>

        {userIsAdmin && (
          <Link to="/admin/dashboard" className="access-card">
            <span className="icon">📊</span>
            <h3>Dashboard</h3>
            <p>Admin panel</p>
          </Link>
        )}

        <Link to="/about" className="access-card">
          <span className="icon">ℹ️</span>
          <h3>About</h3>
          <p>System info</p>
        </Link>
      </div>
    </div>
  )
}

export default Home
