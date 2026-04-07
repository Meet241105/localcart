# LocalCart API Documentation

Base URL: `http://localhost:5000/api`

---

## 🔐 Authentication

All admin routes require JWT token in Authorization header:
```
Authorization: Bearer <token>
```

---

## Admin Endpoints

### 1. Admin Login
**POST** `/api/admin/login`

Login to get JWT token for admin access.

**Request Body:**
```json
{
  "email": "admin@localcart.com",
  "password": "admin123"
}
```

**Response:**
```json
{
  "_id": "60d5ec49f1b2c72b8c8e4f1a",
  "name": "Admin",
  "email": "admin@localcart.com",
  "role": "superadmin",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 2. Get Admin Profile
**GET** `/api/admin/profile`

Get current admin's profile information.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "_id": "60d5ec49f1b2c72b8c8e4f1a",
  "name": "Admin",
  "email": "admin@localcart.com",
  "role": "superadmin",
  "isActive": true
}
```

---

### 3. Register New Admin
**POST** `/api/admin/register`

Create a new admin account (superadmin only).

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "name": "New Admin",
  "email": "newadmin@localcart.com",
  "password": "password123",
  "role": "admin"
}
```

**Response:**
```json
{
  "_id": "60d5ec49f1b2c72b8c8e4f1b",
  "name": "New Admin",
  "email": "newadmin@localcart.com",
  "role": "admin",
  "message": "Admin created successfully"
}
```

---

### 4. Get All Admins
**GET** `/api/admin/all`

Get list of all admin accounts (superadmin only).

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
[
  {
    "_id": "60d5ec49f1b2c72b8c8e4f1a",
    "name": "Admin",
    "email": "admin@localcart.com",
    "role": "superadmin",
    "isActive": true
  }
]
```

---

### 5. Delete Admin
**DELETE** `/api/admin/:id`

Delete an admin account (superadmin only).

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "message": "Admin removed"
}
```

---

## Product Endpoints

### 1. Get All Products
**GET** `/api/products`

Get all products with optional filters.

**Query Parameters:**
- `category` - Filter by category (e.g., fashion, home-decor)
- `tag` - Filter by tag (Best, New, Eco, etc.)
- `search` - Text search in name/description
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20)

**Example:** `/api/products?category=fashion&tag=Best&page=1&limit=10`

**Response:**
```json
{
  "products": [
    {
      "_id": "60d5ec49f1b2c72b8c8e4f1c",
      "name": "Handwoven Cotton Saree",
      "description": "Elegant handwoven cotton saree...",
      "price": 1299,
      "originalPrice": 1999,
      "category": "fashion",
      "subCategory": "Sarees",
      "image": "/images/saree.jpg",
      "tag": "Best",
      "stock": 15,
      "artisan": "Rama Textiles",
      "region": "Varanasi, UP",
      "material": "Pure Cotton",
      "rating": 0,
      "numReviews": 0,
      "isActive": true,
      "createdAt": "2021-06-25T10:30:00.000Z",
      "updatedAt": "2021-06-25T10:30:00.000Z"
    }
  ],
  "totalPages": 2,
  "currentPage": 1,
  "total": 25
}
```

---

### 2. Get Single Product
**GET** `/api/products/:id`

Get details of a single product by ID.

**Response:**
```json
{
  "_id": "60d5ec49f1b2c72b8c8e4f1c",
  "name": "Handwoven Cotton Saree",
  "description": "Elegant handwoven cotton saree...",
  "price": 1299,
  "originalPrice": 1999,
  "category": "fashion",
  "subCategory": "Sarees",
  "image": "/images/saree.jpg",
  "tag": "Best",
  "stock": 15,
  "artisan": "Rama Textiles",
  "region": "Varanasi, UP",
  "material": "Pure Cotton"
}
```

---

### 3. Create Product
**POST** `/api/products`

Create a new product (admin only).

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "name": "Product Name",
  "description": "Product description",
  "price": 999,
  "originalPrice": 1499,
  "category": "fashion",
  "subCategory": "Kurtas",
  "image": "/images/product.jpg",
  "tag": "New",
  "stock": 10,
  "artisan": "Artisan Name",
  "region": "Region",
  "material": "Material"
}
```

