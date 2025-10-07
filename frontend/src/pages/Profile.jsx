import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Profile({ currentUser, setCurrentUser }) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  // local editable state
  const [firstName, setFirstName] = useState(currentUser?.firstName || "");
  const [lastName, setLastName] = useState(currentUser?.lastName || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [profilePic, setProfilePic] = useState(currentUser?.profilePic || "");

  // agar login nahi hai toh redirect
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  if (!currentUser) {
    return <p className="text-center mt-10">Loading profile...</p>;
  }

  // Profile Pic Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result); // base64 image
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email) {
      toast.error("All fields are required!");
      return;
    }

    const updatedUser = {
      ...currentUser,
      firstName,
      lastName,
      email,
      profilePic,
    };

    // update state + localStorage
    setCurrentUser(updatedUser);
    localStorage.setItem("userInfo", JSON.stringify(updatedUser));

    toast.success("Profile updated successfully!");
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="w-full max-w-lg bg-white border border-gray-300 shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-black">
          User Profile
        </h2>

        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={
              profilePic ||
              "https://via.placeholder.com/120x120.png?text=Avatar"
            }
            alt="Profile"
            className="w-28 h-28 rounded-full border border-gray-400 shadow-md object-cover"
          />
        </div>

        {isEditing ? (
          // 🔹 Edit Form
          <form onSubmit={handleSave} className="space-y-4">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              className="w-full border border-gray-300 p-3 rounded-lg text-black bg-white"
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              className="w-full border border-gray-300 p-3 rounded-lg text-black bg-white"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full border border-gray-300 p-3 rounded-lg text-black bg-white"
            />

            {/* Upload Profile Picture */}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full border border-gray-300 p-3 rounded-lg text-black bg-white"
            />

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-green-600 text-white py-2 rounded-lg"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-gray-500 text-white py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          // 🔹 View Mode
          <div className="space-y-4 text-lg text-gray-800">
            <p>
              <span className="font-semibold">First Name:</span>{" "}
              {currentUser.firstName}
            </p>
            <p>
              <span className="font-semibold">Last Name:</span>{" "}
              {currentUser.lastName}
            </p>
            <p>
              <span className="font-semibold">Email:</span>{" "}
              {currentUser.email}
            </p>
            <p>
              <span className="font-semibold">Role:</span>{" "}
              {currentUser.role}
            </p>

            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
