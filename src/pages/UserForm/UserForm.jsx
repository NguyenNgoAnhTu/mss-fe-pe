import { useForm } from '../../hooks/useForm'
import { useAppContext } from '../../context/AppContext'
import { useNavigate } from 'react-router-dom'
import './UserForm.css'

const UserForm = () => {
  const { login, addNotification } = useAppContext()
  const navigate = useNavigate()

  const initialValues = {
    name: '',
    email: '',
    username: '',
    bio: ''
  }

  const validate = (values) => {
    const errors = {}

    if (!values.name.trim()) {
      errors.name = 'Name is required'
    } else if (values.name.length < 3) {
      errors.name = 'Name must be at least 3 characters'
    }

    if (!values.email.trim()) {
      errors.email = 'Email is required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address'
    }

    if (!values.username.trim()) {
      errors.username = 'Username is required'
    } else if (values.username.length < 3) {
      errors.username = 'Username must be at least 3 characters'
    }

    return errors
  }

  const onSubmit = (values) => {
    // Simulate login with form data
    login(values)
    addNotification('Profile saved successfully!', 'success')
    navigate('/')
  }

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm
  } = useForm(initialValues, validate)

  return (
    <div className="user-form-page">
      <h1>User Profile Form</h1>

      <div className="card">
        <p className="form-description">
          This form demonstrates the custom useForm hook with validation.
          Fill out the form to update your profile.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="user-form">
          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your name"
            />
            {touched.name && errors.name && (
              <span className="error">{errors.name}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your email"
            />
            {touched.email && errors.email && (
              <span className="error">{errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="username">Username *</label>
            <input
              type="text"
              id="username"
              name="username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your username"
            />
            {touched.username && errors.username && (
              <span className="error">{errors.username}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              name="bio"
              value={values.bio}
              onChange={handleChange}
              onBlur={handleBlur}
              rows="4"
              placeholder="Tell us about yourself (optional)"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-submit">
              Save Profile
            </button>
            <button type="button" onClick={resetForm} className="btn-reset">
              Reset
            </button>
          </div>
        </form>
      </div>

      <div className="card">
        <h3>Current Form Values:</h3>
        <pre className="form-values">{JSON.stringify(values, null, 2)}</pre>
      </div>
    </div>
  )
}

export default UserForm
