# React Full Flow Application

A comprehensive React application demonstrating the complete development flow and best practices for building modern web applications.

## Features

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **React Router v6** - Client-side routing
- **Context API** - Global state management
- **Axios** - HTTP client with interceptors
- **Custom Hooks** - Reusable logic patterns (useFetch, useForm, useLocalStorage)
- **Form Validation** - Custom form handling with validation
- **Toast Notifications** - User feedback system
- **Responsive Design** - Mobile-friendly layouts
- **Theme Support** - Dark/Light theme toggle

## Project Structure

```
mss-fe-pe/
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── Header/      # Navigation header
│   │   ├── Footer/      # Page footer
│   │   ├── Layout/      # Page layout wrapper
│   │   └── Notifications/ # Toast notifications
│   │
│   ├── pages/          # Route-level components
│   │   ├── Home/       # Landing page
│   │   ├── About/      # About page
│   │   ├── Dashboard/  # Dashboard with API integration
│   │   ├── UserForm/   # Form example with validation
│   │   └── NotFound/   # 404 page
│   │
│   ├── context/        # Global state management
│   │   └── AppContext.jsx  # App-wide context provider
│   │
│   ├── hooks/          # Custom React hooks
│   │   ├── useFetch.js      # Data fetching hook
│   │   ├── useForm.js       # Form handling hook
│   │   └── useLocalStorage.js # localStorage hook
│   │
│   ├── services/       # API layer
│   │   └── api.js      # Axios configuration and API methods
│   │
│   ├── App.jsx         # Main app component
│   ├── App.css         # Global app styles
│   ├── main.jsx        # Application entry point
│   └── index.css       # Base styles
│
├── index.html          # HTML template
├── package.json        # Dependencies and scripts
├── vite.config.js     # Vite configuration
└── REACT_FLOW_GUIDE.md # Detailed flow documentation
```

## Getting Started

### Prerequisites

- Node.js (v20.x or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mss-fe-pe
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Application Flow

### 1. Entry Point
The application starts from [index.html](index.html), which loads [src/main.jsx](src/main.jsx).

### 2. React Root
[main.jsx](src/main.jsx) creates a React root and renders the [App](src/App.jsx) component.

### 3. App Structure
[App.jsx](src/App.jsx) sets up:
- Global state with AppProvider
- Routing with React Router
- Layout structure
- All application routes

### 4. Context API
[AppContext](src/context/AppContext.jsx) provides:
- User authentication state
- Theme management
- Notification system
- Global state methods

### 5. Custom Hooks
Reusable hooks in [src/hooks/](src/hooks/):
- **useFetch**: Handle API calls with loading and error states
- **useForm**: Manage form state and validation
- **useLocalStorage**: Sync state with localStorage

### 6. API Integration
[api.js](src/services/api.js) provides:
- Axios instance with base configuration
- Request/Response interceptors
- Organized API methods (users, posts, todos)

## Key Features Explained

### State Management
Uses Context API for global state:
```javascript
const { user, login, logout, theme, toggleTheme } = useAppContext()
```

### Routing
React Router handles navigation:
```javascript
<Route path="/" element={<Home />} />
<Route path="/dashboard" element={<Dashboard />} />
```

### Data Fetching
Dashboard demonstrates API integration:
- Fetches users from JSONPlaceholder API
- Shows loading states
- Handles errors
- Displays data in cards

### Form Handling
UserForm shows form validation:
- Custom useForm hook
- Real-time validation
- Error messages
- Form reset functionality

### Notifications
Toast notification system:
- Auto-dismiss after 3 seconds
- Multiple notification types (success, error, info)
- Positioned in top-right corner

## Component Communication

### Parent to Child
Data flows down through props:
```javascript
<Header theme={theme} />
```

### Child to Parent
Events flow up through callbacks:
```javascript
<button onClick={() => onSubmit(data)}>
```

### Sibling to Sibling
Communication through shared context or parent state

## API Integration

The app uses JSONPlaceholder API for demonstration:
```javascript
// Fetch users
const users = await userAPI.getUsers()

// Create user
const newUser = await userAPI.createUser(userData)
```

## Styling

- CSS Modules for component-specific styles
- Global styles in [index.css](src/index.css)
- Responsive design with media queries
- CSS variables for theming

## Learn More

For a detailed explanation of the React flow, see [REACT_FLOW_GUIDE.md](REACT_FLOW_GUIDE.md).

This guide covers:
- Application startup flow
- Component lifecycle
- State management flow
- Routing flow
- Data fetching flow
- Form handling flow
- Complete request-to-render flow

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request