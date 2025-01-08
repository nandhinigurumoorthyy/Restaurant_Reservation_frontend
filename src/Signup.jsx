import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { GiDirectionSign } from "react-icons/gi";

function Signup() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [contact, setContact] = useState("");
  const navigate = useNavigate();
  console.log("signup function");
  console.log({ username, email, password, age, contact });

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({ username, email, password, age, contact });

    axios
      .post("http://localhost:10000/create", {
        username,
        email,
        password,
        age,
        contact,
      })
      .then((res) => {
        console.log("Response:", res.data);
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error:", error.message);
        navigate("/error", {
          state: {
            message: "Signup failed! Please check your credentials.",
            details: error.message,
          },
        });
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-light pt-4 pb-4">
      <form className="w-2/4" onSubmit={handleSubmit}>
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
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                User Name
              </label>
              <input
                name="username"
                type="text"
                className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                id="username"
                placeholder="user name"
                onChange={(e) => setUserName(e.target.value)}
                required
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
                required
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="age"
                className="block text-sm font-medium text-gray-700"
              >
                Age
              </label>
              <input
                name="age"
                type="number"
                className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                id="age"
                placeholder="age"
                onChange={(e) => setAge(e.target.value)}
                required
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
                required
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="contact"
                className="block text-sm font-medium text-gray-700"
              >
                Contact
              </label>
              <input
                name="contact"
                type="tel" // Changed to 'tel' type for phone number input
                className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                id="contact"
                placeholder="+91 91234 56789"
                onChange={(e) => setContact(e.target.value)}
                required
              />
            </div>

            <div className="mb-3 w-full">
              <button
                type="submit" 
                className="w-full text-center mt-2 bg-red-700 text-white py-2 px-4 rounded-lg hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                SignUp
              </button>
            </div>

            <div className="mt-4 w-full">
              <p>Already have an account?</p>
              <Link
                to="/login"
                className="w-full text-center bg-sky-600 text-white py-2 px-4 rounded-lg hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-400"
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
