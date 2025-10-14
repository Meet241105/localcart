"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { loginUser } from "../server/firebase/authService"
import { Moon, Sun, Mail, Lock, Eye, EyeOff } from "lucide-react"

export default function Login({ darkMode, setDarkMode }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      await loginUser(email, password)
      navigate("/")
    } catch (err) {
      setError(err.message || "Failed to login")
    }
    setLoading(false)
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 flex flex-col ${
        darkMode
          ? "bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-800 text-white"
          : "bg-gradient-to-br from-emerald-50 via-white to-emerald-100 text-gray-800"
      }`}
    >
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full border border-emerald-400/40 hover:bg-emerald-100 dark:hover:bg-neutral-700 transition"
        >
          {darkMode ? (
            <Sun className="h-5 w-5 text-emerald-400" />
          ) : (
            <Moon className="h-5 w-5 text-emerald-600" />
          )}
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">
              Local<span className="text-emerald-600 dark:text-emerald-400">Kart</span>
            </h1>
            <p
              className={`text-sm ${
                darkMode ? "text-neutral-400" : "text-gray-600"
              }`}
            >
              Welcome back to local shopping
            </p>
          </div>

          {/* Login Card */}
          <div
            className={`p-8 rounded-2xl shadow-2xl backdrop-blur-sm border transition ${
              darkMode
                ? "bg-neutral-800/50 border-neutral-700/50"
                : "bg-white/70 border-emerald-200/50"
            }`}
          >
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">
                {darkMode ? "Sign In" : "Sign In"}
              </h2>
              <p
                className={`text-sm ${
                  darkMode ? "text-neutral-400" : "text-gray-600"
                }`}
              >
                Enter your credentials to access your account
              </p>
            </div>

            {error && (
              <div
                className={`mb-6 p-4 border rounded-lg ${
                  darkMode
                    ? "bg-red-500/10 border-red-500/20"
                    : "bg-red-100 border-red-200"
                }`}
              >
                <p className="text-red-500 text-sm font-medium">{error}</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <label
                  className={`text-sm font-medium ${
                    darkMode ? "text-neutral-300" : "text-gray-700"
                  }`}
                >
                  Email
                </label>
                <div className="relative">
                  <Mail
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                      darkMode ? "text-neutral-500" : "text-emerald-500"
                    }`}
                  />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full rounded-xl px-12 py-3 text-sm focus:outline-none border transition-all duration-200 ${
                      darkMode
                        ? "bg-neutral-900/80 border-neutral-700 text-white placeholder-neutral-500 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
                        : "bg-white border-emerald-200 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                    }`}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label
                  className={`text-sm font-medium ${
                    darkMode ? "text-neutral-300" : "text-gray-700"
                  }`}
                >
                  Password
                </label>
                <div className="relative">
                  <Lock
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                      darkMode ? "text-neutral-500" : "text-emerald-500"
                    }`}
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full rounded-xl px-12 py-3 pr-12 text-sm focus:outline-none border transition-all duration-200 ${
                      darkMode
                        ? "bg-neutral-900/80 border-neutral-700 text-white placeholder-neutral-500 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
                        : "bg-white border-emerald-200 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-[1.02] shadow-lg ${
                  darkMode
                    ? "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-emerald-500/25"
                    : "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-emerald-500/25"
                } disabled:opacity-60 disabled:cursor-not-allowed`}
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </form>

            {/* Switch */}
            <div className="mt-8 text-center">
              <p
                className={`text-sm ${
                  darkMode ? "text-neutral-400" : "text-gray-600"
                }`}
              >
                Don’t have an account?{" "}
                <button
                  onClick={() => navigate("/register")}
                  className="text-emerald-500 hover:text-emerald-600 font-medium transition-colors"
                >
                  Sign up
                </button>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
