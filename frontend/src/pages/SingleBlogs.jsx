import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function SingleBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    // localStorage se blogs uthao
    const savedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
    const foundBlog = savedBlogs.find((b) => String(b.id) === id);
    setBlog(foundBlog);
  }, [id]);

  if (!blog) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold">Blog not found</h2>
        <button
          onClick={() => navigate("/blogs")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Back to Blogs
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">{blog.title}</h1>
      <p className="text-gray-500 text-sm mb-6">
        ✍️ {blog.author} | 🗓 {new Date(blog.id).toLocaleDateString()}
      </p>
      <p className="text-gray-800 leading-relaxed whitespace-pre-line">{blog.content}</p>

      <button
        onClick={() => navigate("/blogs")}
        className="mt-6 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition"
      >
        ← Back to Blogs
      </button>
    </div>
  );
}
