# React Application Flow Diagrams

## 1. Application Startup Flow

```
┌──────────────────────────────────────────────────────────────┐
│                     Browser loads URL                         │
└─────────────────────────┬────────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────────────┐
│                   index.html loads                            │
│  - Creates <div id="root"></div>                             │
│  - Loads <script src="/src/main.jsx">                        │
└─────────────────────────┬────────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────────────┐
│                    main.jsx executes                          │
│  - Imports React, ReactDOM                                    │
│  - Creates root: ReactDOM.createRoot()                        │
│  - Renders <App /> in <React.StrictMode>                     │
└─────────────────────────┬────────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────────────┐
│                     App.jsx renders                           │
│  - Wraps with <AppProvider> (Context)                        │
│  - Wraps with <Router> (React Router)                        │
│  - Wraps with <Layout> (Header/Footer)                       │
│  - Defines <Routes>                                           │
└─────────────────────────┬────────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────────────┐
│                 AppContext initializes                        │
│  - Creates state: user, theme, notifications                 │
│  - Loads from localStorage                                    │
│  - Provides methods: login, logout, toggleTheme              │
└─────────────────────────┬────────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────────────┐
│                   Router initializes                          │
│  - Reads current URL path                                     │
│  - Matches path to Route                                      │
└─────────────────────────┬────────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────────────┐
│                    Layout renders                             │
│  - Renders <Header />                                         │
│  - Renders <Notifications />                                  │
│  - Renders children (page content)                            │
│  - Renders <Footer />                                         │
└─────────────────────────┬────────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────────────┐
│              Matched Page Component renders                   │
│  (Home, About, Dashboard, UserForm, or NotFound)             │
└─────────────────────────┬────────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────────────┐
│                  Page useEffect runs                          │
│  - Fetch data if needed                                       │
│  - Set up subscriptions                                       │
└─────────────────────────┬────────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────────────┐
│                  User sees the page!                          │
└──────────────────────────────────────────────────────────────┘
```

## 2. Component Lifecycle with Hooks

```
┌──────────────────────────────────────────────────────────────┐
│                  Component Function Called                    │
└─────────────────────────┬────────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────────────┐
│                  useState hooks execute                       │
│  const [state, setState] = useState(initial)                 │
│  - Returns current state value                               │
└─────────────────────────┬────────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────────────┐
│                  useContext hooks execute                     │
│  const context = useContext(AppContext)                      │
│  - Gets value from nearest Provider                          │
└─────────────────────────┬────────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────────────┐
│                  Custom hooks execute                         │
│  const { data } = useFetch(url)                              │
│  - Internally use useState, useEffect                        │
└─────────────────────────┬────────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────────────┐
│                    JSX is returned                            │
│  return <div>...</div>                                       │
└─────────────────────────┬────────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────────────┐
│              React creates Virtual DOM                        │
└─────────────────────────┬────────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────────────┐
│          React commits to Real DOM (first render)            │
└─────────────────────────┬────────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────────────┐
│                  useEffect hooks run                          │
│  useEffect(() => { ... }, [deps])                            │
│  - Run after component is painted                            │
└─────────────────────────┬────────────────────────────────────┘
                          │
           ┌──────────────┴──────────────┐
           │                             │
           ▼                             ▼
┌────────────────────┐        ┌────────────────────┐
│  State changes     │        │  Props change      │
│  setState(value)   │        │  from parent       │
└─────────┬──────────┘        └─────────┬──────────┘
          │                             │
          └──────────────┬──────────────┘
                         │
                         ▼
           ┌──────────────────────────┐
           │   Component Re-renders    │
           │   (function runs again)   │
           └──────────┬────────────────┘
                      │
                      ▼
           ┌──────────────────────────┐
           │  New Virtual DOM created  │
           └──────────┬────────────────┘
                      │
                      ▼
           ┌──────────────────────────┐
           │   Diffing Algorithm       │
           │   (old vs new)            │
           └──────────┬────────────────┘
                      │
                      ▼
           ┌──────────────────────────┐
           │   Update Real DOM         │
           │   (only changes)          │
           └──────────┬────────────────┘
                      │
                      ▼
           ┌──────────────────────────┐
           │  useEffect runs again     │
           │  (if dependencies changed)│
           └───────────────────────────┘
```

## 3. State Update Flow

```
User clicks button
       │
       ▼
┌──────────────────┐
│  onClick handler │
│    executes      │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  setState(value) │
│    is called     │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│   React schedules│
│    a re-render   │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Component       │
│  function runs   │
│  with new state  │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  New Virtual DOM │
│  is created      │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  React compares  │
│  old vs new DOM  │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Real DOM is     │
│  updated         │
│  (only changes)  │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  User sees       │
│  updated UI      │
└──────────────────┘
```

## 4. API Data Fetching Flow (Dashboard Example)

