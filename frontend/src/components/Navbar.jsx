import React, { useContext } from "react";
import { Link } from "react-router";
import { Home, CircleUserRound, ImagePlus, LogIn, LogOut } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="w-full h-16 bg-black text-white shadow-lg sticky top-0 z-50 backdrop-blur-sm bg-opacity-90 border-b border-dark-green/20">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center">
          <Link
            to="/"
            className="text-xl font-bold tracking-wider cursor-pointer transition-all duration-300 hover:scale-105"
          >
            SOCIAL<span className="text-green-600">HUB</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="flex items-center justify-center">
          <ul className="flex space-x-8">
            <li className="list-none">
              <Link
                to="/"
                className="flex flex-col items-center transition-all duration-300 hover:text-green-600"
              >
                <Home className="h-5 w-5 text-white" />
                <span className="text-xs mt-1 text-white">Home</span>
              </Link>
            </li>

            <li className="list-none">
              <Link
                to="/create-post"
                className="flex flex-col items-center transition-all duration-300 hover:text-green-600"
              >
                <ImagePlus className="h-5 w-5 text-white" />
                <span className="text-xs mt-1 text-white">Post</span>
              </Link>
            </li>

            <li className="list-none">
              <Link
                to="/profile"
                className="flex flex-col items-center transition-all duration-300 hover:text-green-600"
              >
                <CircleUserRound className="h-5 w-5 text-white" />
                <span className="text-xs mt-1 text-white">Profile</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="flex space-x-4">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 bg-dark-green text-white px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 hover:bg-green-900 hover:shadow-md"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          ) : (
            <Link to="/login">
              <button className="flex items-center gap-1 bg-green-600 text-white px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 hover:bg-green-700 hover:shadow-md">
                <LogIn className="h-4 w-4" />
                <span>Login</span>
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
