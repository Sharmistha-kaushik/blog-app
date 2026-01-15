import express from "express";
import Blog from "../models/Blog.js";

const router = express.Router();

// Get all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "name email");
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a blog
router.post("/", async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const blog = new Blog({ title, content, author });
    await blog.save();
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete blog
router.delete("/:id", async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