```
Dashboard component mounts
       │
       ▼
┌──────────────────────────────┐
│  useEffect(() => {}, [])     │
│  runs (empty deps = once)    │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│  setLoading(true)            │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│  Component re-renders        │
│  Shows "Loading..."          │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│  await userAPI.getUsers()    │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│  Service layer (api.js)      │
│  api.get('/users')           │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│  Request Interceptor         │
│  - Adds auth token           │
│  - Logs request              │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│  Axios makes HTTP request    │
│  to jsonplaceholder.com      │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│  Server responds             │
│  with JSON data              │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│  Response Interceptor        │
│  - Extracts data             │
│  - Handles errors            │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│  Promise resolves            │
│  data = response             │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│  setUsers(data)              │
│  setLoading(false)           │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│  Component re-renders        │
│  with user data              │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│  User sees data in cards     │
└──────────────────────────────┘
```

## 5. Routing Flow (Navigation)

```
User clicks <Link to="/about">
       │
       ▼
┌──────────────────────────────┐
│  React Router intercepts     │
│  (prevents page reload)      │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│  Browser URL updates         │
│  window.history.pushState    │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│  Router detects URL change   │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│  Matches URL to Route        │
│  <Route path="/about" ...>   │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│  Old component unmounts      │
│  (cleanup functions run)     │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│  New component mounts        │
│  (<About /> in this case)    │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│  Layout stays the same       │
│  (Header/Footer persist)     │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│  New page content renders    │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│  User sees new page          │
│  (no page reload!)           │
└──────────────────────────────┘
```

## 6. Form Handling Flow (UserForm)

```
User types in input field
       │
       ▼
┌──────────────────────────────┐
│  onChange event fires        │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│  handleChange(e) called      │
│  gets: name, value           │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│  setValues({                 │
│    ...values,                │
│    [name]: value             │
│  })                          │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│  Component re-renders        │
│  Input shows new value       │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│  User fills all fields       │
│  and clicks Submit           │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│  onSubmit event fires        │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│  e.preventDefault()          │
│  (stops page reload)         │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│  handleSubmit runs           │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│  validate(values) called     │
└──────────┬───────────────────┘
           │
           ▼
      ┌────┴────┐
      │  Errors? │
      └────┬────┘
           │
    ┌──────┴──────┐
    │             │
   Yes           No
    │             │
    ▼             ▼
┌─────────┐  ┌──────────┐
│ Show    │  │ Call     │
│ errors  │  │ onSubmit │
└─────────┘  └────┬─────┘
                  │
                  ▼
          ┌──────────────┐
          │ login(values)│
          │ (Context API)│
          └──────┬───────┘
                 │
                 ▼
          ┌──────────────┐
          │ setUser(...) │
          │ in Context   │
          └──────┬───────┘
                 │
                 ▼
          ┌──────────────┐
          │ All consumers│
          │ re-render    │
          │ (Header, etc)│
          └──────┬───────┘
                 │
                 ▼
          ┌──────────────┐
          │ navigate('/') │
          └──────┬───────┘
                 │
                 ▼
          ┌──────────────┐
          │ User redirects│
          │ to Home page │
          └──────────────┘
```

## 7. Context API Flow

```
┌──────────────────────────────────────────────┐
│        AppProvider wraps entire app          │
│  <AppProvider>                               │
│    <App />                                   │
│  </AppProvider>                              │
└──────────────┬───────────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────────┐
│  Context creates state:                      │
│  - user: null                                │
│  - theme: 'dark'                             │
│  - notifications: []                         │
└──────────────┬───────────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────────┐
│  Provides value object:                      │
│  {                                           │
│    user, theme, notifications,               │
│    login, logout, toggleTheme,               │
│    addNotification                           │
│  }                                           │
└──────────────┬───────────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────────┐
│  Any component can consume:                  │
│  const { user } = useAppContext()           │
└──────────────┬───────────────────────────────┘
               │
               ▼
     Component calls login()
               │
               ▼
┌──────────────────────────────────────────────┐
│  setUser(userData) in Context                │
└──────────────┬───────────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────────┐
│  ALL components using useAppContext()        │
│  automatically re-render                     │
│  - Header shows new user                     │
│  - Home shows welcome message                │
└──────────────────────────────────────────────┘
```

## 8. Complete User Journey Example

```
┌─────────────────────────────────────────────────────────┐
│  User visits http://localhost:3000                      │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
      App initializes → Context → Router → Home renders
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│  User sees Home page with features                      │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│  User clicks "User Form" in navigation                  │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
      Router navigates → /user-form → UserForm renders
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│  User fills out form (name, email, username)            │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
          Form validates → Shows errors OR submits
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│  login() called in Context                              │
│  - setUser(formData)                                    │
│  - addNotification('Success!', 'success')               │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│  Header re-renders showing user name                    │
│  Notification appears top-right                         │
│  navigate('/') redirects to Home                        │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│  Home page shows "Welcome back, [name]!"                │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│  User clicks "Dashboard" in navigation                  │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
      Router navigates → /dashboard → Dashboard renders
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│  useEffect triggers → fetchUsers()                      │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
      API call → Server → Response → State update
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│  Dashboard shows user cards from API                    │
└─────────────────────────────────────────────────────────┘
```

These diagrams show the complete flow of a React application from startup to complex user interactions!
