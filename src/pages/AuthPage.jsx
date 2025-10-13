import { useState } from "react";
import { registerUser, loginUser, logoutUser } from "../firebase/authService";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const handleRegister = async () => {
    try {
      const newUser = await registerUser(email, password);
      setUser(newUser);
      alert("Registered Successfully!");
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const handleLogin = async () => {
    try {
      const loggedInUser = await loginUser(email, password);
      setUser(loggedInUser);
      alert("Logged In!");
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    alert("Logged Out");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-3xl font-semibold mb-6 text-blue-600">
        LocalKart Authentication
      </h2>

      <input
        type="email"
        placeholder="Email"
        className="mb-3 p-2 border border-gray-300 rounded-md w-72"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="mb-3 p-2 border border-gray-300 rounded-md w-72"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="flex gap-3 mt-4">
        <button onClick={handleRegister} className="bg-green-500 text-white px-4 py-2 rounded-md">
          Sign Up
        </button>
        <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Login
        </button>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md">
          Logout
        </button>
      </div>

      {user && (
        <p className="mt-5 text-green-700">
          Logged in as: {user.email}
        </p>
      )}
    </div>
  );
}
