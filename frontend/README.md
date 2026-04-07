# LocalCart Frontend

React-based frontend for the LocalCart e-commerce platform.

## 🛠️ Tech Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router v7** - Client-side routing
- **Tailwind CSS 4.1** - Styling
- **Radix UI** - Accessible component primitives
- **Axios** - HTTP client
- **Firebase Auth** - User authentication
- **React Toastify** - Notifications

## 📦 Installation

```bash
npm install
```

## 🏃 Development

```bash
npm run dev
```

Runs on `http://localhost:5173`

## 🔨 Build

```bash
npm run build
```

Builds the app for production to the `dist` folder.

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── admin/          # Admin panel components
│   ├── common/         # Reusable components
│   ├── layout/         # Layout components
│   └── [category]/     # Category-specific components
├── contexts/           # React Context providers
│   ├── CartContext.jsx
│   └── AdminContext.jsx
├── pages/              # Page components
│   ├── HomePage.jsx
│   ├── AdminLogin.jsx
│   ├── AdminDashboard.jsx
│   └── [category].jsx
├── lib/                # Utility functions
├── App.jsx             # Main app component
└── main.jsx            # Entry point
```

## 🔧 Environment Variables

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 🚀 Features

- Customer authentication via Firebase
- Shopping cart with localStorage
- Product browsing by categories
- Admin panel for product management
- Responsive design
- Dark mode support
- Toast notifications

## 📱 Routes

### Customer Routes
- `/` - Home page
- `/login` - Customer login
- `/register` - Customer registration
- `/cart` - Shopping cart
- `/checkout` - Checkout page
- `/[category]` - Category pages (fashion, jewelry, etc.)

### Admin Routes
- `/admin/login` - Admin login
- `/admin/dashboard` - Admin dashboard
- `/admin/products` - Manage products
- `/admin/products/new` - Add new product
- `/admin/products/edit/:id` - Edit product

## 🎨 Customization

Tailwind config is in `vite.config.js` with Tailwind CSS v4 Vite plugin.

Colors can be customized in your CSS files using Tailwind utilities.

## 📄 License

MIT
