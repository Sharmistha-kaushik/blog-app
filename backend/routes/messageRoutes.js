import express from "express";
import Message from "../models/message.js";

const router = express.Router();

// Get messages between two users
router.get("/:userId/:friendId", async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.params.userId, receiver: req.params.friendId },
        { sender: req.params.friendId, receiver: req.params.userId },
      ],
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Send a new message
router.post("/", async (req, res) => {
  try {
    const newMsg = new Message(req.body);
    await newMsg.save();
    res.status(201).json(newMsg);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
