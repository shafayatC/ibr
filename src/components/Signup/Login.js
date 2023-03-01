import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Home/Navbar/Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform authentication
  };

  return (
    <>
      {" "}
      <Navbar />
      <div className="flex items-center justify-center h-screen bg-gray-200">
        <form
          className="bg-white p-6 rounded-lg shadow-xl"
          onSubmit={handleSubmit}
        >
          <h2 className="text-lg font-medium mb-4">Login</h2>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="border border-gray-400 p-2 w-full"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="border border-gray-400 p-2 w-full"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <a href="#">
            {" "}
            <p>Forgot Password?</p>
          </a>
          <br />
          <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
            <button className="bg-indigo-500 text-white font-medium py-2 px-4 rounded-full hover:bg-indigo-600">
              Login
            </button>
            <Link to="/sign-up">
            <button className="bg-indigo-500 text-white font-medium py-2 px-4 rounded-full hover:bg-indigo-600">
              Sign up
            </button></Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
