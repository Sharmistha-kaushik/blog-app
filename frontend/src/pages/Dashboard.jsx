import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { User, LogOut } from "lucide-react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("rememberEmail") || "Guest";

  const handleLogout = () => {
    toast((t) => (
      <div>
        <p className="text-gray-800 font-medium">
          Are you sure you want to logout?
        </p>
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => {
              localStorage.removeItem("rememberEmail");
              toast.dismiss(t.id);
              toast.success("Logged out successfully");
              setTimeout(() => navigate("/login"), 800);
            }}
            className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:scale-105 transition"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="bg-gray-300 text-gray-900 px-3 py-1 rounded text-sm hover:scale-105 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };

  const features = [
    {
      title: "📊 Analytics",
      desc: "Track your recent activities and performance.",
      color: "from-purple-500 to-pink-500",
      link: "/analytics",
    },
    {
      title: "📝 Manage Posts",
      desc: "Create, edit, and delete your blog posts easily.",
      color: "from-blue-500 to-indigo-500",
      link: "/posts",
    },
    {
      title: "⚙️ Settings",
      desc: "Update your profile and preferences.",
      color: "from-green-500 to-emerald-500",
      link: "/settings",
    },
    {
      title: "💬 Messages",
      desc: "Check notifications and user messages.",
      color: "from-red-500 to-orange-500",
      link: "/messages",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 flex flex-col items-center justify-start pt-10 px-6 transition-all duration-500">
      
      {/* 🏠 Dashboard Card */}
      <motion.div
        className="max-w-3xl w-full p-6 bg-white rounded-2xl shadow-lg border border-gray-200"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Welcome to Your Dashboard
        </h1>

        <div className="flex items-center justify-center gap-4 mb-6">
          <User className="text-purple-500" size={32} />
          <div>
            <p className="text-lg font-semibold text-gray-800">
              {userEmail}
            </p>
            <p className="text-gray-500">
              You are now logged in 🎉
            </p>
          </div>
        </div>

        {/* 🚀 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={feature.link}>
                <div
                  className={`p-5 bg-gradient-to-r ${feature.color} text-white rounded-xl shadow-md hover:shadow-xl transition`}
                >
                  <h2 className="text-xl font-bold">{feature.title}</h2>
                  <p className="mt-2 text-sm">{feature.desc}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* 🔴 Logout Button */}
        <div className="flex justify-center">
          <button
            onClick={handleLogout}
            className="mt-8 flex items-center gap-2 px-6 py-2 bg-red-500 text-white font-semibold rounded-full shadow hover:scale-105 transition"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </motion.div>
    </div>
  );
}
