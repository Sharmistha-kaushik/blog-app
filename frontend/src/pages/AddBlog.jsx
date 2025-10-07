import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddBlog({ currentUser }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleAddBlog = (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert("Please fill all fields");
      return;
    }

    const existingBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
    const newBlog = {
      id: Date.now(),
      title,
      content,
      author: currentUser?.email || "Anonymous",
    };
    localStorage.setItem("blogs", JSON.stringify([newBlog, ...existingBlogs]));
    navigate("/blogs");
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">✍️ Write a New Blog</h1>
      <form onSubmit={handleAddBlog} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog title"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Content</label>
          <textarea
            className="w-full border p-2 rounded"
            rows="5"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your blog content here..."
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Publish Blog
        </button>
      </form>
    </div>
  );
}
