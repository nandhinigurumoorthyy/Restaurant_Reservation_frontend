import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoRestaurant } from "react-icons/io5";
import axios from "axios";
import img from "./images/sign1.jpg"; // Make sure the image path is correct
import "./index.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form data being sent:", { email, password, username });

    axios
      .post("https://restaurant-reservation-backend-a4q3.onrender.com/login", {
        email,
        password,
        username,
      })
      .then((res) => {
        console.log("Login response:", res);
        if (res.data && res.data.user) {
          localStorage.setItem("username", res.data.user.username);
          localStorage.setItem("email", res.data.user.email);
          navigate("/home");
        } else {
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
    <div
      style={{ backgroundColor: "#341920" }}
      className="flex min-h-screen flex-col px-4 md:px-8"
    >
      {/* Logo */}
      <div className="flex gap-3 pt-3 animate-fadeInUp delay-200">
        <span>
          <IoRestaurant className="text-white text-2xl" />
        </span>
        <span className="text-white dancing-script-regular text-xl">
          Reserve & Dine
        </span>
      </div>

      {/* Main Content */}
      <div className="flex flex-col-reverse lg:flex-row justify-center items-center py-2 lg:py-10 gap-3 md:gap-0 lg:gap-0 animate-fadeInUp delay-200">
        {/* Left Side - Login Form */}
        <form
          className="w-full max-w-md md:w-1/2 lg:w-1/3"
          onSubmit={handleSubmit}
        >
          <div className="card shadow-lg bg-pink-200 px-3 py-2 rounded-lg">
            <div className="card-body">
              <h3 className="text-lg text-center font-semibold mb-2">
                Welcome back! Let's continue the feast! 🍽️
              </h3>
              <h6 className="mb-2 text-gray-500 font-semibold text-center">
                Login to your account
              </h6>

              <div className="space-y-3">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    User Name
                  </label>
                  <input
                    name="username"
                    type="text"
                    className="block w-full p-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    id="username"
                    placeholder="User Name"
                    onChange={(e) => setUserName(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <input
                    name="email"
                    type="email"
                    className="block w-full p-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    id="email"
                    placeholder="name@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    name="password"
                    type="password"
                    className="block w-full p-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    id="password"
                    placeholder="********"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {/* Button */}
                <div className="flex justify-center pt-1">
                  <button
                    type="submit"
                    className="text-center border-2 border-pink-900 py-2 px-3 hover:bg-pink-900 hover:text-white rounded-lg hover:rounded-2xl focus:outline-none focus:ring-2 transition-all"
                  >
                    LogIn
                  </button>
                </div>

                {/* Signup Link */}
                <div className="flex justify-center items-center gap-2 pt-2">
                  <p className="text-gray-500 font-semibold">Don't have an account?</p>
                  <Link
                    to="/create"
                    className="no-underline text-gray-800 border-2 border-pink-900 py-1 px-3 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ease-in-out hover:bg-pink-900 hover:text-white hover:rounded-2xl"
                  >
                    SignUp
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* Right Side - Image */}
        <div className="w-full max-w-md md:w-1/2 lg:w-1/3 overflow-hidden rounded-lg shadow-lg">
          <img
            src={img}
            alt="Login Visual"
            className="object-cover h-[470px] sm:h-96 lg:h-[470px] w-full animate-fadeInUp delay-200 transition-transform duration-500 ease-in-out hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
