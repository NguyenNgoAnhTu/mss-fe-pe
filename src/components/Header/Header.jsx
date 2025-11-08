import { Link, useNavigate } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import './Header.css'

const Header = () => {
  const { user, theme, toggleTheme, logout, isAdmin } = useAppContext()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const userIsAdmin = isAdmin()

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <Link to="/">MSS BlindBox</Link>
          </div>

          <nav className="nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/blindboxes" className="nav-link">BlindBoxes</Link>

            {userIsAdmin && (
              <>
                <Link to="/admin/dashboard" className="nav-link admin-link">
                  Admin Dashboard
                </Link>
                <Link to="/admin/brands" className="nav-link admin-link">
                  Brands
                </Link>
              </>
            )}
          </nav>

          <div className="header-actions">
            <button onClick={toggleTheme} className="theme-toggle">
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            {user ? (
              <div className="user-section">
                <span className="user-name">
                  {user.email}
                  {userIsAdmin && <span className="admin-badge">ADMIN</span>}
                </span>
                <button onClick={handleLogout} className="btn-logout">Logout</button>
              </div>
            ) : (
              <Link to="/login" className="nav-link">Login</Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
