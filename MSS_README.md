# MSS BlindBox System - Frontend

A complete React frontend application for the MSS (Microservices System) BlindBox management platform, featuring brand management, blind box catalog, and role-based access control.

## Overview

This React application integrates with the MSS microservices backend (Spring Boot) to provide a full-featured management system for brands and blind box products. The system includes JWT authentication, admin dashboard, and comprehensive CRUD operations.

## Features

### Core Features
- ✅ **JWT Authentication** - Secure login with role-based access (Admin/User)
- ✅ **Brand Management** - Full CRUD operations for brands
- ✅ **BlindBox Catalog** - Browse and manage blind box products
- ✅ **Admin Dashboard** - Real-time statistics and quick actions
- ✅ **Role-Based Access** - Different views for admin and regular users
- ✅ **Real-time Notifications** - Toast notifications for all operations
- ✅ **Responsive Design** - Mobile-friendly interface

### Technical Features
- React 18 with Hooks
- React Router v6 for client-side routing
- Axios for API integration with interceptors
- Context API for global state management
- Protected routes with role-based access
- Vite for fast development and building
- API Gateway proxy configuration

## Prerequisites

- Node.js v20.x or higher
- npm or yarn
- MSS Backend running on port 8084 (API Gateway)

## Installation

1. **Clone the repository**:
```bash
cd mss-fe-pe
```

2. **Install dependencies**:
```bash
npm install
```

3. **Configure environment** (optional):
Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=http://localhost:8084/api
```

4. **Start the development server**:
```bash
npm run dev
```

The app will be available at: `http://localhost:3000`

## Project Structure

```
mss-fe-pe/
├── src/
│   ├── components/
│   │   ├── Header/              # Navigation header
│   │   ├── Footer/              # Page footer
│   │   ├── Layout/              # Layout wrapper
│   │   ├── Notifications/       # Toast notifications
│   │   └── ProtectedRoute/      # Route protection component
│   │
│   ├── pages/
│   │   ├── Login/               # Login page
│   │   ├── Home/                # Landing page
│   │   ├── About/               # About page
│   │   ├── Brands/              # Brand management (Admin only)
│   │   ├── BlindBoxes/          # BlindBox catalog and management
│   │   ├── AdminDashboard/      # Admin dashboard
│   │   └── NotFound/            # 404 page
│   │
│   ├── context/
│   │   └── AppContext.jsx       # Global state management
│   │
│   ├── services/
│   │   └── api.js               # Axios configuration and API methods
│   │
│   ├── App.jsx                  # Main app with routing
│   ├── App.css                  # Global app styles
│   ├── main.jsx                 # Entry point
│   └── index.css                # Base styles
│
├── vite.config.js               # Vite config with proxy
├── package.json                 # Dependencies
└── MSS_README.md                # This file
```

## Backend Integration

### API Endpoints

The frontend communicates with the following MSS backend services through the API Gateway (port 8084):

#### Authentication
- `POST /api/auth/login` - User login

#### Brands
- `GET /api/brands/all` - Get all brands
- `GET /api/brands/name?id={id}` - Get brand name by ID
- `POST /api/brands/create` - Create brand
- `PUT /api/brands/update/{id}` - Update brand
- `DELETE /api/brands/delete/{id}` - Delete brand

#### BlindBoxes
- `GET /api/blindboxes/all` - Get all blind boxes
- `GET /api/blindboxes/categories` - Get all categories
- `POST /api/blindboxes/create` - Create blind box (Admin only)
- `PUT /api/blindboxes/update/{id}` - Update blind box (Admin only)
- `DELETE /api/blindboxes/delete/{id}` - Delete blind box (Admin only)

### API Response Format

All API responses follow this structure:

```typescript
{
  success: boolean;
  message: string | null;
  data: T | null;
  timestamp: string;
}
```

## User Roles

### Admin (role: 1)
- Full access to all features
- Create, edit, delete brands
- Create, edit, delete blind boxes
- Access admin dashboard
- View statistics

**Demo Credentials**:
```
Email: admin@example.com
Password: admin123
```

### User (role: 2)
- View blind boxes
- Browse brands (through blind boxes)
- Cannot create, edit, or delete

**Demo Credentials**:
```
Email: user@example.com
Password: user123
```

## Application Flow

### 1. Authentication Flow

```
Login Page → Enter Credentials → API Auth → Store JWT Token →
Context Update → Redirect to Dashboard/Home
```

### 2. Admin Flow

```
Login as Admin → Admin Dashboard →
├── Manage Brands (Create/Edit/Delete)
└── Manage BlindBoxes (Create/Edit/Delete)
```

### 3. User Flow

```
Login as User → View BlindBoxes →
Browse catalog (Read-only)
```

### 4. API Request Flow

```
Component → API Service → Axios Interceptor (Add JWT) →
API Gateway → Microservice → Response → Interceptor (Handle Errors) →
Component Update → UI Update
```

## Key Components

