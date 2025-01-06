import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { GiDirectionSign } from "react-icons/gi";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  console.log("signup function");
  console.log({ name, password, email });

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({ name, email, password });

    axios
      .post("https://password-reset-flow-server-0ne8.onr.com/create", {
        name,
        email,
        password,
      })
      .then((res) => {
        console.log("Response:", res.data);
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error:", error.message);
        // Navigate to the error page and pass the error message
        navigate("/error", {
          state: {
            message: "Signup failed! Please check your credentials.",
            details: error.message,
          },
        });
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-light">
      <form className="w-1/4" onSubmit={handleSubmit}>
        <div className="card rounded p-6 shadow-lg bg-white">
          <div className="card-body">
            <h3 className="card-title mb-3 text-center flex justify-center items-center gap-3">
              <span>
                <GiDirectionSign />
              </span>
              SignUp
            </h3>
            <h6 className="mb-3 text-gray-600">Create an account</h6>

            <div className="mb-3">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                User Name
              </label>
              <input
                name="name"
                type="text"
                className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                id="name"
                placeholder="User name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                name="email"
                type="email"
                className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                id="email"
                placeholder="name@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                name="password"
                type="password"
                className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                id="password"
                placeholder=".........."
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-3 w-full">
              <Link
                to="/create"
                type="submit"
                className="w-full text-center mt-2 bg-red-700 text-white py-2 px-4 rounded-lg hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                SignUp
              </Link>
            </div>

            <div className="mt-4">
              <p>Already have an account?</p>
              <Link
                to="/login"
                className="w-full text-center bg-sky-600 text-white py-2 px-4 rounded-lg hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-400"
                type="submit"
              >
                LogIn
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Signup;
