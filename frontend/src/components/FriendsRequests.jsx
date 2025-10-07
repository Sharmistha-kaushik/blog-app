import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function FriendRequests({ user }) {
  const [requests, setRequests] = useState([]);

  // 🔄 Fetch pending requests (wrapped in useCallback)
  const fetchRequests = useCallback(async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/users/friend-requests", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setRequests(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch requests");
    }
  }, [user.token]);

  // ⏳ Run once when component mounts
  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  // ✅ Accept Request
  const handleAccept = async (requestId) => {
    try {
      await axios.post(
        `http://localhost:5000/api/users/friend-requests/${requestId}/accept`,
        {},
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      toast.success("Friend request accepted");
      fetchRequests(); // Refresh list
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error accepting request");
    }
  };

  // ❌ Reject Request
  const handleReject = async (requestId) => {
    try {
      await axios.post(
        `http://localhost:5000/api/users/friend-requests/${requestId}/reject`,
        {},
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      toast.success("Friend request rejected");
      fetchRequests();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error rejecting request");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow rounded-lg mt-4">
      <h2 className="font-bold text-xl mb-4">Friend Requests</h2>

      {requests.length > 0 ? (
        <ul className="space-y-3">
          {requests.map((req) => (
            <li
              key={req._id}
              className="flex items-center justify-between p-3 bg-gray-100 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <img
                  src={req.avatar || "https://via.placeholder.com/40"}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full"
                />
                <span>{req.name}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleAccept(req._id)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleReject(req._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No pending requests</p>
      )}
    </div>
  );
}
