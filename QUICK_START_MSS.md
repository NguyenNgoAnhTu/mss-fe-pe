# Quick Start Guide - MSS BlindBox Frontend

## Prerequisites Check

Before you start, ensure you have:
- ✅ Node.js v20.x installed
- ✅ npm installed
- ✅ MSS Backend running on port 8084

## Quick Setup (3 Steps)

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Start Backend

Ensure the MSS backend is running:
```bash
# Check if API Gateway is running
curl http://localhost:8084/actuator/health

# If not running, start it
# (Refer to backend documentation)
```

### Step 3: Start Frontend

```bash
npm run dev
```

Visit: **http://localhost:3000**

## First Login

### Admin Account
```
Email: admin@example.com
Password: admin123
```

### User Account
```
Email: user@example.com
Password: user123
```

## Quick Tour

### As Admin
1. Login with admin credentials
2. Click "Admin Dashboard" in navigation
3. View system statistics
4. Click "Manage Brands" to create/edit brands
5. Click "Manage BlindBoxes" to create/edit products

### As User
1. Login with user credentials
2. Click "BlindBoxes" to view catalog
3. Browse products (read-only)

## Project Structure Overview

```
src/
├── pages/
│   ├── Login/           ← Start here
│   ├── Home/            ← Landing page
│   ├── Brands/          ← Brand management (Admin)
│   ├── BlindBoxes/      ← Product catalog
│   └── AdminDashboard/  ← Admin dashboard
│
├── services/
│   └── api.js           ← All API calls
│
└── context/
    └── AppContext.jsx   ← Global state
```

## Common Operations

### Create a Brand (Admin Only)
1. Navigate to "Brands" page
2. Click "+ Add Brand"
3. Fill in name and description
4. Click "Create Brand"

### Create a BlindBox (Admin Only)
1. Navigate to "BlindBoxes" page
2. Click "+ Add BlindBox"
3. Fill in all required fields:
   - Name (min 10 chars)
   - Category
   - Brand
   - Price (> 0)
   - Stock (1-100)
   - Release Date
4. Click "Create BlindBox"

### View Statistics (Admin Only)
1. Navigate to "Admin Dashboard"
2. View cards showing:
   - Total Brands
   - Total BlindBoxes
   - Total Stock
   - Low Stock Items

## API Endpoints Being Used

### Authentication
- `POST /api/auth/login` - Login

### Brands
- `GET /api/brands/all` - List brands
- `POST /api/brands/create` - Create brand
- `PUT /api/brands/update/{id}` - Update brand
- `DELETE /api/brands/delete/{id}` - Delete brand

### BlindBoxes
- `GET /api/blindboxes/all` - List blind boxes
- `GET /api/blindboxes/categories` - List categories
- `POST /api/blindboxes/create` - Create blind box
- `PUT /api/blindboxes/update/{id}` - Update blind box
- `DELETE /api/blindboxes/delete/{id}` - Delete blind box

## Troubleshooting

### Cannot connect to backend
```bash
# Verify backend is running
curl http://localhost:8084/api/brands/all

# Expected: 401 Unauthorized (means it's running)
```

### 401 after login
- Token may have expired (1 hour)
- Login again

### Admin features not showing
- Ensure you logged in with admin account
- Check for "ADMIN" badge next to email in header

### Port 3000 already in use
```bash
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or change port in vite.config.js
```

## File Structure

```
Key Files:
├── src/main.jsx                    → Entry point
├── src/App.jsx                     → Routes
├── src/context/AppContext.jsx      → Global state
├── src/services/api.js             → API calls
├── src/components/ProtectedRoute/  → Route protection
├── vite.config.js                  → Proxy config
└── MSS_README.md                   → Full documentation
```

## Development Workflow

1. **Make changes** to any `.jsx` file
2. **See live reload** in browser
3. **Check console** for errors
4. **Use React DevTools** for debugging

## Production Build

```bash
# Build
npm run build

# Preview
npm run preview
```

Output: `dist/` folder

## Next Steps

1. ✅ Login and explore the UI
2. ✅ Create a brand (Admin)
3. ✅ Create a blind box (Admin)
4. ✅ Test CRUD operations
5. ✅ Review the code in `src/`
6. ✅ Read [MSS_README.md](MSS_README.md) for details

## Key Technologies

- **React 18** - UI framework
- **React Router v6** - Routing
- **Axios** - API calls
- **Context API** - State management
- **Vite** - Build tool

## Need Help?

1. Check browser console for errors
2. Review [MSS_README.md](MSS_README.md)
3. Verify backend is running
4. Check network tab in DevTools

## Demo Features

### Admin Dashboard
- View total brands, blindboxes, stock
- Quick action buttons
- Recent items table

### Brand Management
- Create/Edit/Delete brands
- Form validation
- Real-time updates

### BlindBox Catalog
- Browse all products
- Admin can create/edit/delete
- Users can only view
- Category and brand filtering (built-in)

---

**Ready to Go!** 🚀

Start with `npm run dev` and login to explore!
