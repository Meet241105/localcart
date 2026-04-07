# LocalCart Backend

Express.js REST API with MongoDB for the LocalCart e-commerce platform.

## 🛠️ Tech Stack

- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Multer** - File uploads
- **Cloudinary** - Image storage (optional)

## 📦 Installation

```bash
npm install
```

## 🏃 Development

```bash
npm run dev
```

Runs on `http://localhost:5000` with nodemon (auto-reload).

## 🚀 Production

```bash
npm start
```

## 🔧 Environment Variables

Create a `.env` file:

```env
MONGO_URI=mongodb://localhost:27017/localcart
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
PORT=5000
NODE_ENV=development
```

## 📁 Project Structure

```
backend/
├── config/
│   └── db.js              # MongoDB connection
├── models/
│   ├── Admin.js           # Admin user model
│   ├── Product.js         # Product model
│   └── Category.js        # Category model
├── routes/
│   ├── adminRoutes.js     # Admin authentication endpoints
│   └── productRoutes.js   # Product CRUD endpoints
├── middleware/
│   ├── auth.js            # JWT authentication
│   └── upload.js          # File upload handling
├── scripts/
│   ├── createAdmin.js     # Create admin CLI tool
│   └── seedProducts.js    # Seed sample products
└── server.js              # Express server entry point
```

## 🔐 Scripts

### Create Admin Account
```bash
npm run create-admin
```

Follow the prompts to create a super admin account.

### Seed Sample Products
```bash
npm run seed-products
```

Adds 10 sample products to the database.

## 📝 API Endpoints

### Admin Routes (`/api/admin`)
- `POST /login` - Admin login
- `POST /register` - Create new admin (superadmin only)
- `GET /profile` - Get admin profile
- `GET /all` - Get all admins (superadmin only)
- `DELETE /:id` - Delete admin (superadmin only)

### Product Routes (`/api/products`)
- `GET /` - Get all products (with filters)
- `GET /:id` - Get single product
- `POST /` - Create product (admin only)
- `PUT /:id` - Update product (admin only)
- `DELETE /:id` - Delete product (admin only)
- `POST /upload` - Upload product image (admin only)
- `GET /category/:category` - Get products by category

### Health Check
- `GET /api/health` - Check if API is running

## 🔒 Authentication

All admin routes require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

Get the token by logging in via `POST /api/admin/login`.

## 💾 Database Models

### Admin
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: "admin" | "superadmin",
  isActive: Boolean
}
```

### Product
```javascript
{
  name: String,
  description: String,
  price: Number,
  originalPrice: Number,
  category: String,
  subCategory: String,
  image: String,
  images: [String],
  tag: String,
  stock: Number,
  rating: Number,
  numReviews: Number,
  isActive: Boolean,
  artisan: String,
  region: String,
  material: String
}
```

## 🧪 Testing

Use Postman or cURL to test endpoints:

```bash
# Login
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@localcart.com","password":"admin123"}'

# Get products
curl http://localhost:5000/api/products
```

## 🔧 Development Tools

- **Nodemon** - Auto-restart on file changes
- **MongoDB Compass** - Visual database tool
- **Postman** - API testing

## 📄 License

MIT
