# Quick Start Guide

## Installation & Running

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit: `http://localhost:3000`

## Quick Overview

### Application Flow
```
index.html → main.jsx → App.jsx → Routes → Pages
                ↓
           AppContext (Global State)
                ↓
         Layout (Header + Footer)
```

### File Structure Quick Reference

```
src/
├── main.jsx              # START HERE: Entry point
├── App.jsx               # Main app with routing
├── context/
│   └── AppContext.jsx    # Global state (user, theme, notifications)
├── components/
│   ├── Header/           # Navigation bar
│   ├── Footer/           # Page footer
│   ├── Layout/           # Page wrapper
│   └── Notifications/    # Toast messages
├── pages/
│   ├── Home/             # Landing page
│   ├── About/            # Info about the app
│   ├── Dashboard/        # API demo (fetch users)
│   ├── UserForm/         # Form validation demo
│   └── NotFound/         # 404 page
├── hooks/
│   ├── useFetch.js       # API data fetching
│   ├── useForm.js        # Form handling
│   └── useLocalStorage.js # localStorage sync
└── services/
    └── api.js            # Axios API setup
```

## What Each Page Does

### Home (`/`)
- Shows app features
- Demo notification button
- Displays welcome message

### About (`/about`)
- Explains the project
- Lists technologies used
- Shows architecture

### Dashboard (`/dashboard`)
- Fetches users from API
- Displays in cards
- Shows loading states
- Error handling

### User Form (`/user-form`)
- Form with validation
- Real-time error messages
- Uses custom useForm hook
- Saves to Context (login)

## Key Concepts

### 1. Context API (Global State)
Located in: `src/context/AppContext.jsx`

Provides:
- `user` - Current user data
- `login(userData)` - Set user
- `logout()` - Clear user
- `theme` - Current theme (dark/light)
- `toggleTheme()` - Switch theme
- `notifications` - Array of toast messages
- `addNotification(message, type)` - Show toast

Usage in any component:
```javascript
import { useAppContext } from '../context/AppContext'

function MyComponent() {
  const { user, login, addNotification } = useAppContext()

  const handleLogin = () => {
    login({ name: 'John' })
    addNotification('Logged in!', 'success')
  }
}
```

### 2. Custom Hooks

**useFetch** - Fetch data from API
```javascript
const { data, loading, error, refetch } = useFetch(url)
```

**useForm** - Handle forms with validation
```javascript
const { values, errors, handleChange, handleSubmit } =
  useForm(initialValues, validate)
```

**useLocalStorage** - Sync state with localStorage
```javascript
const [value, setValue] = useLocalStorage('key', defaultValue)
```

### 3. API Service
Located in: `src/services/api.js`

```javascript
import { userAPI } from './services/api'

// Get all users
const users = await userAPI.getUsers()

// Get one user
const user = await userAPI.getUser(1)

// Create user
const newUser = await userAPI.createUser(data)
```

### 4. Routing
Defined in: `src/App.jsx`

```javascript
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/user-form" element={<UserForm />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

Navigate programmatically:
```javascript
import { useNavigate } from 'react-router-dom'

const navigate = useNavigate()
navigate('/dashboard')
```

## Common Tasks

### Add a New Page

1. Create page component:
```javascript
// src/pages/MyPage/MyPage.jsx
function MyPage() {
  return <div><h1>My Page</h1></div>
}
export default MyPage
```

2. Add route in `App.jsx`:
```javascript
import MyPage from './pages/MyPage/MyPage'

<Route path="/my-page" element={<MyPage />} />
```

3. Add navigation link in `Header.jsx`:
```javascript
<Link to="/my-page" className="nav-link">My Page</Link>
```

### Fetch Data from API

```javascript
import { useState, useEffect } from 'react'
import { userAPI } from '../services/api'

function MyComponent() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await userAPI.getUsers()
        setData(result)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return <div>Loading...</div>
  return <div>{/* Display data */}</div>
}
```

### Create a Form with Validation

```javascript
import { useForm } from '../hooks/useForm'

function MyForm() {
  const initialValues = { name: '', email: '' }

  const validate = (values) => {
    const errors = {}
    if (!values.name) errors.name = 'Required'
    if (!values.email) errors.email = 'Required'
    return errors
  }

  const onSubmit = (values) => {
    console.log('Form submitted:', values)
  }

  const { values, errors, handleChange, handleSubmit } =
    useForm(initialValues, validate)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name="name" value={values.name} onChange={handleChange} />
      {errors.name && <span>{errors.name}</span>}

      <input name="email" value={values.email} onChange={handleChange} />
      {errors.email && <span>{errors.email}</span>}

      <button type="submit">Submit</button>
    </form>
  )
}
```

### Show a Notification

```javascript
import { useAppContext } from '../context/AppContext'

function MyComponent() {
  const { addNotification } = useAppContext()

  const handleClick = () => {
    addNotification('Success!', 'success')
    // Types: 'success', 'error', 'info'
  }

  return <button onClick={handleClick}>Show Notification</button>
}
```

## Data Flow Example

User clicks "Load Data" button:
```
1. Button onClick → handleClick()
2. handleClick() → setLoading(true)
3. Component re-renders with loading=true
4. API call → await userAPI.getUsers()
5. Response received → setData(response)
6. setLoading(false)
7. Component re-renders with data
8. Data displayed on screen
```

## React Hooks Used

- `useState` - Component state
- `useEffect` - Side effects (API calls, subscriptions)
- `useContext` - Access global state
- `useNavigate` - Programmatic navigation
- Custom hooks - Reusable logic

## Debugging Tips

1. Check React DevTools (Chrome extension)
2. Check Console for errors
3. Check Network tab for API calls
4. Use console.log() to debug state
5. Check localStorage in Application tab

## Next Steps

1. Read [REACT_FLOW_GUIDE.md](REACT_FLOW_GUIDE.md) for detailed explanations
2. Explore the code in `src/` folder
3. Modify existing components
4. Create your own pages
5. Add more API endpoints
6. Customize styling

## Troubleshooting

**App won't start:**
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

**Port 3000 already in use:**
Change port in `vite.config.js`:
```javascript
server: {
  port: 3001
}
```

**API calls failing:**
- Check internet connection
- Check browser console for CORS errors
- API endpoint: https://jsonplaceholder.typicode.com

## Resources

- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [React Router Docs](https://reactrouter.com)
- [Axios Docs](https://axios-http.com)