**Response:**
```json
{
  "_id": "60d5ec49f1b2c72b8c8e4f1d",
  "name": "Product Name",
  "description": "Product description",
  "price": 999,
  ...
}
```

---

### 4. Update Product
**PUT** `/api/products/:id`

Update an existing product (admin only).

**Headers:** `Authorization: Bearer <token>`

**Request Body:** (All fields optional)
```json
{
  "name": "Updated Product Name",
  "price": 1099,
  "stock": 20,
  "isActive": true
}
```

**Response:**
```json
{
  "_id": "60d5ec49f1b2c72b8c8e4f1d",
  "name": "Updated Product Name",
  "price": 1099,
  ...
}
```

---

### 5. Delete Product
**DELETE** `/api/products/:id`

Delete a product (admin only).

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "message": "Product removed"
}
```

---

### 6. Upload Product Image
**POST** `/api/products/upload`

Upload product image (admin only).

**Headers:** 
- `Authorization: Bearer <token>`
- `Content-Type: multipart/form-data`

**Form Data:**
- `image` - Image file (jpg, jpeg, png, gif, webp, max 5MB)

**Response:**
```json
{
  "image": "/uploads/1234567890-product.jpg",
  "message": "Image uploaded successfully"
}
```

---

### 7. Get Products by Category
**GET** `/api/products/category/:category`

Get all products in a specific category.

**Categories:**
- home-decor
- fashion
- jewelry
- gifts
- kitchen-dining
- toys
- personal-care
- regional-crafts

**Example:** `/api/products/category/fashion`

**Response:**
```json
[
  {
    "_id": "60d5ec49f1b2c72b8c8e4f1c",
    "name": "Handwoven Cotton Saree",
    "category": "fashion",
    ...
  }
]
```

---

## Error Responses

All endpoints may return error responses:

**400 Bad Request:**
```json
{
  "message": "Invalid input data"
}
```

**401 Unauthorized:**
```json
{
  "message": "Not authorized, no token"
}
```

**403 Forbidden:**
```json
{
  "message": "Access denied. Super admin only."
}
```

**404 Not Found:**
```json
{
  "message": "Product not found"
}
```

**500 Server Error:**
```json
{
  "message": "Server error message",
  "stack": "Error stack (development only)"
}
```

---

## Product Model Schema

```javascript
{
  name: String (required),
  description: String (required),
  price: Number (required),
  originalPrice: Number,
  category: String (required, enum),
  subCategory: String,
  image: String (required),
  images: [String],
  tag: String (enum: Best, New, Eco, Sale, Hot, Featured),
  stock: Number (required, default: 0),
  rating: Number (0-5),
  numReviews: Number,
  isActive: Boolean,
  artisan: String,
  region: String,
  material: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## Admin Model Schema

```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: admin, superadmin),
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

---

## Testing with Postman/cURL

### Example: Login
```bash
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@localcart.com","password":"admin123"}'
```

### Example: Get Products
```bash
curl http://localhost:5000/api/products?category=fashion
```

### Example: Create Product
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "Test Product",
    "description": "Test description",
    "price": 999,
    "category": "fashion",
    "image": "/images/test.jpg",
    "stock": 10
  }'
```

---

## Rate Limiting & Security

- No rate limiting implemented (add in production)
- CORS enabled for all origins (restrict in production)
- JWT tokens expire in 30 days
- Passwords hashed with bcrypt (10 rounds)
- File uploads limited to 5MB
- Only image files accepted for uploads

---

## Health Check

**GET** `/api/health`

Check if API is running.

**Response:**
```json
{
  "status": "OK",
  "message": "LocalCart API is running"
}
```

---

Made with ❤️ for LocalCart
