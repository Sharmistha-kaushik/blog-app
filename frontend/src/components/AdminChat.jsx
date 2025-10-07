import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export default function AdminChat({ admin }) {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    socket.emit("user_connected", admin._id);

    socket.on("online_users", (users) => {
      setOnlineUsers(users.filter(u => u !== admin._id));
    });

    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("online_users");
      socket.off("receive_message");
    };
  }, [admin]);

  const sendMessage = () => {
    if (!newMessage || !selectedUser) return;
    socket.emit("send_message", { 
      toUserId: selectedUser, 
      message: newMessage, 
      fromUser: admin 
    });
    setMessages(prev => [...prev, { from: admin.name, message: newMessage }]);
    setNewMessage("");
  };

  return (
    <div className="p-4 border w-96">
      <h2 className="font-bold mb-2">Admin Chat Panel</h2>
      <div>
        <h3 className="font-semibold">Online Users:</h3>
        {onlineUsers.length === 0 && <p>No users online</p>}
        <ul>
          {onlineUsers.map(userId => (
            <li key={userId}>
              <button 
                className="text-blue-500"
                onClick={() => setSelectedUser(userId)}
              >
                {userId}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {selectedUser && (
        <div className="mt-2">
          <h3 className="font-semibold">Chat with {selectedUser}</h3>
          <div className="h-48 overflow-y-auto border p-2 mb-2">
            {messages.map((msg, i) => (
              <div key={i}><strong>{msg.from}:</strong> {msg.message}</div>
            ))}
          </div>
          <div className="flex gap-2">
            <input 
              type="text" 
              value={newMessage} 
              onChange={e => setNewMessage(e.target.value)}
              className="border p-1 flex-1"
              placeholder="Type a message"
            />
            <button onClick={sendMessage} className="bg-blue-500 text-white px-2">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
