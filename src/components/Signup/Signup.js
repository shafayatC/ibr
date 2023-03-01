import React, { useState } from "react";
import Navbar from "../Home/Navbar/Navbar";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <>
    <Navbar/>
      <div className="bg-gray-50 h-screen flex items-center justify-center">
        <div className="w-96 bg-white shadow-md rounded p-6">
          <form onSubmit={handleSubmit}>
            <h1 className="text-lg font-medium text-gray-900">Sign Up</h1>
            <div className="mt-4">
              <input
                className="border border-gray-400 rounded w-full py-2 px-3 text-gray-700"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="mt-4">
              <input
                className="border border-gray-400 rounded w-full py-2 px-3 text-gray-700"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="mt-6">
              <button className="bg-indigo-500 text-white rounded py-2 px-4 hover:bg-indigo-600">
                Sign Up
              </button>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-gray-600">
                  Already have an account?{" "}
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-700"
                  >
                    Sign In
                  </a>
                </span>
                <button className="w-full bg-gray-200 text-gray-500 rounded py-2 px-4 hover:bg-gray-300">
                  Sign Up with Google
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
