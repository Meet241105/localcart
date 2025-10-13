import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/firebase/config"

import AuthPage from "@/pages/AuthPage"
import HomePage from "@/pages/HomePage"

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
        <Route path="/" element={user ? <HomePage /> : <Navigate to="/auth" replace />} />
        <Route path="/auth" element={!user ? <AuthPage /> : <Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}
