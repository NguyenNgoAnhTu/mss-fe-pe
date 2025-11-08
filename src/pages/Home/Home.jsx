import { Link } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import './Home.css'

const Home = () => {
  const { user, isAdmin } = useAppContext()
  const userIsAdmin = isAdmin()

  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to MSS BlindBox System</h1>
        <p className="subtitle">
          Manage brands and blind boxes with a powerful microservices backend
        </p>

        {user && (
          <p className="welcome-message">
            Welcome back, {user.email}!
            {userIsAdmin && <span> (Administrator)</span>}
          </p>
        )}

        <div className="cta-buttons">
          <Link to="/blindboxes" className="cta-button primary">
            View BlindBoxes
          </Link>
          {userIsAdmin && (
            <Link to="/admin/dashboard" className="cta-button secondary">
              Admin Dashboard
            </Link>
          )}
        </div>
      </div>

      <div className="features">
        <h2>System Features</h2>
        <div className="grid">
          <div className="card feature-card">
            <h3>🏢 Brand Management</h3>
            <p>Create and manage brands with full CRUD operations</p>
          </div>

          <div className="card feature-card">
            <h3>📦 BlindBox Catalog</h3>
            <p>Browse and manage blind box products</p>
          </div>

          <div className="card feature-card">
            <h3>🔐 JWT Authentication</h3>
            <p>Secure authentication with role-based access control</p>
          </div>

          <div className="card feature-card">
            <h3>⚡ Microservices Backend</h3>
            <p>Spring Boot microservices with API Gateway</p>
          </div>

          <div className="card feature-card">
            <h3>👨‍💼 Admin Dashboard</h3>
            <p>Comprehensive admin tools with real-time stats</p>
          </div>

          <div className="card feature-card">
            <h3>🔔 Real-time Notifications</h3>
            <p>Instant feedback for all operations</p>
          </div>
        </div>
      </div>

      <div className="features">
        <h2>Quick Links</h2>
        <div className="quick-links">
          <Link to="/blindboxes" className="quick-link-card card">
            <div className="quick-link-icon">📦</div>
            <h3>Browse BlindBoxes</h3>
            <p>View all available blind box products</p>
          </Link>

          {userIsAdmin && (
            <>
              <Link to="/admin/brands" className="quick-link-card card">
                <div className="quick-link-icon">🏢</div>
                <h3>Manage Brands</h3>
                <p>Add, edit, or remove brands</p>
              </Link>

              <Link to="/admin/blindboxes" className="quick-link-card card">
                <div className="quick-link-icon">✏️</div>
                <h3>Manage BlindBoxes</h3>
                <p>Create and edit blind box products</p>
              </Link>
            </>
          )}

          <Link to="/about" className="quick-link-card card">
            <div className="quick-link-icon">ℹ️</div>
            <h3>About</h3>
            <p>Learn more about the system</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
