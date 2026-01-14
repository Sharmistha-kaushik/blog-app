import { Edit2, Trash2 } from "lucide-react";

export default function ManagePostsPage() {
  // 📝 Example static post data
  const posts = [
    {
      id: 1,
      title: "How to Learn React Effectively",
      category: "Web Development",
      date: "2025-09-25",
      status: "Published",
    },
    {
      id: 2,
      title: "Top 10 JavaScript Tips for Beginners",
      category: "Programming",
      date: "2025-09-12",
      status: "Draft",
    },
    {
      id: 3,
      title: "Understanding Tailwind CSS",
      category: "Design",
      date: "2025-08-29",
      status: "Published",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-purple-700 mb-2">
          🧾 Manage Posts
        </h1>
        <p className="text-gray-600">
          View, edit, or delete your existing blog posts easily.
        </p>
      </div>

      {/* Posts Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-xl border border-gray-100 p-6">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-700 uppercase text-sm">
              <th className="py-3 px-4 rounded-tl-lg">Title</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 rounded-tr-lg text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {posts.map((post) => (
              <tr
                key={post.id}
                className="border-b border-gray-200 hover:bg-gray-50 transition"
              >
                <td className="py-3 px-4 font-medium">{post.title}</td>
                <td className="py-3 px-4">{post.category}</td>
                <td className="py-3 px-4">{post.date}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 text-sm font-semibold rounded-full ${
                      post.status === "Published"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {post.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <button className="inline-flex items-center px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition">
                    <Edit2 size={16} className="mr-1" /> Edit
                  </button>
                  <button className="inline-flex items-center px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg transition ml-2">
                    <Trash2 size={16} className="mr-1" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
