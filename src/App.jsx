import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./firebase/config"

import { Navbar } from "./components/layout/Navbar"
import { HeroSection } from "./components/layout/HeroSection"
import { Footer } from "./components/layout/Footer"
import AuthPage from "./pages/AuthPage"

// Landing page layout (shown after login)
function LandingPage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Footer />
    </>
  )
}

export default function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-gray-600 text-lg">
        Loading...
      </div>
    )

  return (
    <Router>
      <Routes>
        {/* Landing page */}
        <Route
          path="/"
          element={user ? <LandingPage /> : <Navigate to="/auth" replace />}
        />

        {/* Auth page (login/signup) */}
        <Route
          path="/auth"
          element={!user ? <AuthPage /> : <Navigate to="/" replace />}
        />
      </Routes>
    </Router>
  )
}
