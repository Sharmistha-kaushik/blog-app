import { Link } from "react-router-dom";
import { BarChart3, FileText, Settings, MessageCircle } from "lucide-react";

export default function DashboardHome() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* 🏷️ Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-purple-700 mb-2">
          Welcome to Your Dashboard
        </h1>
        <p className="text-gray-600">
          Quick overview of your analytics, posts, settings, and messages.
        </p>
      </div>

      {/* 🟦 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {/* Analytics */}
        <Link
          to="/dashboard/analytics"
          className="p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl border border-gray-200 hover:border-purple-300 transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="p-4 bg-purple-100 rounded-xl group-hover:bg-purple-200 transition">
              <BarChart3 size={32} className="text-purple-700" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-purple-700">
                Analytics
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                Track user stats, views, and performance.
              </p>
            </div>
          </div>
        </Link>

        {/* Manage Posts */}
        <Link
          to="/dashboard/manage-posts"
          className="p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl border border-gray-200 hover:border-blue-300 transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="p-4 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition">
              <FileText size={32} className="text-blue-700" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-blue-700">
                Manage Posts
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                Create, edit, or delete your blog posts easily.
              </p>
            </div>
          </div>
        </Link>

        {/* Settings */}
        <Link
          to="/dashboard/settings"
          className="p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl border border-gray-200 hover:border-green-300 transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="p-4 bg-green-100 rounded-xl group-hover:bg-green-200 transition">
              <Settings size={32} className="text-green-700" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-green-700">Settings</h2>
              <p className="text-gray-600 text-sm mt-1">
                Update your profile and preferences.
              </p>
            </div>
          </div>
        </Link>

        {/* Messages */}
        <Link
          to="/dashboard/messages"
          className="p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl border border-gray-200 hover:border-orange-300 transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="p-4 bg-orange-100 rounded-xl group-hover:bg-orange-200 transition">
              <MessageCircle size={32} className="text-orange-700" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-orange-700">
                Messages
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                Check your notifications and recent messages.
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
