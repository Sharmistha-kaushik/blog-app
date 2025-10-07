import { Link } from "react-router-dom";

export default function BlogCard({ blog }) {
  return (
    <div className="border rounded-lg shadow-md p-5 bg-white hover:shadow-xl transition duration-300">
      {/* Blog Title */}
      <h2 className="text-2xl font-bold text-blue-700 mb-3">{blog.title}</h2>

      {/* Blog Content Preview */}
      <p className="text-gray-700 mb-4">
        {blog.content.length > 120
          ? blog.content.substring(0, 120) + "..."
          : blog.content}
      </p>

      {/* Footer */}
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>✍️ {blog.author}</span>
        <span>🗓 {new Date(blog.id).toLocaleDateString()}</span>
      </div>

      {/* Read More Button */}
      <div className="mt-4">
        <Link
          to={`/blogs/${blog.id}`}
          className="text-blue-600 hover:underline"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
}
