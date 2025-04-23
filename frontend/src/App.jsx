import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import { ToastContainer } from "react-toastify";
import CreatePost from "./pages/CreatePost";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Login from "./pages/Login";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <AuthProvider>
          <UserProvider>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create-post" element={<CreatePost />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </UserProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}
