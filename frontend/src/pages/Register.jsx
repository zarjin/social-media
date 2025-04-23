import React, { useContext, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
  const { register } = useContext(AuthContext);
  const [registerData, setRegisterData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    register(registerData);
  };

  return (
    <main className="w-full h-screen flex justify-center items-center">
      <div className="w-full max-w-sm p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="mb-4">
            <label
              htmlFor="firstname"
              className="block text-gray-700 font-bold mb-2"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              onChange={(e) =>
                setRegisterData({ ...registerData, firstname: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your first name"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastname"
              className="block text-gray-700 font-bold mb-2"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              onChange={(e) =>
                setRegisterData({ ...registerData, lastname: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your last name"
            />
          </div>
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
              onChange={(e) =>
                setRegisterData({ ...registerData, email: e.target.value })
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
              className="w-full p-2 border border-gray-300 rounded"
              onChange={(e) =>
                setRegisterData({ ...registerData, password: e.target.value })
              }
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Register
          </button>
        </form>
        <div className="mt-4 text-center">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
