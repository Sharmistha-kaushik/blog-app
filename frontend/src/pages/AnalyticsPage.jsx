import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AnalyticsPage() {
  // 📈 Example data (you can later replace this with real stats from backend)
  const data = [
    { month: "Jan", views: 400, likes: 240 },
    { month: "Feb", views: 300, likes: 139 },
    { month: "Mar", views: 500, likes: 380 },
    { month: "Apr", views: 600, likes: 390 },
    { month: "May", views: 800, likes: 500 },
    { month: "Jun", views: 750, likes: 460 },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* 🏷️ Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-purple-700 mb-2">📊 Analytics</h1>
        <p className="text-gray-600">
          Insights into your performance and user engagement.
        </p>
      </div>

      {/* 🔹 Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-gray-700">Total Views</h2>
          <p className="text-3xl font-bold text-purple-700 mt-2">8,452</p>
          <p className="text-sm text-green-500 mt-1">+12% this month</p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-gray-700">Total Likes</h2>
          <p className="text-3xl font-bold text-blue-600 mt-2">3,298</p>
          <p className="text-sm text-green-500 mt-1">+8% this month</p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-gray-700">New Comments</h2>
          <p className="text-3xl font-bold text-orange-600 mt-2">1,125</p>
          <p className="text-sm text-red-500 mt-1">-3% this month</p>
        </div>
      </div>

      {/* 📊 Chart Section */}
      <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Monthly Engagement
        </h2>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="views"
                stroke="#8b5cf6"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="likes"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
