import { useState, useEffect } from 'react'
import { brandAPI } from '../../services/api'
import { useAppContext } from '../../context/AppContext'
import './Brands.css'

const Brands = () => {
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingBrand, setEditingBrand] = useState(null)

  const [formData, setFormData] = useState({
    name: '',
    description: ''
  })

  const { addNotification, isAdmin } = useAppContext()

  useEffect(() => {
    loadBrands()
  }, [])

  const loadBrands = async () => {
    try {
      setLoading(true)
      setError('')
      const response = await brandAPI.getAll()

      if (response.success) {
        setBrands(response.data || [])
      } else {
        setError(response.message || 'Failed to load brands')
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to load brands'
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

    try {
      let response
      if (editingBrand) {
        response = await brandAPI.update(editingBrand.brandId, formData)
      } else {
        response = await brandAPI.create(formData)
      }

      if (response.success) {
        addNotification(
          editingBrand ? 'Brand updated successfully!' : 'Brand created successfully!',
          'success'
        )
        setFormData({ name: '', description: '' })
        setShowForm(false)
        setEditingBrand(null)
        loadBrands()
      } else {
        addNotification(response.message || 'Operation failed', 'error')
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Operation failed'
      addNotification(errorMsg, 'error')
    }
  }

  const handleEdit = (brand) => {
    setEditingBrand(brand)
    setFormData({
      name: brand.name,
      description: brand.description || ''
    })
    setShowForm(true)
  }

  const handleDelete = async (brandId) => {
    if (!window.confirm('Are you sure you want to delete this brand?')) {
      return
    }

    try {
      const response = await brandAPI.delete(brandId)

      if (response.success) {
        addNotification('Brand deleted successfully!', 'success')
        loadBrands()
      } else {
        addNotification(response.message || 'Delete failed', 'error')
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to delete brand'
      addNotification(errorMsg, 'error')
    }
  }

  const handleCancel = () => {
    setFormData({ name: '', description: '' })
    setEditingBrand(null)
    setShowForm(false)
  }

  if (loading) {
    return (
      <div className="brands-page">
        <div className="loading">Loading brands...</div>
      </div>
    )
  }

  return (
    <div className="brands-page">
      <div className="brands-header">
        <h1>Brand Management</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary"
        >
          {showForm ? 'Cancel' : '+ Add Brand'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {showForm && (
        <div className="card brand-form-card">
          <h2>{editingBrand ? 'Edit Brand' : 'Create New Brand'}</h2>
          <form onSubmit={handleSubmit} className="brand-form">
            <div className="form-group">
              <label htmlFor="name">Brand Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter brand name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                placeholder="Enter brand description (optional)"
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-submit">
                {editingBrand ? 'Update Brand' : 'Create Brand'}
              </button>
              <button type="button" onClick={handleCancel} className="btn-cancel">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="brands-grid">
        {brands.length === 0 ? (
          <div className="card empty-state">
            <p>No brands found. Create your first brand!</p>
          </div>
        ) : (
          brands.map((brand) => (
            <div key={brand.brandId} className="card brand-card">
              <div className="brand-card-header">
                <h3>{brand.name}</h3>
                <span className="brand-id">ID: {brand.brandId}</span>
              </div>

              <div className="brand-card-body">
                {brand.description ? (
                  <p>{brand.description}</p>
                ) : (
                  <p className="no-description">No description provided</p>
                )}
              </div>

              <div className="brand-card-actions">
                <button
                  onClick={() => handleEdit(brand)}
                  className="btn-edit"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(brand.brandId)}
                  className="btn-delete"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Brands
