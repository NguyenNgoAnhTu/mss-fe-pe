import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Layout from './components/Layout/Layout'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Login from './pages/Login/Login'
import Brands from './pages/Brands/Brands'
import BlindBoxes from './pages/BlindBoxes/BlindBoxes'
import AdminDashboard from './pages/AdminDashboard/AdminDashboard'
import NotFound from './pages/NotFound/NotFound'
import './App.css'

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          {/* Public routes - No Layout */}
          <Route path="/login" element={<Login />} />

          {/* Protected routes with Layout */}
          <Route path="/" element={
            <ProtectedRoute>
              <Layout>
                <Home />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/about" element={
            <ProtectedRoute>
              <Layout>
                <About />
              </Layout>
            </ProtectedRoute>
          } />

          {/* BlindBoxes - accessible to all logged in users */}
          <Route path="/blindboxes" element={
            <ProtectedRoute>
              <Layout>
                <BlindBoxes />
              </Layout>
            </ProtectedRoute>
          } />

          {/* Admin only routes */}
          <Route path="/admin/dashboard" element={
            <ProtectedRoute adminOnly={true}>
              <Layout>
                <AdminDashboard />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/admin/brands" element={
            <ProtectedRoute adminOnly={true}>
              <Layout>
                <Brands />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/admin/blindboxes" element={
            <ProtectedRoute adminOnly={true}>
              <Layout>
                <BlindBoxes />
              </Layout>
            </ProtectedRoute>
          } />

          {/* Legacy redirects */}
          <Route path="/dashboard" element={<Navigate to="/blindboxes" replace />} />
          <Route path="/user-form" element={<Navigate to="/about" replace />} />

          {/* 404 */}
          <Route path="*" element={
            <Layout>
              <NotFound />
            </Layout>
          } />
        </Routes>
      </Router>
    </AppProvider>
  )
}

export default App
