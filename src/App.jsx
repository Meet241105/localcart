import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/server/firebase/config";
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
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-gray-600 text-lg">
        Loading...
      </div>
    );

  return (
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
      </Routes>
    </div>
  );
}
