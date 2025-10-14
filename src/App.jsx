import {BrowserRouter as Router,Routes,Route,Navigate} from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/server/firebase/config";
import Register from "@/pages/Register";
import Login from "@/pages/Login";
import HomePage from "@/pages/HomePage";

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
      </Routes>
    </div>
  );
}
