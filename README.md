# LocalCart - E-Commerce Platform for Local Indian Products

A full-stack e-commerce platform showcasing local and artisanal products from India, built with React, Express, MongoDB, and Firebase.

## 🚀 Features

- **User Authentication** - Firebase Auth for customer login/registration
- **Admin Panel** - Full-featured admin dashboard for product management
- **Product Management** - CRUD operations for products with categories
- **Shopping Cart** - Context API-based cart with localStorage persistence
- **Category Pages** - 8 specialized product categories
- **Responsive Design** - Mobile-first design with Tailwind CSS
- **Dark Mode** - Theme toggle support

## 📦 Tech Stack

### Frontend
- React 19 + Vite
- React Router v7
- Tailwind CSS 4.1
- Radix UI Components
- Axios
- Firebase Auth
- React Toastify

### Backend
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Bcrypt for password hashing
- Multer for file uploads

## 🛠️ Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Firebase Account

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd localcart
```

### 2. Install dependencies

```bash
# Frontend dependencies
cd frontend
npm install

# Backend dependencies
cd backend
npm install
```

### 3. Environment Setup

#### Frontend (.env in frontend/)
```bash
cd frontend
cp .env.example .env
```
Edit `frontend/.env` with your Firebase credentials and API URL.

#### Backend (.env in backend/)
```bash
cd backend
cp .env.example .env
```
Edit `backend/.env` with your MongoDB URI and JWT secret.

### 4. Create Default Admin Account

```bash
cd backend
npm run create-admin
```

Or manually via MongoDB:
```javascript
// In MongoDB shell or Compass
use localcart;
db.admins.insertOne({
  name: "Admin",
  email: "admin@localcart.com",
  password: "$2a$10$...", // Use bcrypt to hash "admin123"
  role: "superadmin",
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
});
```

## 🏃 Running the Application

### Development Mode

**Option A: Run both together (Recommended)**
```bash
# From root directory
npm run dev
```
Runs on `http://localhost:5173`

**Terminal 2 - Backend:**
```bash
cd backend
npm run dev
```
Runs on `http://localhost:5000`

### frontend/                    # React Frontend
│   ├── src/
│   │   ├── components/          # React components
│   │   │   ├── admin/           # Admin panel components
│   │   │   ├── common/          # Shared components
│   │   │   ├── layout/          # Layout components
│   │   │   └── [category]/      # Category-specific components
│   │   ├── contexts/            # React contexts
│   │   │   ├── CartContext.jsx
│   │   │   └── AdminContext.jsx
│   │   ├── pages/               # Page components
│   │   ├── lib/                 # Utilities
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   │   └── images/              # Product images
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── .env                     # Frontend environment variables
│
├── backend/                     # Express Backend
│   ├── config/
│   │   └── db.js                # MongoDB connection
│   ├── models/
│   │   ├── Admin.js             # Admin schema
│   │   ├── Product.js           # Product schema
│   │   └── Category.js          # Category schema
│   ├── routes/
│   │   ├── adminRoutes.js       # Admin API endpoints
│   │   └── productRoutes.js     # Product API endpoints
│   ├── middleware/
│   │   ├── auth.js              # JWT auth middleware
│   │   └── upload.js            # File upload middleware
│   ├── scripts/
│   │   ├── createAdmin.js       # CLI tool to create admin
│   │   └── seedProducts.js      # Sample products seeder
│   ├── server.js                # Express server
│   ├── package.json
│   └── .env                     # Backend environment variables
│
├── uploads/                     # Product images storage
├── package.json                 # Root package.json (scripts)
├── README.md
├── SETUP.md
└── API_DOCUMENTATION.md
├── src/
│   ├── components/     # React components
│   │   ├── admin/      # Admin panel components
│   │   ├── common/     # Shared components
│   │   └── layout/     # Layout components
│   ├── contexts/       # React contexts
│   ├── pages/          # Page components
│   └── App.jsx         # Main app component
└── public/
    └── images/         # Product images
```

## 🔐 Admin Panel

Access the admin panel at `/admin/login`

**Default Credentials:**
- Email: admin@localcart.com
- Password: admin123 (change after first login)

**Admin Features:**
- Dashboard with analytics
- Product CRUD operations
- Category filtering
- Stock management
- Image upload support
### Root Directory
- `npm run install:all` - Install both frontend and backend dependencies
- `npm run dev` - Run both frontend and backend concurrently
- `npm run dev:frontend` - Run only frontend
- `npm run dev:backend` - Run only backend
- `npm run build` - Build frontend for production
- `npm run create-admin` - Create admin account
- `npm run seed-products` - Seed sample products

### Frontend (cd frontend/)
- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend (cd backend/)
- `npm run dev` - Start with nodemon (hot reload)
- `npm start` - Start production server
- `npm run create-admin` - Create admin account
- `npm run seed-products` - Seed sample products- Create new admin (superadmin only)
- `GET /api/admin/profile` - Get admin profile

### Product Routes
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)
- `GET /api/products/category/:category` - Get products by category

## 🎨 Categories

1. Home & Decor
2. Fashion & Apparel
3. Jewelry & Accessories
4. Handicrafts & Gifts
5. Kitchen & Dining
6. Toys
7. Personal Care & Wellness
8. Regional Crafts

## 🖼️ Adding Products

Products can be added through the admin panel with:
- Name, description
- Price, original price
- Category & subcategory
- Stock quantity
- Image URL
- Tags (Best, New, Eco, etc.)
- Artisan details, region, material

## 🔧 Available Scripts

- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run server` - Start Express backend
- `npm run server:dev` - Start backend with nodemon
- `npm run lint` - Run ESLint

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the app: `npm run build`
2. Deploy the `dist` folder
3. Set environment variables in hosting platform

### Backend (Railway/Render/Heroku)
1. Push to GitHub
2. Connect repository to hosting platform
3. Set environment variables
4. Deploy

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## 📧 Support

For support, email support@localcart.com or open an issue on GitHub.

---

Made with ❤️ for supporting local Indian artisans and craftspeople
