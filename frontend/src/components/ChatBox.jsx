import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { useTheme } from "../context/ThemeContext";
import { SendHorizonal } from "lucide-react";

export default function ChatBox({ currentUser, activeChat }) {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const socketRef = useRef();
  const messagesEndRef = useRef(); // 👇 For auto-scroll
  const { darkMode } = useTheme();

  // 🔌 Initialize Socket.IO
  useEffect(() => {
    if (!currentUser) return;

    socketRef.current = io("http://localhost:5000", {
      transports: ["websocket"],
    });

    socketRef.current.emit("user_connected", currentUser._id);

    socketRef.current.on("receive_message", (data) => {
      if (
        activeChat &&
        (data.sender === activeChat._id || data.receiver === activeChat._id)
      ) {
        setMessages((prev) => [...prev, data]);
      }
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [currentUser, activeChat]);

  // 💬 Fetch previous messages
  useEffect(() => {
    if (!activeChat || !currentUser) return;

    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/messages/${currentUser._id}/${activeChat._id}`
        );
        setMessages(res.data);
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };

    fetchMessages();
  }, [activeChat, currentUser]);

  // 🧭 Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 📨 Send message
  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMsg.trim() || !activeChat) return;

    const msgData = {
      sender: currentUser._id,
      receiver: activeChat._id,
      text: newMsg,
    };

    try {
      // Emit message via socket
      socketRef.current.emit("send_message", msgData);

      // Save to DB
      const res = await axios.post("http://localhost:5000/api/messages", msgData);

      // Update instantly
      setMessages((prev) => [...prev, res.data]);
      setNewMsg("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  if (!activeChat) {
    return (
      <div
        className={`flex items-center justify-center h-full text-gray-500 ${
          darkMode ? "bg-gray-900 text-gray-400" : "bg-gray-100"
        }`}
      >
        Select a friend to start chatting 💬
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col h-full rounded-2xl shadow-md border transition-all duration-300 ${
        darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
      }`}
    >
      {/* Header */}
      <div
        className={`p-3 font-semibold rounded-t-2xl ${
          darkMode ? "bg-purple-700 text-white" : "bg-purple-500 text-white"
        }`}
      >
        Chat with {activeChat.username || activeChat.name}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-xs p-2 rounded-lg break-words ${
              msg.sender === currentUser._id
                ? "ml-auto bg-blue-500 text-white"
                : darkMode
                ? "bg-gray-700 text-white"
                : "bg-gray-200 text-gray-900"
            }`}
          >
            {msg.text}
          </div>
        ))}

        {/* 👇 Invisible div for auto-scroll */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSend}
        className={`flex items-center p-2 border-t ${
          darkMode ? "border-gray-700 bg-gray-800" : "border-gray-100 bg-gray-50"
        }`}
      >
        <input
          type="text"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          placeholder="Type a message..."
          className={`flex-1 p-2 rounded-lg border focus:outline-none transition ${
            darkMode
              ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
          }`}
        />
        <button
          type="submit"
          className="ml-2 p-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition"
        >
          <SendHorizonal className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}
