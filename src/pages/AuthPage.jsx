import { useState } from "react";
import { registerUser, loginUser } from "../server/firebase/authService";
import { saveUserToFirestore } from "../server/firebase/firestoreService";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isLogin) {
        const loggedInUser = await loginUser(email, password);
        alert("Logged in successfully!");
        navigate("/");
      } else {
        const newUser = await registerUser(email, password);
        await saveUserToFirestore(newUser.user);
        alert("Registered successfully!");
        navigate("/");
      }
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md shadow-2xl border border-gray-200">
        <CardHeader>
          <CardTitle className="text-3xl font-semibold text-center">
            {isLogin ? "Welcome Back to LocalKart" : "Create an Account"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="text-lg py-2"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="text-lg py-2"
            />
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <Button
              type="submit"
              disabled={loading}
              className="w-full text-lg py-3 mt-2"
            >
              {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:underline mt-2 text-sm"
          >
            {isLogin
              ? "New here? Create an account"
              : "Already have an account? Log in"}
          </button>
        </CardFooter>
      </Card>
    </div>
  );
}
