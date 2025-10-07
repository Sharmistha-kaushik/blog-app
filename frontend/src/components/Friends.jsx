import { useEffect, useState } from "react";
import axios from "axios";

export default function Friends({ user }) {
  const [friends, setFriends] = useState([]);
  const [requests, setRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [friendId, setFriendId] = useState("");
  const [error, setError] = useState("");

  // ✅ Fetch all friend data
  const fetchFriendsData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:5000/api/users/${user._id}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      setFriends(data.friends || []);
      setRequests(data.friendRequests || []);
      setSentRequests(data.sentRequests || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load friends data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?._id) fetchFriendsData();
  }, [user]);

  // ✅ Send Friend Request
  const handleSendRequest = async () => {
    if (!friendId.trim()) {
      setError("Please enter a valid friend ID");
      return;
    }

    try {
      setError("");
      const { data } = await axios.post(
        "http://localhost:5000/api/users/send-request",
        { fromId: user._id, toId: friendId },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      alert(data.message);
      setFriendId("");
      fetchFriendsData();
    } catch (err) {
      setError(err.response?.data?.message || "Error sending request");
    }
  };

  // ✅ Accept Friend Request
  const handleAccept = async (requestId) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/accept-request",
        { userId: user._id, requestId },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      alert(data.message);
      fetchFriendsData();
    } catch (err) {
      alert("Error accepting request");
    }
  };

  // ✅ Reject Friend Request
  const handleReject = async (requestId) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/reject-request",
        { userId: user._id, requestId },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      alert(data.message);
      fetchFriendsData();
    } catch (err) {
      alert("Error rejecting request");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow rounded-lg">
      <h2 className="font-bold text-xl mb-4">Friends System</h2>

      {/* Add Friend by ID */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={friendId}
          onChange={(e) => setFriendId(e.target.value)}
          placeholder="Enter Friend ID"
          className="flex-1 border px-2 py-1 rounded"
        />
        <button
          onClick={handleSendRequest}
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
        >
          Send Request
        </button>
      </div>

      {error && <p className="text-red-500 mb-3">{error}</p>}

      {/* Loading */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Friend Requests */}
          <section className="mb-4">
            <h3 className="font-semibold mb-2">Pending Requests</h3>
            {requests.length === 0 ? (
              <p>No pending requests</p>
            ) : (
              <ul className="space-y-2">
                {requests.map((r) => (
                  <li
                    key={r._id}
                    className="flex justify-between items-center bg-gray-100 p-2 rounded"
                  >
                    <span>{r.name}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAccept(r._id)}
                        className="bg-green-500 text-white px-2 py-1 rounded"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleReject(r._id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Reject
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Sent Requests */}
          <section className="mb-4">
            <h3 className="font-semibold mb-2">Sent Requests</h3>
            {sentRequests.length === 0 ? (
              <p>No sent requests</p>
            ) : (
              <ul className="space-y-2">
                {sentRequests.map((r) => (
                  <li key={r._id} className="bg-gray-100 p-2 rounded">
                    <span>{r.name}</span> <em>(Pending)</em>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Accepted Friends */}
          <section>
            <h3 className="font-semibold mb-2">Friends</h3>
            {friends.length === 0 ? (
              <p>No friends yet</p>
            ) : (
              <ul className="space-y-2">
                {friends.map((f) => (
                  <li
                    key={f._id}
                    className="flex items-center gap-3 bg-gray-100 p-2 rounded"
                  >
                    <img
                      src={f.avatar || "https://via.placeholder.com/40"}
                      alt="Avatar"
                      className="w-10 h-10 rounded-full"
                    />
                    <span>{f.name}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      )}
    </div>
  );
}
