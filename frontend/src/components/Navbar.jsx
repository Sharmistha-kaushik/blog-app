import { NavLink, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { Sun, Moon, Search, UserCog } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ onSearch }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();   // ⭐ AUTH FROM CONTEXT
  const { theme, toggleTheme } = useTheme();

  const [profileMenu, setProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchQuery.trim());
  };

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 font-medium text-gray-100 dark:text-white border-b-2 transition-colors duration-300 ${
      isActive ? "border-white dark:border-white" : "border-transparent"
    } hover:border-gray-300`;

  return (
    <nav className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 dark:text-white flex justify-between items-center px-6 py-3 shadow-md">
      <h1 className="text-lg font-bold cursor-pointer" onClick={() => navigate("/")}>
        MyBlogApp
      </h1>

      {/* LINKS */}
      <div className="flex items-center gap-6">
        <NavLink to="/" className={navLinkClass}>Home</NavLink>
        <NavLink to="/blogs" className={navLinkClass}>Blogs</NavLink>
        <NavLink to="/add-blog" className={navLinkClass}>Add Blog</NavLink>
        <NavLink to="/chat" className={navLinkClass}>Chat</NavLink>
        <NavLink to="/friends" className={navLinkClass}>Friends</NavLink>
        <NavLink to="/dashboard" className={navLinkClass}>My Dashboard</NavLink>
        

        {/* SEARCH */}
        <form
          onSubmit={handleSearch}
          className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1"
        >
          <input
            type="text"
            placeholder="Search blogs..."
            className="bg-transparent outline-none px-2 text-sm text-gray-900 dark:text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button><Search size={18} /></button>
        </form>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* ⭐ USER LOGGED IN */}
        {user ? (
          <div className="relative">
            <button
              onClick={() => setProfileMenu(!profileMenu)}
              className="w-10 h-10 rounded-full overflow-hidden border"
            >
              <img
                src={user.profilePic || "https://via.placeholder.com/40"}
                className="w-full h-full object-cover"
              />
            </button>

            {profileMenu && (
              <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-lg w-40">
                <NavLink
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Profile
                </NavLink>

                {user.isAdmin && (
                  <NavLink
                    to="/admin"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <UserCog size={16} /> Admin Panel
                  </NavLink>
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
            <NavLink to="/login" className="bg-red-500 text-white px-3 py-1 rounded">
              Login
            </NavLink>
            <NavLink to="/register" className="bg-green-500 text-white px-3 py-1 rounded">
              Register
            </NavLink>
          </div>
        )}
      </div>
      
    </nav>
  );
}
