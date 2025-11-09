import { useState, useEffect } from 'react'
import { blindBoxAPI, brandAPI } from '../../services/api'
import { useAppContext } from '../../context/AppContext'
import './BlindBoxes.css'

const BlindBoxes = () => {
  const [blindBoxes, setBlindBoxes] = useState([])
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingBox, setEditingBox] = useState(null)

  const [formData, setFormData] = useState({
    name: '',
    categoryId: '',
    brandId: '',
    price: '',
    stock: '',
    releaseDate: ''
  })

  const { addNotification, isAdmin } = useAppContext()
  const canManage = isAdmin()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      setError('')

      const [boxesRes, catsRes, brandsRes] = await Promise.all([
        blindBoxAPI.getAll(),
        blindBoxAPI.getCategories(),
        brandAPI.getAll()
      ])

      if (boxesRes.success) {
        // Sort by blindBoxId ascending (smallest to largest, oldest to newest)
        const sortedBoxes = (boxesRes.data || []).sort((a, b) => a.blindBoxId - b.blindBoxId)
        setBlindBoxes(sortedBoxes)
      }

      if (catsRes.success) {
        setCategories(catsRes.data || [])
      }

      if (brandsRes.success) {
        setBrands(brandsRes.data || [])
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to load data'
      setError(errorMsg)
      addNotification(errorMsg, 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate form
    if (!formData.name || formData.name.length < 10) {
      addNotification('Name must be at least 10 characters long', 'error')
      return
    }

    if (!formData.categoryId || !formData.brandId) {
      addNotification('Please select category and brand', 'error')
      return
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      addNotification('Price must be greater than 0', 'error')
      return
    }

    if (!formData.stock || parseInt(formData.stock) < 1 || parseInt(formData.stock) > 100) {
      addNotification('Stock must be between 1 and 100', 'error')
      return
    }

    if (!formData.releaseDate) {
      addNotification('Release date is required', 'error')
      return
    }

    try {
      const payload = {
        name: formData.name,
        categoryId: parseInt(formData.categoryId),
        brandId: parseInt(formData.brandId),
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        releaseDate: formData.releaseDate
      }

      let response
      if (editingBox) {
        response = await blindBoxAPI.update(editingBox.blindBoxId, payload)
      } else {
        response = await blindBoxAPI.create(payload)
      }

      if (response.success) {
        addNotification(
          editingBox ? 'BlindBox updated successfully!' : 'BlindBox created successfully!',
          'success'
        )
        resetForm()
        loadData()
      } else {
        addNotification(response.message || 'Operation failed', 'error')
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Operation failed'
      addNotification(errorMsg, 'error')
    }
  }

  const handleEdit = (box) => {
    setEditingBox(box)

    // Find the category and brand IDs by matching names
    // Note: both categories and brands use 'categoryName' and 'brandName' properties
    const category = categories.find(c => c.categoryName === box.categoryName)
    const brand = brands.find(b => b.brandName === box.brandName)

    setFormData({
      name: box.name,
      categoryId: category ? category.categoryId.toString() : '',
      brandId: brand ? brand.brandId.toString() : '',
      price: box.price.toString(),
      stock: box.stock.toString(),
      releaseDate: box.releaseDate
    })
    setShowForm(true)
  }

  const handleDelete = async (blindBoxId) => {
    if (!window.confirm('Are you sure you want to delete this blind box?')) {
      return
    }

    try {
      const response = await blindBoxAPI.delete(blindBoxId)

      if (response.success) {
        addNotification('BlindBox deleted successfully!', 'success')
        loadData()
      } else {
        addNotification(response.message || 'Delete failed', 'error')
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to delete blind box'
      addNotification(errorMsg, 'error')
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      categoryId: '',
      brandId: '',
      price: '',
      stock: '',
      releaseDate: ''
    })
    setEditingBox(null)
    setShowForm(false)
  }

  if (loading) {
    return (
      <div className="blindboxes-page">
        <div className="loading">Loading blind boxes...</div>
      </div>
    )
  }

  return (
    <div className="blindboxes-page">
      <div className="blindboxes-header">
        <h1>BlindBox Management</h1>
        {canManage && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-primary"
          >
            {showForm ? 'Cancel' : '+ Add BlindBox'}
          </button>
        )}
      </div>

      {!canManage && (
        <div className="info-message">
          You are viewing as a regular user. Only admins can create, edit, or delete blind boxes.
        </div>
      )}

      {error && <div className="error-message">{error}</div>}

      {showForm && canManage && (
        <div className="card blindbox-form-card">
          <h2>{editingBox ? 'Edit BlindBox' : 'Create New BlindBox'}</h2>
          <form onSubmit={handleSubmit} className="blindbox-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name * (min 10 characters)</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  minLength={10}
                  placeholder="Mystery Box Collection Series 1"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="categoryId">Category *</label>
                <select
                  id="categoryId"
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat.categoryId} value={cat.categoryId}>
                      {cat.categoryName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="brandId">Brand *</label>
                <select
                  id="brandId"
                  name="brandId"
                  value={formData.brandId}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Brand</option>
                  {brands.map(brand => (
                    <option key={brand.brandId} value={brand.brandId}>
                      {brand.brandName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="price">Price ($) *</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  min="0.01"
                  step="0.01"
                  placeholder="29.99"
                />
              </div>

              <div className="form-group">
                <label htmlFor="stock">Stock * (1-100)</label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  required
                  min="1"
                  max="100"
                  placeholder="50"
                />
              </div>

              <div className="form-group">
                <label htmlFor="releaseDate">Release Date *</label>
                <input
                  type="date"
                  id="releaseDate"
                  name="releaseDate"
                  value={formData.releaseDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-submit">
                {editingBox ? 'Update BlindBox' : 'Create BlindBox'}
              </button>
              <button type="button" onClick={resetForm} className="btn-cancel">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="blindboxes-grid">
        {blindBoxes.length === 0 ? (
          <div className="card empty-state">
            <p>No blind boxes found. {canManage && 'Create your first blind box!'}</p>
          </div>
        ) : (
          blindBoxes.map((box) => (
            <div key={box.blindBoxId} className="card blindbox-card">
              <div className="blindbox-card-header">
                <h3>{box.name}</h3>
              </div>

              <div className="blindbox-card-body">
                <div className="info-row">
                  <span className="label">Brand:</span>
                  <span className="value">{box.brandName}</span>
                </div>
                <div className="info-row">
                  <span className="label">Category:</span>
                  <span className="value">{box.categoryName}</span>
                </div>
                <div className="info-row">
                  <span className="label">Price:</span>
                  <span className="value price">${box.price.toFixed(2)}</span>
                </div>
                <div className="info-row">
                  <span className="label">Stock:</span>
                  <span className={`value stock ${box.stock < 10 ? 'low' : ''}`}>
                    {box.stock} units
                  </span>
                </div>
                <div className="info-row">
                  <span className="label">Release:</span>
                  <span className="value">{box.releaseDate}</span>
                </div>
              </div>

              {canManage && (
                <div className="blindbox-card-actions">
                  <button
                    onClick={() => handleEdit(box)}
                    className="btn-edit"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(box.blindBoxId)}
                    className="btn-delete"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default BlindBoxes
