import { useEffect, useState } from "react";
import AdminChat from "../components/AdminChat";

export default function Admin() {
  const [admin, setAdmin] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;
    fetch("http://localhost:5000/api/users/me", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setAdmin(data));
  }, []);

  if (!admin) return <div>Loading...</div>;

  return (
    <div className="p-6 flex gap-4">
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        <p>Manage users and blogs here</p>
      </div>

      <AdminChat admin={admin} />
    </div>
  );
}
