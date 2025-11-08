import { createContext, useContext, useState, useEffect } from 'react'

// Create the context
const AppContext = createContext(undefined)

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}

// Provider component
export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [theme, setTheme] = useState('dark')
  const [notifications, setNotifications] = useState([])

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }

    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
  }, [user])

  // Save theme to localStorage
  useEffect(() => {
    localStorage.setItem('theme', theme)
  }, [theme])

  // Login function
  const login = (userData) => {
    setUser(userData)
    addNotification('Successfully logged in!', 'success')
  }

  // Logout function
  const logout = () => {
    setUser(null)
    localStorage.removeItem('jwt_token')
    localStorage.removeItem('user')
    addNotification('Successfully logged out!', 'info')
  }

  // Check if user is admin
  const isAdmin = () => {
    return user?.role === 1
  }

  // Check if authenticated
  const isAuthenticated = () => {
    return !!localStorage.getItem('jwt_token') && !!user
  }

  // Toggle theme
  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  // Add notification
  const addNotification = (message, type = 'info') => {
    const id = Date.now()
    setNotifications(prev => [...prev, { id, message, type }])

    // Auto remove after 3 seconds
    setTimeout(() => {
      removeNotification(id)
    }, 3000)
  }

  // Remove notification
  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id))
  }

  const value = {
    user,
    theme,
    notifications,
    login,
    logout,
    isAdmin,
    isAuthenticated,
    toggleTheme,
    addNotification,
    removeNotification
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
