import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { Sun, Moon, Search, UserCog } from "lucide-react";
import { useTheme } from "../context/ThemeContext"; // ✅ sahi import

export default function Navbar({ currentUser, setCurrentUser, onSearch }) {
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useTheme();
  const [profileMenu, setProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const menuRef = useRef(null);

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setCurrentUser(null);
    navigate("/login");
  };

  // ✅ Search handler
  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery.trim());
    }
  };

  return (
    <nav className="bg-white bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 dark:text-white flex justify-between items-center px-6 py-3 shadow-md transition-colors duration-300">
      {/* Left Logo */}
      <div className="flex items-center gap-2">
        <h1
          className="text-lg font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          MyBlogApp
        </h1>
      </div>

      {/* Center Section → Links + Search */}
      <div className="flex items-center gap-6">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="/blogs" className="hover:underline">
          Blogs
        </Link>
        <Link to="/add-blog" className="hover:underline">
          Add Blog
        </Link>
        <Link to="/chat" className="hover:underline">
          Chat
        </Link>
        
        <Link to="/friends">Friends</Link>
        <Link to="/Dashboard">MY Dashboard</Link>



        {/* ✅ Search Bar */}
        <form
          onSubmit={handleSearch}
          className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1"
        >
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent outline-none px-2 text-sm text-gray-900 dark:text-white"
          />
          <button type="submit" title="Search">
            <Search size={18} />
          </button>
        </form>
      </div>

      {/* Right Section → Theme + Profile/Admin */}
      <div className="flex items-center gap-4 relative">
        {/* Theme toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          title="Toggle Dark/Light Mode"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Profile / Auth Buttons */}
        {currentUser ? (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setProfileMenu(!profileMenu)}
              className="w-10 h-10 rounded-full border border-gray-300 overflow-hidden"
            >
              <img
                src={
                  currentUser.profilePic ||
                  "https://via.placeholder.com/40x40.png?text=U"
                }
                alt="profile"
                className="w-full h-full object-cover"
              />
            </button>

            {profileMenu && (
              <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg shadow-lg z-10">
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setProfileMenu(false)}
                >
                  Profile
                </Link>

                {/* ✅ Admin Dashboard (only for admins) */}
                {currentUser?.isAdmin && (
                  <Link
                    to="/admin"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setProfileMenu(false)}
                  >
                    <UserCog size={16} /> Admin Panel
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
