import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { Loader2 } from "lucide-react";

export default function BlogForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("https://jsonplaceholder.typicode.com/posts", {
        title,
        body: content,
      });
      toast.success("Blog submitted successfully!");
      setTitle("");
      setContent("");
    } catch {
      toast.error("Failed to submit blog!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white dark:bg-gray-800 shadow-xl rounded-xl bg-opacity-95 backdrop-blur-md">
      <Toaster position="top-right" />
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200 text-center">
        ✍️ Add New Blog
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Title */}
        <div>
          <input
            type="text"
            placeholder="Enter blog title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            maxLength={80}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-gray-200 transition transform duration-200 hover:scale-105"
            required
          />
          <p className="text-sm text-gray-500 mt-1 text-right">
            {title.length}/80
          </p>
        </div>

        {/* Content */}
        <div>
          <textarea
            placeholder="Write your blog content..."
            value={content}
            onChange={e => setContent(e.target.value)}
            rows={6}
            maxLength={500}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-gray-200 transition transform duration-200 hover:scale-105"
            required
          />
          <p className="text-sm text-gray-500 mt-1 text-right">
            {content.length}/500
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-md hover:scale-105 transition transform duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Blog"
          )}
        </button>
      </form>
    </div>
  );
}
