import { useState } from "react";
import Friends from "./Friends";
import FriendsRequests from "./FriendsRequests";
import AddFriend from "./AddFriend";

export default function FriendsDashboard({ user }) {
  const [activeTab, setActiveTab] = useState("friends");

  const tabs = [
    { id: "friends", label: "My Friends" },
    { id: "requests", label: "Friends Requests" },
    { id: "add", label: "Add Friends" },
  ];

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white shadow-lg rounded-xl p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Friends Dashboard</h1>

      {/* 🧭 Tab Navigation */}
      <div className="flex justify-around mb-6 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 font-medium border-b-2 transition-all duration-200 ${
              activeTab === tab.id
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-600 hover:text-blue-500"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 📦 Tab Content */}
      <div className="mt-4">
        {activeTab === "friends" && <Friends user={user} />}
        {activeTab === "requests" && <FriendsRequests user={user} />}
        {activeTab === "add" && <AddFriend user={user} />}
      </div>
    </div>
  );
}