### 1. AppContext (`src/context/AppContext.jsx`)

Provides global state management:
- `user` - Current user data
- `login(userData)` - Set user and store JWT
- `logout()` - Clear user and JWT
- `isAdmin()` - Check if user is admin
- `isAuthenticated()` - Check if user is logged in
- `theme` - Current theme (dark/light)
- `toggleTheme()` - Switch theme
- `notifications` - Array of toast messages
- `addNotification(message, type)` - Show notification

### 2. ProtectedRoute (`src/components/ProtectedRoute/ProtectedRoute.jsx`)

Protects routes requiring authentication or admin access:
```jsx
<ProtectedRoute>
  <Page />
</ProtectedRoute>

<ProtectedRoute adminOnly={true}>
  <AdminPage />
</ProtectedRoute>
```

### 3. API Service (`src/services/api.js`)

Centralized API configuration with:
- Axios instance with base URL
- Request interceptor (adds JWT token)
- Response interceptor (handles 401, errors)
- Organized API methods (auth, brands, blindBoxes)

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Environment Configuration

### Development
- API Base URL: `/api` (proxied to `http://localhost:8084`)
- Port: 3000

### Production
Set `VITE_API_BASE_URL` to your production API Gateway URL:
```env
VITE_API_BASE_URL=https://api.yourproduction.com/api
```

## Troubleshooting

### Issue: Cannot connect to backend

**Solution**: Ensure MSS backend is running:
```bash
# Check if API Gateway is running on port 8084
curl http://localhost:8084/actuator/health
```

### Issue: 401 Unauthorized after login

**Causes**:
1. Token expired (1 hour expiration)
2. Backend service not running
3. Wrong credentials

**Solution**: Login again or check backend logs

### Issue: CORS errors

**Solution**: Backend must enable CORS, or use Vite proxy (already configured):
```javascript
// vite.config.js
proxy: {
  '/api': {
    target: 'http://localhost:8084',
    changeOrigin: true
  }
}
```

### Issue: Admin features not showing

**Solution**: Ensure you're logged in with admin account:
- Email: admin@example.com
- Password: admin123
- Check `user.role === 1` in localStorage

## State Management

### Authentication State
```javascript
// Stored in localStorage
jwt_token: string       // JWT token
user: {
  id: number,
  email: string,
  role: number          // 1 = Admin, 2 = User
}
```

### Context State
```javascript
{
  user: User | null,
  theme: 'dark' | 'light',
  notifications: Notification[],
  // ... methods
}
```

## Form Validation

### BlindBox Creation (Admin Only)
- Name: Minimum 10 characters
- Category: Required, must exist
- Brand: Required, must exist
- Price: Required, > 0
- Stock: Required, 1-100
- Release Date: Required, format YYYY-MM-DD

### Brand Creation
- Name: Required
- Description: Optional

## API Error Handling

```javascript
try {
  const response = await blindBoxAPI.create(data);
  if (response.success) {
    addNotification('Success!', 'success');
  } else {
    addNotification(response.message, 'error');
  }
} catch (error) {
  const message = error.response?.data?.message || 'Operation failed';
  addNotification(message, 'error');
}
```

## Deployment

### Build for Production

```bash
npm run build
```

Output: `dist/` folder

### Deploy Options

1. **Vercel**:
```bash
npm install -g vercel
vercel --prod
```

2. **Netlify**:
- Drag `dist/` folder to Netlify
- Or use Netlify CLI

3. **Docker**:
```dockerfile
FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Backend Requirements

The frontend requires the MSS backend to be running with:

1. **API Gateway** on port 8084
2. **Account Service** (Authentication)
3. **Brand Service** (Brand management)
4. **BlindBox Service** (BlindBox management)
5. **PostgreSQL Database**

See backend documentation for setup instructions.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Technologies Used

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.3.1 | UI library |
| React Router | 6.26.0 | Client-side routing |
| Axios | 1.7.2 | HTTP client |
| Vite | 5.4.1 | Build tool |
| Context API | - | State management |

## Security Features

- JWT token-based authentication
- Automatic token injection via interceptors
- Protected routes with role checking
- Automatic logout on 401 responses
- No sensitive data in localStorage (only token)
- HTTPS in production (recommended)

## Performance Optimizations

- Code splitting with React Router
- Lazy loading of components
- Axios request caching
- Optimized bundle size with Vite
- CSS minification in production

## Future Enhancements

- [ ] Add token refresh mechanism
- [ ] Implement pagination for large lists
- [ ] Add search and filter functionality
- [ ] Image upload for brands/blindboxes
- [ ] Export data to CSV/Excel
- [ ] Real-time updates with WebSocket
- [ ] Dark/Light theme persistence
- [ ] Multi-language support

## License

MIT

## Support

For issues or questions:
1. Check this documentation
2. Review backend API documentation
3. Check browser console for errors
4. Verify backend services are running

---

**Built with React + MSS Microservices Backend** 🚀
