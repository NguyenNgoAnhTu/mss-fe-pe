import { useState } from 'react'

/**
 * Custom hook for managing form state and validation
 * @param {object} initialValues - Initial form values
 * @param {function} validate - Validation function
 * @returns {object} - { values, errors, handleChange, handleSubmit, resetForm }
 */
export const useForm = (initialValues, validate) => {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues(prev => ({
      ...prev,
      [name]: value
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched(prev => ({
      ...prev,
      [name]: true
    }))

    // Validate on blur if validation function is provided
    if (validate) {
      const validationErrors = validate(values)
      if (validationErrors[name]) {
        setErrors(prev => ({
          ...prev,
          [name]: validationErrors[name]
        }))
      }
    }
  }

  const handleSubmit = (callback) => (e) => {
    e.preventDefault()

    // Mark all fields as touched
    const allTouched = Object.keys(values).reduce((acc, key) => {
      acc[key] = true
      return acc
    }, {})
    setTouched(allTouched)

    // Validate all fields
    if (validate) {
      const validationErrors = validate(values)
      setErrors(validationErrors)

      // Only submit if no errors
      if (Object.keys(validationErrors).length === 0) {
        callback(values)
      }
    } else {
      callback(values)
    }
  }

  const resetForm = () => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
  }

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm
  }
}
