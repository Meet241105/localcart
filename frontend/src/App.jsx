import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { CartProvider } from "@/contexts/CartContext";
import { AdminProvider } from "@/contexts/AdminContext";
import { useUser } from "@/contexts/UserContext";
import Register from "@/pages/Register";
import Login from "@/pages/Login";
import HomePage from "@/pages/HomePage";
import HomeDecor from "@/pages/HomeDecor";
import Fashion from "@/pages/Fashion";
import Jewelry from "@/pages/Jewelry";
import Gifts from "@/pages/Gifts";
import KitchenDining from "@/pages/KitchenDining";
import Toys from "@/pages/Toys";
import PersonalCare from "@/pages/PersonalCare";
import RegionalCrafts from "@/pages/RegionalCrafts";
import SearchResults from "@/pages/SearchResults";
import MyOrders from "@/pages/MyOrders";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminProducts from "@/pages/AdminProducts";
import AdminProductForm from "@/pages/AdminProductForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const { user, loading } = useUser();
  const [darkMode, setDarkMode] = useState(false);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-gray-600 text-lg">
        Loading...
      </div>
    );

  return (
    <AdminProvider>
      <CartProvider>
        <div className={darkMode ? "dark" : ""}>
          <Routes>
            <Route
              path="/login"
              element={<Login darkMode={darkMode} setDarkMode={setDarkMode} />}
            />
            <Route
              path="/register"
              element={<Register darkMode={darkMode} setDarkMode={setDarkMode} />}
            />
            <Route
              path="/"
              element={user ? <HomePage /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/cart"
              element={<Cart darkMode={darkMode} setDarkMode={setDarkMode} />}
            />
            <Route
              path="/checkout"
              element={<Checkout darkMode={darkMode} setDarkMode={setDarkMode} />}
            />

            <Route path="/home-decor" element={<HomeDecor />} />
            <Route path="/fashion" element={<Fashion />} />
            <Route path="/jewelry" element={<Jewelry />} />
            <Route path="/gifts" element={<Gifts />} />
            <Route path="/kitchen-dining" element={<KitchenDining />} />
            <Route path="/toys" element={<Toys />} />
            <Route path="/personal-care" element={<PersonalCare />} />
            <Route path="/regional-crafts" element={<RegionalCrafts />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/my-orders" element={<MyOrders />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/products/new" element={<AdminProductForm />} />
            <Route path="/admin/products/edit/:id" element={<AdminProductForm />} />
          </Routes>
        </div>
        <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      </CartProvider>
    </AdminProvider>
  );
}
