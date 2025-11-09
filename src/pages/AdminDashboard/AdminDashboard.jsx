import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { blindBoxAPI, brandAPI } from '../../services/api'
import { useAppContext } from '../../context/AppContext'
import './AdminDashboard.css'

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalBrands: 0,
    totalBlindBoxes: 0,
    totalStock: 0,
    lowStockItems: 0
  })
  const [recentBoxes, setRecentBoxes] = useState([])
  const [loading, setLoading] = useState(true)

  const { user, addNotification } = useAppContext()

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)

      const [brandsRes, boxesRes] = await Promise.all([
        brandAPI.getAll(),
        blindBoxAPI.getAll()
      ])

      if (brandsRes.success && boxesRes.success) {
        const brands = brandsRes.data || []
        const boxes = boxesRes.data || []

        // Calculate stats
        const totalStock = boxes.reduce((sum, box) => sum + box.stock, 0)
        const lowStockItems = boxes.filter(box => box.stock < 10).length

        setStats({
          totalBrands: brands.length,
          totalBlindBoxes: boxes.length,
          totalStock,
          lowStockItems
        })

        // Get recent boxes (last 5)
        setRecentBoxes(boxes.slice(0, 5))
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to load dashboard data'
      addNotification(errorMsg, 'error')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading">Loading dashboard...</div>
      </div>
    )
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Welcome back, {user?.email}</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            🏢
          </div>
          <div className="stat-info">
            <h3>Total Brands</h3>
            <p className="stat-value">{stats.totalBrands}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
            📦
          </div>
          <div className="stat-info">
            <h3>Total BlindBoxes</h3>
            <p className="stat-value">{stats.totalBlindBoxes}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
            📊
          </div>
          <div className="stat-info">
            <h3>Total Stock</h3>
            <p className="stat-value">{stats.totalStock}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}>
            ⚠️
          </div>
          <div className="stat-info">
            <h3>Low Stock Items</h3>
            <p className="stat-value">{stats.lowStockItems}</p>
          </div>
        </div>
      </div>

      <div className="dashboard-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <Link to="/admin/blindboxes" className="action-card">
            <div className="action-icon">📦</div>
            <h3>Manage Products</h3>
            <p>Create, edit, and delete blind boxes</p>
          </Link>

          <Link to="/blindboxes" className="action-card">
            <div className="action-icon">👁️</div>
            <h3>View Catalog</h3>
            <p>See the customer view</p>
          </Link>
        </div>
      </div>

      {recentBoxes.length > 0 && (
        <div className="recent-items">
          <h2>Recent BlindBoxes</h2>
          <div className="table-container">
            <table className="recent-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Brand</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Release Date</th>
                </tr>
              </thead>
              <tbody>
                {recentBoxes.map((box) => (
                  <tr key={box.blindBoxId}>
                    <td>{box.blindBoxId}</td>
                    <td className="name-cell">{box.name}</td>
                    <td>{box.brandName}</td>
                    <td>{box.categoryName}</td>
                    <td className="price-cell">${box.price.toFixed(2)}</td>
                    <td>
                      <span className={`stock-badge ${box.stock < 10 ? 'low' : ''}`}>
                        {box.stock}
                      </span>
                    </td>
                    <td>{box.releaseDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
