import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { BarChart3, FileText, Settings, MessageCircle, LogOut } from "lucide-react";

export default function DashboardLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  // Active link styling for sidebar
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
      isActive
        ? "bg-purple-600 text-white shadow-md"
        : "text-gray-700 hover:bg-gray-100 hover:text-purple-700"
    }`;

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* 🧭 Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-purple-700 mb-8 text-center">
            Dashboard
          </h2>

          <nav className="flex flex-col space-y-2">
            <NavLink to="/dashboard" end className={linkClass}>
              <BarChart3 size={20} />
              Overview
            </NavLink>

            <NavLink to="/dashboard/analytics" className={linkClass}>
              <BarChart3 size={20} />
              Analytics
            </NavLink>

            <NavLink to="/dashboard/manage-posts" className={linkClass}>
              <FileText size={20} />
              Manage Posts
            </NavLink>

            <NavLink to="/dashboard/settings" className={linkClass}>
              <Settings size={20} />
              Settings
            </NavLink>

            <NavLink to="/dashboard/messages" className={linkClass}>
              <MessageCircle size={20} />
              Messages
            </NavLink>
          </nav>
        </div>

        {/* 🚪 Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-8 flex items-center justify-center gap-2 px-4 py-2 text-red-600 border border-red-500 rounded-lg hover:bg-red-50 transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      {/* 📄 Main Content */}
      <main className="flex-1 bg-white p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
