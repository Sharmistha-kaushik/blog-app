
// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import Blogs from "../components/Blogs.jsx";

export default function Home() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);

  // Simulate fetching blogs from backend
  useEffect(() => {
    const fetchBlogs = async () => {
      // Replace this with actual API call later
      const data = [
        { id: 1, title: "First Blog", content: "This is my first blog." },
        { id: 2, title: "Second Blog", content: "This is my second blog." },
        { id: 3, title: "Third Blog", content: "This is my third blog." },
        { id: 4, title: "Fourth Blog", content: "Another amazing story." },
        { id: 5, title: "Fifth Blog", content: "Blogging is fun!" },
      ];
      setBlogs(data);
    };
    fetchBlogs();
  }, []);

  return (
    <div className="p-6 space-y-12">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white rounded-2xl p-10 shadow-lg flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to My Blog Platform
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-2xl">
          Share your thoughts, read amazing stories, and connect with the
          community. Start your blogging journey today!
        </p>
        <button
          onClick={() => navigate("/add-blog")}
          className="flex items-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-gray-100 transition"
        >
          Get Started <ArrowRight className="w-5 h-5" />
        </button>
      </section>

      {/* Featured Blogs */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Featured Blogs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.slice(0, 3).map((blog) => (
            <div
              key={blog.id}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition cursor-pointer"
            >
              <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
              <p className="text-gray-600 mb-4">{blog.content}</p>
              <Link
                to={`/blog/${blog.id}`}
                className="text-purple-600 font-semibold hover:underline"
              >
                Read More →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* All Blogs Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6">All Blogs</h2>
        <Blogs blogs={blogs} />
      </section>
    </div>
  );
}// src/pages/Home.jsx

     

