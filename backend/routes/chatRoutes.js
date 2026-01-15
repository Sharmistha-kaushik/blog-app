import express from "express";

const router = express.Router();

// Send a message
router.post("/", async (req, res) => {
  try {
    const { sender, receiver, text } = req.body;
    const message = new Message({ sender, receiver, text });
    await message.save();
    res.json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get messages between two users
router.get("/:userId/:friendId", async (req, res) => {
  try {
    const { userId, friendId } = req.params;
    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: friendId },
        { sender: friendId, receiver: userId },
      ],
    }).sort({ createdAt: 1 }); // oldest → newest
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
