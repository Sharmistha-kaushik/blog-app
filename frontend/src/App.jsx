import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom"; // Removed BrowserRouter (already in main.jsx)

// 🌓 Theme Provider
import { ThemeProvider } from "./context/ThemeContext";

// 🧩 Components
import Navbar from "./components/Navbar";
import Blogs from "./components/Blogs";
import Footer from "./components/Footer";
import AddFriend from "./components/AddFriend";
import FriendsDashboard from "./components/FriendsDashboard";

// 🗂️ Pages
import Home from "./pages/Home.jsx";
import SingleBlogs from "./pages/SingleBlogs.jsx";
import AddBlog from "./pages/AddBlog.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Profile from "./pages/Profile.jsx";

// 🧱 New Dashboard Layout + Pages
import DashboardLayout from "./pages/DashboardLayout.jsx";
import DashboardHome from "./pages/DashboardHome.jsx";
import AnalyticsPage from "./pages/AnalyticsPage.jsx";
import ManagePostsPage from "./pages/ManagePostsPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import MessagesPage from "./pages/MessagesPage.jsx";

// ⚠️ Error Boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 text-red-500">
          Something went wrong. Please try again later.
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("userInfo")) || null
  );
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <ThemeProvider>
      <ErrorBoundary>
        {/* 🌐 Navbar visible on all pages */}
        <Navbar
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          onSearch={setSearchQuery}
        />

        <div className="p-4 min-h-screen bg-white">
          <Routes>
            {/* 🌍 Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/blogs" element={<Blogs searchQuery={searchQuery} />} />
            <Route path="/blogs/:id" element={<SingleBlogs />} />
            <Route
              path="/login"
              element={<Login setCurrentUser={setCurrentUser} />}
            />
            <Route
              path="/register"
              element={<Register setCurrentUser={setCurrentUser} />}
            />

            {/* ✍️ Protected Routes */}
            <Route
              path="/add-blog"
              element={
                currentUser ? (
                  <AddBlog currentUser={currentUser} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/chat"
              element={
                currentUser ? (
                  <ChatPage
                    currentUser={currentUser}
                    setCurrentUser={setCurrentUser}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/admin"
              element={
                currentUser?.role === "admin" ? (
                  <AdminDashboard />
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="/profile"
              element={
                currentUser ? (
                  <Profile currentUser={currentUser} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            {/* 🧭 Dashboard with Nested Routes */}
            <Route
              path="/dashboard"
              element={
                currentUser ? <DashboardLayout /> : <Navigate to="/login" />
              }
            >
              <Route index element={<DashboardHome />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="manage-posts" element={<ManagePostsPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="messages" element={<MessagesPage />} />
            </Route>

            {/* 👥 Friends Section */}
            <Route
              path="/friends"
              element={<FriendsDashboard user={currentUser} />}
            />
          </Routes>
        </div>

        {/* 🦶 Footer visible on all pages */}
        <Footer />
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
