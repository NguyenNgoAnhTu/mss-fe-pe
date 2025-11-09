import { Link, useNavigate } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import './Header.css'

const Header = () => {
  const { user, logout, isAdmin } = useAppContext()
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
          <Link to="/" className="logo">
            MSS BlindBox
          </Link>

          <nav className="nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/blindboxes" className="nav-link">Products</Link>
            {userIsAdmin && (
              <Link to="/admin/dashboard" className="nav-link">Dashboard</Link>
            )}
          </nav>

          <div className="header-actions">
            {user ? (
              <>
                <span className="user-email">{user.email}</span>
                <button onClick={handleLogout} className="btn-logout">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="btn-login">Login</Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
