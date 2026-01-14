import { Link } from "react-router-dom";

export default function MessagesPage() {
  const messages = [
    { id: 1, from: "Aditi Sharma", text: "Hey! Loved your latest blog 😍" },
    { id: 2, from: "Rohit Verma", text: "Can you collaborate on my next post?" },
    { id: 3, from: "Priya Singh", text: "Your UI design tips were awesome!" },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-2 text-gray-800">💬 Messages</h1>
      <p className="text-gray-600 mb-8">Check your latest notifications and messages.</p>

      <div className="w-[80%] bg-gray-50 p-6 rounded-xl shadow-md space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className="p-4 border border-gray-200 rounded-lg hover:shadow">
            <h3 className="font-semibold text-gray-800">{msg.from}</h3>
            <p className="text-gray-600">{msg.text}</p>
          </div>
        ))}
      </div>

      <Link to="/dashboard" className="mt-8 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition">
        ← Back to Dashboard
      </Link>
    </div>
  );
}
