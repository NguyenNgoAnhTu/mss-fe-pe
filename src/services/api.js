import axios from 'axios'

// Create axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor - Add JWT token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor - Handle errors globally
api.interceptors.response.use(
  (response) => {
    // For MSS backend, return the full response to access success/message/data
    return response.data
  },
  (error) => {
    // Handle 401 Unauthorized - redirect to login
    if (error.response?.status === 401) {
      localStorage.removeItem('jwt_token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }

    // Handle errors globally
    const message = error.response?.data?.message || error.message
    console.error('API Error:', message)
    return Promise.reject(error)
  }
)

// Authentication API
export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password })
}

// Brand API
export const brandAPI = {
  getAll: () => api.get('/brands/all'),
  getNameById: (id) => api.get(`/brands/name?id=${id}`),
  create: (data) => api.post('/brands/create', data),
  update: (id, data) => api.put(`/brands/update/${id}`, data),
  delete: (id) => api.delete(`/brands/delete/${id}`)
}

// BlindBox API
export const blindBoxAPI = {
  getAll: () => api.get('/blindboxes/all'),
  getCategories: () => api.get('/blindboxes/categories'),
  create: (data) => api.post('/blindboxes/create', data),
  update: (id, data) => api.put(`/blindboxes/update/${id}`, data),
  delete: (id) => api.delete(`/blindboxes/delete/${id}`)
}

export default api
