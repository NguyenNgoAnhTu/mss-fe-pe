import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import { authAPI } from '../../services/api'
import './Login.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { login, addNotification } = useAppContext()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await authAPI.login(email, password)

      if (response.success && response.data) {
        // Store JWT token
        localStorage.setItem('jwt_token', response.data.token)

        // Store user info
        const userData = {
          id: response.data.accountId,
          email: response.data.email,
          role: response.data.role
        }

        login(userData)

        // Redirect based on role
        if (response.data.role === 1) {
          navigate('/admin/dashboard')
        } else {
          navigate('/dashboard')
        }
      } else {
        setError(response.message || 'Login failed')
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed. Please check your credentials.'
      setError(errorMessage)
      addNotification(errorMessage, 'error')
    } finally {
      setLoading(false)
    }
  }

  // Demo credentials info
  const demoCredentials = [
    { role: 'Admin', email: 'admin@example.com', password: 'admin123' },
    { role: 'User', email: 'user@example.com', password: 'user123' }
  ]

  const fillDemoCredentials = (cred) => {
    setEmail(cred.email)
    setPassword(cred.password)
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>MSS BlindBox System</h1>
          <p>Login to manage brands and blind boxes</p>
        </div>

        {error && (
          <div className="error-message">
            <span>⚠️ {error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              disabled={loading}
            />
          </div>

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

    

      
      </div>
    </div>
  )
}

export default Login
