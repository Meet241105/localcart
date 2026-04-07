# Project Structure Overview

LocalCart is now organized into separate **frontend** and **backend** folders for better clarity and maintainability.

## 📁 Folder Structure

```
localcart/
│
├── frontend/                        # React Frontend Application
│   ├── src/                         # Source code
│   │   ├── components/              # React components
│   │   ├── contexts/                # State management
│   │   ├── pages/                   # Page components
│   │   ├── lib/                     # Utilities
│   │   ├── App.jsx                  # Main app
│   │   └── main.jsx                 # Entry point
│   ├── public/                      # Static assets
│   │   └── images/                  # Product images
│   ├── index.html                   # HTML template
│   ├── vite.config.js               # Vite configuration
│   ├── package.json                 # Frontend dependencies
│   ├── .env                         # Frontend environment variables
│   └── README.md                    # Frontend documentation
│
├── backend/                         # Express Backend API
│   ├── config/                      # Configuration files
│   │   └── db.js                    # MongoDB connection
│   ├── models/                      # Mongoose models
│   │   ├── Admin.js                 # Admin schema
│   │   ├── Product.js               # Product schema
│   │   └── Category.js              # Category schema
│   ├── routes/                      # API routes
│   │   ├── adminRoutes.js           # Admin endpoints
│   │   └── productRoutes.js         # Product endpoints
│   ├── middleware/                  # Express middleware
│   │   ├── auth.js                  # JWT authentication
│   │   └── upload.js                # File upload
│   ├── scripts/                     # Utility scripts
│   │   ├── createAdmin.js           # Create admin CLI
│   │   └── seedProducts.js          # Seed database
│   ├── server.js                    # Express server
│   ├── package.json                 # Backend dependencies
│   ├── .env                         # Backend environment variables
│   └── README.md                    # Backend documentation
│
├── uploads/                         # Uploaded files (product images)
│
├── package.json                     # Root package.json (convenience scripts)
├── README.md                        # Main project documentation
├── SETUP.md                         # Setup instructions
├── API_DOCUMENTATION.md             # API reference
└── .gitignore                       # Git ignore rules
```

## 🔧 How to Work with This Structure

### Installing Dependencies

Install for each part separately:

```bash
# Frontend
cd frontend
npm install

# Backend
cd backend
npm install
```

### Running in Development

Run each in a separate terminal:

```bash
# Terminal 1 - Frontend
cd frontend
npm run dev

# Terminal 2 - Backend
cd backend
npm run dev
```

### Environment Variables

**Frontend** (frontend/.env):
- Firebase configuration
- API URL

**Backend** (backend/.env):
- MongoDB connection string
- JWT secret
- Server port

### Common Commands

**Frontend:**
```bash
cd frontend
npm run dev      # Start dev server
npm run build    # Build for production
```

**Backend:**
```bash
cd backend
npm run dev           # Start with nodemon
npm run create-admin  # Create admin account
npm run seed-products # Seed sample products
```

## 📝 Benefits of This Structure

✅ **Clear Separation** - Frontend and backend are completely separate
✅ **Independent Deployment** - Can deploy frontend and backend separately
✅ **Easy Navigation** - Each part has its own folder
✅ **Better Organization** - No confusion about which files belong where
✅ **Scalability** - Easy to add microservices or additional backends
✅ **Team Collaboration** - Frontend and backend devs can work independently

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy the 'dist' folder
```

### Backend (Railway/Render/Heroku)
```bash
cd backend
# Deploy with start script: npm start
```

## 📚 Documentation

- **[Main README](README.md)** - Project overview
- **[Frontend README](frontend/README.md)** - Frontend details
- **[Backend README](backend/README.md)** - Backend API details
- **[Setup Guide](SETUP.md)** - Quick start instructions
- **[API Docs](API_DOCUMENTATION.md)** - Complete API reference
