import express from "express";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import friendRoutes from "./routes/friendRoutes.js";
import Message from "./models/message.js";

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose
  .connect("mongodb://127.0.0.1:27017/blogging-platform", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB error:", err.message));

// API routes
app.use("/api/users", userRoutes);
app.use("/api/friends", friendRoutes);

// Messages API
app.get("/api/messages/:user1/:user2", async (req, res) => {
  const { user1, user2 } = req.params;
  try {
    const messages = await Message.find({
      $or: [
        { sender: user1, receiver: user2 },
        { sender: user2, receiver: user1 },
      ],
    }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/messages", async (req, res) => {
  try {
    const newMsg = new Message(req.body);
    await newMsg.save();
    res.status(201).json(newMsg);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create HTTP + WebSocket server
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // your frontend
    methods: ["GET", "POST"],
  },
});

// Store online users
let onlineUsers = {};

io.on("connection", (socket) => {
  console.log("🔌 A user connected:", socket.id);

  // User joins
  socket.on("user_connected", (userId) => {
    onlineUsers[userId] = socket.id;
    console.log("✅ User online:", userId);
  });

  // Send message
  socket.on("send_message", async (data) => {
    const { toUserId, message, fromUser } = data;

    // Save in DB
    const msgDoc = new Message({
      sender: fromUser._id,
      receiver: toUserId,
      text: message,
    });
    await msgDoc.save();

    // Emit to receiver if online
    const targetSocketId = onlineUsers[toUserId];
    if (targetSocketId) {
      io.to(targetSocketId).emit("receive_message", {
        from: fromUser.name || fromUser.email,
        message,
      });
    }
  });

  // Disconnect
  socket.on("disconnect", () => {
    console.log("❌ A user disconnected:", socket.id);
    for (let userId in onlineUsers) {
      if (onlineUsers[userId] === socket.id) {
        delete onlineUsers[userId];
        break;
      }
    }
  });
});

// Start server
const PORT = 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
