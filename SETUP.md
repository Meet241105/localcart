# LocalCart - Quick Setup Guide

## 🚀 Quick Start (5 Minutes)

### Step 1: Install Dependencies

```bash
# Frontend
cd frontend
npm install

# Backend (in new terminal or after frontend)
cd backend
npm install
```

### Step 2: Set Up MongoDB

**Option A: Local MongoDB**
- Install MongoDB locally
- Start MongoDB service
- Use connection string: `mongodb://localhost:27017/localcart`

**Option B: MongoDB Atlas (Recommended)**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string
4. Use it in the backend/.env file

### Step 3: Create Environment Files

**Backend Configuration:**
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:
```env
MONGO_URI=mongodb://localhost:27017/localcart
JWT_SECRET=your_random_secret_key_minimum_32_characters_long
PORT=5000
NODE_ENV=development
```

**Frontend Configuration:**
```bash
cd frontend
cp .env.example .env
```

Edit `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000/api

# Firebase config (get from Firebase Console)
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Step 4: Create Admin Account
```bash
cd backend
npm run create-admin
```

Follow the prompts to create your admin account.

### Step 5: Start the Application

**Terminal 1 - Frontend:**
```bash
cd frontend
npm run dev
```

**Terminal 2 - Backend:**
```bash
cd backend
npm run dev
```

### Step 6: Access the Application

- **Customer Site:** http://localhost:5173
- **Admin Panel:** http://localhost:5173/admin/login
- **API:** http://localhost:5000/api

---

## 📱 Testing the Admin Panel

1. Go to http://localhost:5173/admin/login
2. Login with your admin credentials
3. Add your first product:
   - Click "Add Product"
   - Fill in product details
   - Use image URLs from `/images/` folder or external URLs
   - Set category, price, stock
   - Click "Create Product"

4. View products on the main site:
   - Go to http://localhost:5173
   - Login as a customer (register first)
   - Navigate to category pages
   - Products from MongoDB will appear!

---

## 🔧 Common Issues

### MongoDB Connection Error
- **Issue:** `MongoServerError: connect ECONNREFUSED`
- **Fix:** Make sure MongoDB is running or check your connection string

### Port Already in Use
- **Issue:** `Error: listen EADDRINUSE: address already in use :::5000`
- **Fix:** Change PORT in .env or kill the process using that port

### Admin Not Found
- **Issue:** Can't login to admin panel
- **Fix:** Run `npm run create-admin` again

### Products Not Showing
- **Issue:** Products don't appear on frontend
- **Fix:** Check if backend is running and VITE_API_URL is correct

---

## 📊 Adding Sample Products

You can add products via:
1. **Admin Panel:** Manual entry through UI
2. **MongoDB Compass:** Direct database insertion
3. **API:** POST requests to `/api/products`

**Sample Product JSON:**
```json
{
  "name": "Handwoven Cotton Saree",
  "description": "Beautiful traditional saree from Varanasi",
  "price": 1299,
  "originalPrice": 1999,
  "category": "fashion",
  "image": "/images/saree.jpg",
  "stock": 10,
  "tag": "Best",
  "artisan": "Rama Textiles",
  "region": "Varanasi"
}
```

---

## 🎯 Next Steps

1. Add product images to `/public/images/`
2. Create multiple products across categories
3. Test the shopping cart functionality
4. Customize the theme colors
5. Add more admin features

---

## 💡 Pro Tips

- Use MongoDB Compass to view your database visually
- Use Postman to test API endpoints
- Enable hot reload: Backend uses nodemon, Frontend uses Vite HMR
- Check browser console for errors
- Check terminal logs for backend errors

---

## 📞 Need Help?

- Check the main README.md for detailed documentation
- Review the API endpoints in backend/routes/
- Check component files for frontend logic
- MongoDB docs: https://docs.mongodb.com
- Express docs: https://expressjs.com

---

Happy coding! 🚀
