import { Users, FileText, Settings, PlusCircle, Activity } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          <PlusCircle className="w-4 h-4" />My New Blog
        </button>
      </header>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Total Blogs</h2>
            <p className="text-2xl font-bold">124</p>
          </div>
          <FileText className="w-10 h-10 text-purple-500" />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Users</h2>
            <p className="text-2xl font-bold">56</p>
          </div>
          <Users className="w-10 h-10 text-green-500" />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Comments</h2>
            <p className="text-2xl font-bold">342</p>
          </div>
          <Activity className="w-10 h-10 text-blue-500" />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Settings</h2>
            <p className="text-2xl font-bold">⚙️</p>
          </div>
          <Settings className="w-10 h-10 text-gray-600" />
        </div>
      </div>

      {/* Recent Activity */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <ul className="space-y-3">
          <li className="p-4 bg-gray-50 rounded-lg shadow-sm flex justify-between">
            <span>User <b>@alex</b> added a new blog post.</span>
            <span className="text-sm text-gray-500">2 hrs ago</span>
          </li>
          <li className="p-4 bg-gray-50 rounded-lg shadow-sm flex justify-between">
            <span>Blog <b>"React Hooks Deep Dive"</b> was updated.</span>
            <span className="text-sm text-gray-500">5 hrs ago</span>
          </li>
          <li className="p-4 bg-gray-50 rounded-lg shadow-sm flex justify-between">
            <span>User <b>@mia</b> commented on a blog.</span>
            <span className="text-sm text-gray-500">1 day ago</span>
          </li>
        </ul>
      </section>
    </div>
  );
}
