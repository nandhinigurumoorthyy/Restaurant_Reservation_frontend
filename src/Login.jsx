import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoLogIn } from "react-icons/io5";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted"); // Check if the function is triggered

    // Log the data to confirm that username, email, and password are being captured
    console.log("Form data being sent:", { email, password, username });

    // Make axios request
    axios
      .post("http://localhost:10000/login", {
        email,
        password,
        username,
      })
      .then((res) => {
        console.log("Login response:", res); // Log the response
        console.log(email, password, username);
        if (res.data && res.data.user) {
          // Log the response data to check if username is included
          console.log("Username from response:", res.data.user.username);
          console.log("Email from response:", res.data.user.email);

          // Store username and email in localStorage
          localStorage.setItem("username", res.data.user.username);
          localStorage.setItem("email", res.data.user.email);
         

          // Navigate to home page
          navigate("/home");
        } else {
          console.error("Unexpected server response:", res.data);
          navigate("/error", {
            state: {
              message: "Unexpected server response. Please try again later.",
            },
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error.message);
        navigate("/error", {
          state: {
            message: "Login failed! Please check your credentials.",
            details: error.message,
          },
        });
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-light">
      <form className="w-1/4" onSubmit={handleSubmit}>
        <div className="card rounded p-3 shadow-lg bg-white">
          <div className="card-body">
            <h3 className="card-title mb-3 text-center flex justify-center items-center gap-3">
              <span>
                <IoLogIn />
              </span>
              LogIn
            </h3>

            {/* Username input */}
            <div className="mb-3">
              <label
                htmlFor="username"
                className="block text-lg font-medium text-gray-700"
              >
                User Name
              </label>
              <input
                name="username"
                type="text"
                className="form-input mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                id="username"
                placeholder="Username"
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>

            {/* Email input */}
            <div className="mb-3">
              <label
                htmlFor="email"
                className="block text-lg font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                name="email"
                type="email"
                className="form-input mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                id="email"
                placeholder="name@example.com"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password input */}
            <div className="mb-3">
              <label
                htmlFor="password"
                className="block text-lg font-medium text-gray-700"
              >
                Password
              </label>
              <input
                name="password"
                type="password"
                className="form-input p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                id="password"
                placeholder="********"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Submit button */}
            <div className="mb-3 mt-2">
              <button
                className="w-full text-center bg-sky-600 text-white py-2 px-4 rounded-lg hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-400"
                type="submit"
              >
                LogIn
              </button>
            </div>

            {/* Sign up link */}
            <div className="mt-4">
              <p>Create a new account</p>
              <Link
                to="/create"
                className="w-full text-center bg-red-700 text-white py-2 px-4 rounded-lg hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                SignUp
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
