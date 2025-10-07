import { useState, useEffect } from "react";
import BlogCard from "../components/BlogCard";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);

  // LocalStorage se blogs load karna
  const loadBlogs = () => {
    const savedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
    setBlogs(savedBlogs);
  };

  useEffect(() => {
    loadBlogs();

    // Jab localStorage update ho to blogs refresh ho jaye
    const handleStorageChange = () => {
      loadBlogs();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">📚 All Blogs</h1>

      {blogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No blogs available. Please add one!</p>
      )}
    </div>
  );
}


