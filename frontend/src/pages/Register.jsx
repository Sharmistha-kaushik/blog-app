import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function Register({ setCurrentUser }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (firstName && lastName && email && password) {
      const role = email === "admin@example.com" ? "admin" : "user";
      const userData = { firstName, lastName, email, role };

      // localStorage me save karna
      localStorage.setItem("userInfo", JSON.stringify(userData));

      // App.jsx me state update karna
      setCurrentUser(userData);

      toast.success(`Welcome ${firstName} ${lastName} (${role})`);
      navigate("/");
    } else {
      toast.error("Please fill all fields");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br p-4">
      <Toaster position="top-right" />
      <div className="w-full max-w-xl p-10 bg-white dark:bg-gray-800 shadow-2xl rounded-2xl animate-fadeIn">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">
          Register
        </h1>
        <form onSubmit={handleRegister} className="flex flex-col gap-6">
          {/* First Name */}
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="border p-4 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-gray-200"
            required
          />

          {/* Last Name */}
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="border p-4 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-gray-200"
            required
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-4 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-gray-200"
            required
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-4 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-gray-200"
            required
          />

          {/* Submit Button */}
          <button className="px-6 py-3 text-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg shadow-lg">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
