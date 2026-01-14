import { useAuth } from "../context/AuthContext";
import { useState, useRef, useEffect } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import {
  Phone,
  Video,
  PhoneOff,
  Send,
  Smile,
  Mic,
  Check,
  CheckCheck,
  X,
} from "lucide-react";
import EmojiPicker from "emoji-picker-react";

const BACKEND = "http://localhost:5000";

export default function ChatPage() {
  // 🟢 FIX: Take user from AuthContext
  const { user: currentUser } = useAuth();

  // If still no user logged in
  if (!currentUser) {
    return (
      <div className="p-6 text-center text-gray-800 dark:text-gray-200">
        <h2 className="text-xl font-semibold">Please log in to continue</h2>
      </div>
    );
  }

  // ---------- YOUR ORIGINAL STATE ----------
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState({});
  const [newMessage, setNewMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [typingUsers, setTypingUsers] = useState({});
  const [callInfo, setCallInfo] = useState(null);
  const [peer, setPeer] = useState(null);
  const userVideo = useRef();
  const partnerVideo = useRef();
  const connectionRef = useRef();

  // ---------- SOCKET CONNECTION ----------
  useEffect(() => {
    const s = io(BACKEND, { transports: ["websocket"] });
    setSocket(s);

    s.emit("user-online", currentUser);

    s.on("online-users", (users) => setOnlineUsers(users));
    s.on("receive-message", handleReceiveMessage);
    s.on("typing", handleReceiveTyping);
    s.on("call-user", handleIncomingCall);
    s.on("call-accepted", handleCallAccepted);

    return () => {
      s.disconnect();
    };
  }, [currentUser]);

  // ---------- HANDLE RECEIVED MESSAGE ----------
  const handleReceiveMessage = ({ senderId, text, timestamp, status }) => {
    setMessages((prev) => ({
      ...prev,
      [senderId]: [...(prev[senderId] || []), { text, timestamp, sender: senderId, status }],
    }));
  };

  // ---------- HANDLE TYPING ----------
  const handleReceiveTyping = ({ from, isTyping }) => {
    setTypingUsers((prev) => ({ ...prev, [from]: isTyping }));
  };

  // ---------- SELECT USER ----------
  const openChat = (user) => {
    setSelectedUser(user);
  };

  // ---------- SEND MESSAGE ----------
  const sendMessage = () => {
    if (!newMessage.trim() || !selectedUser) return;

    const msg = {
      senderId: currentUser.id,
      receiverId: selectedUser.id,
      text: newMessage,
      timestamp: new Date(),
      status: "sent",
    };

    socket.emit("send-message", msg);

    setMessages((prev) => ({
      ...prev,
      [selectedUser.id]: [...(prev[selectedUser.id] || []), msg],
    }));

    setNewMessage("");
  };

  // ---------- HANDLE CALLING ----------
  const startVideoCall = (user) => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      userVideo.current.srcObject = stream;

      const p = new Peer({
        initiator: true,
        trickle: false,
        stream,
      });

      p.on("signal", (data) => {
        socket.emit("call-user", { userToCall: user.id, signalData: data, from: currentUser });
      });

      p.on("stream", (stream) => {
        partnerVideo.current.srcObject = stream;
      });

      setPeer(p);
      connectionRef.current = p;

      setCallInfo({ type: "outgoing", partner: user });
    });
  };

  const handleIncomingCall = ({ from, signal }) => {
    setCallInfo({ type: "incoming", partner: from, signal });
  };

  const acceptCall = () => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      userVideo.current.srcObject = stream;

      const p = new Peer({
        initiator: false,
        trickle: false,
        stream,
      });

      p.on("signal", (data) => {
        socket.emit("answer-call", { signal: data, to: callInfo.partner.id });
      });

      p.on("stream", (stream) => {
        partnerVideo.current.srcObject = stream;
      });

      p.signal(callInfo.signal);

      setPeer(p);
      connectionRef.current = p;
      setCallInfo({ ...callInfo, type: "in-call" });
    });
  };

  const handleCallAccepted = (signal) => {
    peer.signal(signal);
    setCallInfo({ ...callInfo, type: "in-call" });
  };

  const endCall = () => {
    if (connectionRef.current) connectionRef.current.destroy();
    setCallInfo(null);
  };

  // ---------- UI ----------
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">

      {/* LEFT SIDEBAR → Online Users */}
      <div className="w-1/4 border-r border-gray-300 dark:border-gray-700 p-4">
        <h2 className="text-2xl mb-4 font-bold">Chats</h2>

        {onlineUsers
          .filter((u) => u.id !== currentUser.id)
          .map((user) => (
            <div
              key={user.id}
              onClick={() => openChat(user)}
              className={`flex items-center gap-3 p-3 rounded cursor-pointer transition
                ${selectedUser?.id === user.id ? "bg-purple-500 text-white" : "hover:bg-gray-200 dark:hover:bg-gray-800"}
              `}
            >
              <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700"></div>
              <span className="font-medium">{user.name}</span>
            </div>
          ))}
      </div>

      {/* RIGHT SIDE → Messages */}
      <div className="w-3/4 flex flex-col">
        {!selectedUser ? (
          <div className="flex items-center justify-center h-full text-lg">Select a user to chat</div>
        ) : (
          <>
            {/* CHAT HEADER */}
            <div className="p-4 border-b border-gray-300 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-xl font-semibold">{selectedUser.name}</h3>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => startVideoCall(selectedUser)}
                  className="p-2 bg-purple-600 text-white rounded-full"
                >
                  <Video size={20} />
                </button>
              </div>
            </div>

            {/* MESSAGES */}
            <div className="flex-1 p-4 overflow-y-auto">
              {(messages[selectedUser.id] || []).map((msg, i) => (
                <div
                  key={i}
                  className={`mb-3 flex ${msg.senderId === currentUser.id ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`p-2 max-w-xs rounded-lg ${
                      msg.senderId === currentUser.id
                        ? "bg-purple-500 text-white"
                        : "bg-gray-300 dark:bg-gray-700"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* TYPING INDICATOR */}
            {typingUsers[selectedUser.id] && (
              <div className="px-4 text-sm text-gray-500">Typing...</div>
            )}

            {/* MESSAGE INPUT */}
            <div className="p-3 border-t border-gray-300 dark:border-gray-700 flex items-center gap-3">
              <button onClick={() => setShowEmoji(!showEmoji)}>
                <Smile size={22} />
              </button>

              {showEmoji && (
                <div className="absolute bottom-20 left-10 z-50">
                  <EmojiPicker onEmojiClick={(e) => setNewMessage(newMessage + e.emoji)} />
                </div>
              )}

              <input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 px-3 py-2 bg-gray-200 dark:bg-gray-800 rounded outline-none"
                placeholder="Type a message..."
              />

              <button
                onClick={sendMessage}
                className="p-2 bg-purple-600 text-white rounded-full"
              >
                <Send size={20} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
