import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function Login({ setCurrentUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      // Hardcoded role assignment
      const role = email === "admin@example.com" ? "admin" : "user";

      const userData = { email, role };

      // Save to localStorage
      localStorage.setItem("userInfo", JSON.stringify(userData));

      // Update App.jsx state
      setCurrentUser(userData);

      toast.success(`Logged in as ${role}`);

      // Redirect after login
      navigate("/");
    } else {
      toast.error("Please fill all fields");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br bg-white p-4">
      <Toaster position="top-right" />

      <div className="w-full max-w-xl p-10 bg-white dark:bg-gray-800 shadow-2xl rounded-2xl animate-fadeIn">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">
          Login
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-4 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-gray-200 transition transform duration-200 hover:scale-105"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-4 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-gray-200 transition transform duration-200 hover:scale-105"
            required
          />

          <button className="px-6 py-3 text-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transition transform duration-200">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
