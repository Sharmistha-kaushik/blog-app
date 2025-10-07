import { useState } from "react";
import axios from "axios";

export default function AddFriend({ user }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔍 Search Users by Name or Email
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:5000/api/users/search/${query}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      setResults(data);
    } catch (error) {
      console.error("Search error:", error.response?.data || error.message);
      alert("Failed to search users");
    } finally {
      setLoading(false);
    }
  };

  // ➕ Send Friend Request (using user ID)
  const handleAddFriend = async (id) => {
    try {
      await axios.post(
        `http://localhost:5000/api/users/add-friend/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      alert("✅ Friend request sent!");
    } catch (error) {
      console.error("Add friend error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "❌ Error sending request");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow rounded-lg">
      <h2 className="font-bold text-xl mb-4">Add Friends</h2>

      {/* 🔎 Search Box */}
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by name or email"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Search
        </button>
      </form>

      {/* 🧾 Search Results */}
      {loading ? (
        <p>Searching...</p>
      ) : results.length === 0 ? (
        <p>No users found</p>
      ) : (
        <ul className="space-y-3">
          {results.map((u) => (
            <li
              key={u._id}
              className="flex items-center justify-between bg-gray-100 p-3 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <img
                  src={u.avatar || "https://via.placeholder.com/40"}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-medium">{u.name}</p>
                  <p className="text-sm text-gray-500">{u.email}</p>
                </div>
              </div>
              <button
                onClick={() => handleAddFriend(u._id)}
                className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Add
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
