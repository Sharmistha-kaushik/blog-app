import express from "express";
import Notification from "../models/Notification.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get my notifications
router.get("/", protect, async (req, res) => {
  const notifications = await Notification.find({ user: req.user._id })
    .populate("sender", "name avatar")
    .sort({ createdAt: -1 });

  res.json(notifications);
});

// Mark notification as read
router.put("/:id/read", protect, async (req, res) => {
  const notification = await Notification.findById(req.params.id);
  if (!notification) return res.status(404).json({ message: "Not found" });

  notification.isRead = true;
  await notification.save();
  res.json({ message: "Marked as read" });
});

export default router;
