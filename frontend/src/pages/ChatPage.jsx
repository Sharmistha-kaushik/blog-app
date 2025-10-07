import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Smile, Send, Image as ImageIcon, Circle } from "lucide-react";
import EmojiPicker from "emoji-picker-react";

export default function ChatPage({ currentUser }) {
  const [friends, setFriends] = useState([
    { id: 1, name: "Aditi Sharma", online: true, unread: 2 },
    { id: 2, name: "Roshni Mehta", online: false, unread: 0 },
    { id: 3, name: "Arpita Sharma", online: true, unread: 0 },
    { id: 3, name: "srishti Sharma", online: true, unread: 3 },
    { id: 3, name: "khushi Sharma", online: false, unread: 0 },
  ]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (activeChat) {
      // Temporary: Load demo messages
      setMessages([
        { id: 1, sender: "them", text: "Hey! How are you?", time: "10:20 AM" },
        { id: 2, sender: "me", text: "I'm good! How about you?", time: "10:22 AM" },
        { id: 1, sender: "them", text: "I'm also good ! , what r u doing ?", time: "10:22 AM" },
        { id: 1, sender: "me", text: "I'm doing nothing and u ?", time: "10:22 AM" },
        { id: 1, sender: "them", text: "I'm also doing nothing !!", time: "10:22 AM" },
        { id: 1, sender: "me", text: "khana khaya !!", time: "10:22 AM" },
        { id: 1, sender: "them", text: " mene khana nii khaya !!", time: "10:22 AM" },
        { id: 1, sender: "me", text: " kyuu ", time: "10:22 AM"},
        { id: 1, sender: "them", text: " meri mummy ne khana nii diya !", time: "10:22 AM"},
        { id: 1, sender: "me", text: " kyuu", time: "10:22 AM"},
        { id: 1, sender: "them", text: " merii tbiyt ki tbiyat sahii ni h toh khana hii nii bnaya", time: "10:22 AM"},
        { id: 1, sender: "me", text: " tu bna le", time: "10:22 AM"},
        { id: 1, sender: "them", text: " okk...m bna rhi hu aaja dono khayenge", time: "10:22 AM"},
        { id: 1, sender: "me", text: " kya bna rhi h", time: "10:22 AM"},
        { id: 1, sender: "them", text: " pakodii", time: "10:22 AM"},
        { id: 1, sender: "me", text: " chal aata hu", time: "10:22 AM"},
        { id: 1, sender: "them", text: " theek h aaja ", time: "10:22 AM"},
        { id: 1, sender: "me", text: " m nahi aa raha tu kha le pakoodiiii ", time: "10:22 AM"},
        { id: 1, sender: "them", text: " theek h m saari kha jaungi...mt aa tuu", time: "10:22 AM"},
        { id: 1, sender: "me", text: " kha le chal nikal", time: "10:22 AM"},
        { id: 1, sender: "them", text: " hatt", time: "14:45 pM"},
      ]);
    }
  }, [activeChat]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    const newMsg = {
      id: Date.now(),
      sender: "me",
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, newMsg]);
    setNewMessage("");
  };

  const onEmojiClick = (emojiData) => {
    setNewMessage((prev) => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="flex h-[calc(100vh-70px)] bg-gradient-to-br from-slate-900 via-purple-900 to-pink-900 text-white mt-0">
      {/* Sidebar */}
      <div className="w-1/4 bg-peach-600 border-r border-slate-700 flex flex-col">
        <div className="p-4 font-semibold text-lg border-b border-slate-700">Friends</div>
        <div className="p-2 space-y-2 overflow-y-auto">
          {friends.map((f) => (
            <motion.div
              whileHover={{ scale: 1.02 }}
              key={f.id}
              className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                activeChat?.id === f.id ? "bg-purple-600" : "hover:bg-slate-700"
              }`}
              onClick={() => setActiveChat(f)}
            >
              <div>
                <div className="flex items-center gap-2">
                  <Circle
                    className={`h-3 w-3 ${
                      f.online ? "text-green-400" : "text-gray-400"
                    }`}
                    fill={f.online ? "green" : "gray"}
                  />
                  <p>{f.name}</p>
                </div>
                {f.unread > 0 && (
                  <span className="text-xs bg-pink-600 px-2 py-0.5 rounded-full">
                    {f.unread}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col from bg-purple-500 to bg-pink-500">
        {activeChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 flex justify-between items-center bg-slate-600 border-b border-slate-700">
              <h2 className="font-semibold">{activeChat.name}</h2>
              <p className="text-sm text-gray-400">
                {activeChat.online ? "Online" : "Offline"}
              </p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`max-w-md p-3 rounded-2xl ${
                    msg.sender === "me"
                      ? "ml-auto bg-gradient-to-r from-purple-600 to-pink-600"
                      : "bg-slate-700"
                  }`}
                >
                  <p>{msg.text}</p>
                  <p className="text-xs text-gray-300 mt-1 text-right">{msg.time}</p>
                </motion.div>
              ))}
              <div ref={chatEndRef}></div>
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-slate-700 flex items-center gap-2 bg-slate-800">
              <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                <Smile className="text-gray-300 hover:text-pink-500" />
              </button>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type a message..."
                className="flex-1 p-2 rounded-xl bg-slate-700 text-white outline-none"
              />
              <label className="cursor-pointer">
                <ImageIcon className="text-gray-300 hover:text-pink-500" />
                <input type="file" className="hidden" />
              </label>
              <button
                onClick={handleSend}
                className="p-2 bg-pink-600 rounded-xl hover:bg-pink-700 transition-all"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>

            {/* Emoji Picker */}
            {showEmojiPicker && (
              <div className="absolute bottom-20 left-1/3">
                <EmojiPicker onEmojiClick={onEmojiClick} theme="dark" />
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center text-gray-400 text-lg">
            Select a friend to start chatting 💬
          </div>
        )}
      </div>
    </div>
  );
}
