import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // your React app
    methods: ["GET", "POST"],
  },
});

const users = new Map(); // userId -> socketId

io.on("connection", (socket) => {
  console.log("🟢 New connection:", socket.id);

  // ✅ User joins with ID
  socket.on("join", (userId) => {
    if (!userId) return;
    users.set(userId, socket.id);
    console.log(`👤 User ${userId} joined as ${socket.id}`);
    io.emit("usersOnline", Array.from(users.keys()));
  });

  // ✅ Message sending
  socket.on("sendMessage", ({ senderId, receiverId, text, time }) => {
    const receiverSocket = users.get(receiverId);
    const messageData = { senderId, text, time };
    if (receiverSocket) {
      io.to(receiverSocket).emit("receiveMessage", messageData);
    }
  });

  // ✅ Typing indicator
  socket.on("typing", ({ to, from, isTyping }) => {
    const receiverSocket = users.get(to);
    if (receiverSocket) {
      io.to(receiverSocket).emit("typing", { from, isTyping });
    }
  });

  // ✅ Call handling
  socket.on("callUser", ({ to, from, signal }) => {
    const receiverSocket = users.get(to);
    if (receiverSocket) {
      io.to(receiverSocket).emit("incomingCall", { from, signal });
      console.log(`📞 ${from} is calling ${to}`);
    }
  });

  socket.on("answerCall", ({ to, signal }) => {
    const receiverSocket = users.get(to);
    if (receiverSocket) {
      io.to(receiverSocket).emit("callAccepted", { signal });
      console.log(`✅ Call accepted by ${to}`);
    }
  });

  // ❌ Handle call end or rejection
  socket.on("endCall", ({ to }) => {
    const receiverSocket = users.get(to);
    if (receiverSocket) {
      io.to(receiverSocket).emit("callEnded");
      console.log(`🚫 Call ended with ${to}`);
    }
  });

  // 🔴 Disconnect
  socket.on("disconnect", () => {
    for (const [userId, id] of users.entries()) {
      if (id === socket.id) users.delete(userId);
    }
    io.emit("usersOnline", Array.from(users.keys()));
    console.log("🔴 Disconnected:", socket.id);
  });
});

const PORT = 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
