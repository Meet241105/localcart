"use client";
import { useState, useEffect } from "react";
import { ShoppingCart, User, Menu, LogOut } from "lucide-react";
import { logoutUser } from "@/server/firebase/authService";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/server/firebase/config";
import { useNavigate } from "react-router-dom";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Detect auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Logout
  const handleLogout = async () => {
    await logoutUser();
    navigate("/auth");
  };

  const categories = [
    "Home & Decor",
    "Fashion & Apparel",
    "Jewelry & Accessories",
    "Handicrafts & Gifts",
    "Personal Care & Wellness",
    "Toys",
    "Kitchen & Dining",
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      {/* Top Section */}
      <div className="flex items-center justify-between px-4 sm:px-8 py-3">
        {/* Left - Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src="/logo.png"
            alt="LocalKart Logo"
            className="w-8 h-8 object-cover rounded-full"
          />
          <h1 className="text-xl font-bold text-emerald-600 tracking-wide">
            LocalKart
          </h1>
        </div>

        {/* Middle - Search Bar */}
        <div className="hidden sm:flex flex-1 mx-6">
          <input
            type="text"
            placeholder="Search for handmade products..."
            className="w-full border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
          <button className="bg-emerald-600 text-white px-4 py-2 rounded-r-md hover:bg-emerald-700">
            Search
          </button>
        </div>

        {/* Right - Icons */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 hover:text-red-600"
              >
                <LogOut size={20} />
                <span className="hidden sm:inline text-sm">Logout</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/auth")}
              className="flex items-center gap-1 hover:text-emerald-600"
            >
              <User size={20} />
              <span className="hidden sm:inline text-sm">Login</span>
            </button>
          )}

          <button className="flex items-center gap-1 hover:text-emerald-600">
            <ShoppingCart size={20} />
            <span className="hidden sm:inline text-sm">Cart</span>
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden p-2 rounded-md border border-gray-300"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="sm:hidden px-4 pb-2">
        <input
          type="text"
          placeholder="Search handmade items..."
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
      </div>

      {/* Category Links */}
      <div className="bg-emerald-600 text-white text-sm font-medium overflow-x-auto">
        <div className="flex items-center gap-6 px-4 py-2 min-w-max">
          {categories.map((cat) => (
            <a
              key={cat}
              href="#"
              className="whitespace-nowrap hover:text-yellow-300 transition"
            >
              {cat}
            </a>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden bg-white border-t border-gray-200 px-4 py-3">
          <ul className="space-y-2">
            {categories.map((cat) => (
              <li key={cat}>
                <a
                  href="#"
                  className="block text-gray-700 hover:text-emerald-600"
                >
                  {cat}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
