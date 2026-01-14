import { Link } from "react-router-dom";
import { useState } from "react";

export default function SettingsPage() {
  const [username, setUsername] = useState("Shubhi");
  const [email, setEmail] = useState("shubhi00@gmail.com");

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-2 text-gray-800">⚙️ Settings</h1>
      <p className="text-gray-600 mb-8">Update your profile and preferences.</p>

      <form className="bg-gray-50 p-6 rounded-xl shadow-md w-[80%] max-w-md">
        <label className="block mb-4">
          <span className="text-gray-700 font-medium">Username</span>
          <input
            type="text"
            className="mt-2 w-full border rounded-lg p-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700 font-medium">Email</span>
          <input
            type="email"
            className="mt-2 w-full border rounded-lg p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
          Save Changes
        </button>
      </form>

      <Link to="/dashboard" className="mt-8 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
        ← Back to Dashboard
      </Link>
    </div>
  );
}
