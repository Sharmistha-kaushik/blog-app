import { useState } from "react";
import FriendsList from "../components/FriendsList";

export default function Chat({ currentUser }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedFriend, setSelectedFriend] = useState(null);

  const sendMessage = () => {
    if (!newMessage || !selectedFriend) return;

    // Add sender message
    setMessages((prev) => [
      ...prev,
      { from: currentUser?.name || "You", message: newMessage },
    ]);

    // Add dummy reply from friend after 1 second
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          from: selectedFriend.name || selectedFriend.email,
          message: "Got your message 👍",
        },
      ]);
    }, 1000);

    setNewMessage("");
  };

  return (
    <div className="flex h-[80vh] border rounded shadow-lg">
      {/* Friends Sidebar */}
      <FriendsList
        currentUser={currentUser}
        onSelectFriend={(friend) => {
          setSelectedFriend(friend);
          setMessages([]);
        }}
      />

      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between p-2 border-b bg-gray-100">
          <h2 className="font-bold">
            {selectedFriend ? selectedFriend.email : "Select a friend to chat"}
          </h2>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-2 bg-white">
          {messages.length === 0 ? (
            <p className="text-gray-400">No messages yet.</p>
          ) : (
            messages.map((msg, i) => (
              <div key={i} className="mb-2">
                <strong>{msg.from}:</strong> {msg.message}
              </div>
            ))
          )}
        </div>

        {/* Input */}
        {selectedFriend && (
          <div className="flex gap-2 p-2 border-t bg-gray-100">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="border p-2 flex-1 rounded"
              placeholder="Type a message..."
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 text-white px-3 rounded"
            >
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
