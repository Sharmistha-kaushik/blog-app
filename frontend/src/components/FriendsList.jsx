import { useState } from "react";

export default function FriendsList({ friends, activeChat, setActiveChat }) {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter friends based on search input
  const filteredFriends = friends.filter((friend) =>
    friend.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800">
      {/* Header */}
      <div className="p-3 bg-purple-600 text-white font-bold text-lg">
        Friends
      </div>

      {/* Search Bar */}
      <div className="p-2 border-b border-gray-300 dark:border-gray-700">
        <input
          type="text"
          placeholder="Search friends..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      {/* Friends List */}
      <div className="flex-1 overflow-y-auto">
        {filteredFriends.length > 0 ? (
          filteredFriends.map((friend) => (
            <div
              key={friend._id}
              onClick={() => setActiveChat(friend)}
              className={`cursor-pointer flex items-center gap-3 p-3 border-b dark:border-gray-700 hover:bg-purple-100 dark:hover:bg-gray-700 transition-all duration-200 ${
                activeChat?._id === friend._id
                  ? "bg-purple-200 dark:bg-gray-600"
                  : ""
              }`}
            >
              {/* Profile Circle */}
              <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">
                {friend.name?.charAt(0)?.toUpperCase() || "?"}
              </div>

              {/* Friend Info */}
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-100">
                  {friend.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {friend.email || "No email"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-5">No friends found</p>
        )}
      </div>
    </div>
  );
}
