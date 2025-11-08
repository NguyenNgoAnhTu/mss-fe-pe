import { Navigate } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, isAdmin } = useAppContext()

  // Check if user is authenticated
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />
  }

  // Check if admin access is required
  if (adminOnly && !isAdmin()) {
    return (
      <div className="unauthorized-page">
        <div className="card" style={{ maxWidth: '600px', margin: '4rem auto', textAlign: 'center' }}>
          <h1>⛔ Access Denied</h1>
          <p style={{ margin: '1.5rem 0' }}>
            You need administrator privileges to access this page.
          </p>
          <button onClick={() => window.history.back()} style={{ marginTop: '1rem' }}>
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return children
}

export default ProtectedRoute
