import express from "express";
import User from "../models/User.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔍 Search users by name or email
router.get("/search/:query", protect, async (req, res) => {
  try {
    const query = req.params.query;
    const users = await User.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
      ],
    }).select("-password");

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// 📩 Send Friend Request
router.post("/add-friend/:id", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const friend = await User.findById(req.params.id);

    if (!friend) return res.status(404).json({ message: "User not found" });
    if (user.friends.includes(friend._id))
      return res.status(400).json({ message: "Already friends" });
    if (friend.friendRequests.includes(user._id))
      return res.status(400).json({ message: "Request already sent" });

    friend.friendRequests.push(user._id);
    user.sentRequests = user.sentRequests || [];
    user.sentRequests.push(friend._id);

    await friend.save();
    await user.save();

    res.json({ message: "Friend request sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Accept Friend Request
router.post("/accept-friend/:id", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const sender = await User.findById(req.params.id);

    if (!sender) return res.status(404).json({ message: "User not found" });
    if (!user.friendRequests.includes(sender._id))
      return res.status(400).json({ message: "No request from this user" });

    // Remove from requests
    user.friendRequests = user.friendRequests.filter(
      (id) => id.toString() !== sender._id.toString()
    );

    // Add each other as friends
    user.friends.push(sender._id);
    sender.friends.push(user._id);

    // Remove from sender's sentRequests
    sender.sentRequests = sender.sentRequests.filter(
      (id) => id.toString() !== user._id.toString()
    );

    await user.save();
    await sender.save();

    res.json({ message: "Friend request accepted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ❌ Reject Friend Request
router.post("/reject-friend/:id", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const sender = await User.findById(req.params.id);

    user.friendRequests = user.friendRequests.filter(
      (id) => id.toString() !== req.params.id.toString()
    );

    if (sender?.sentRequests) {
      sender.sentRequests = sender.sentRequests.filter(
        (id) => id.toString() !== req.user._id.toString()
      );
      await sender.save();
    }

    await user.save();

    res.json({ message: "Friend request rejected" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// 💔 Unfriend
router.post("/unfriend/:id", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const friend = await User.findById(req.params.id);

    if (!friend) return res.status(404).json({ message: "User not found" });

    user.friends = user.friends.filter(
      (id) => id.toString() !== friend._id.toString()
    );
    friend.friends = friend.friends.filter(
      (id) => id.toString() !== user._id.toString()
    );

    await user.save();
    await friend.save();

    res.json({ message: "Unfriended successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// 📃 Get Friends List
router.get("/friends", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate(
      "friends",
      "name email avatar"
    );
    res.json(user.friends);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// 📃 Get Friend Requests
router.get("/friend-requests", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate(
      "friendRequests",
      "name email avatar"
    );
    res.json(user.friendRequests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// 📃 Get Sent Requests
router.get("/sent-requests", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate(
      "sentRequests",
      "name email avatar"
    );
    res.json(user.sentRequests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
