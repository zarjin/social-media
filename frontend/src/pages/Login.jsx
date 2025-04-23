import React, { useState, useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const { login } = useContext(AuthContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    login(loginData);
  };

  return (
    <main className="w-full h-screen flex justify-center items-center">
      <div className="w-full max-w-sm p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
