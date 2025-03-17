import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoRestaurant } from "react-icons/io5";
import axios from "axios";
import img from "../src/images/sign1.jpg"; // Assuming same image, you can change it
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
    <div style={{backgroundColor:'#341920'}} className="flex min-h-screen flex-col px-5">
      {/* Logo */}
      <div className="flex gap-3 pt-3 animate-fadeInUp delay-200">
        <span>
          <IoRestaurant className="text-white text-2xl" />
        </span>
        <span className="text-white dancing-script-regular">
          Reserve & Dine
        </span>
      </div>

      {/* Main Content */}
      <div className="flex justify-center items-center py-14 animate-fadeInUp delay-200">
        {/* Left Side - Login Form */}
        <form className="w-1/3 h-2/3" onSubmit={handleSubmit}>
          <div className="card shadow-lg bg-pink-200 px-2">
            <div className="card-body">
              <h3 className="text-lg text-center flex justify-center items-center font-semibold">
                Welcome back! Let's continue the feast! 🍽️
              </h3>
              <h6 className="mb-2 text-gray-500 font-semibold pl-4">Login to your account</h6>

              <div className="px-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  User Name
                </label>
                <input
                  name="username"
                  type="text"
                  className="block w-60 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  id="username"
                  placeholder="User Name"
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </div>

              <div className="px-4 mt-1 pt-1">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  name="email"
                  type="email"
                  className="mt-1 block w-60 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  id="email"
                  placeholder="name@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="px-4 mt-1 pt-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  className="mt-1 block w-60 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  id="password"
                  placeholder="********"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Button */}
              <div className="w-full mt-1 pt-2 flex justify-center items-center">
                <button
                  type="submit"
                  className="text-center border-2 border-pink-900 py-1 hover:bg-pink-900 hover:text-white px-3 rounded-lg hover:rounded-2xl focus:outline-none focus:ring-2"
                >
                  LogIn
                </button>
              </div>

              {/* Signup Link */}
              <div className="w-full mt-2 pt-2 flex justify-center items-center gap-2">
                <p className="mb-2 text-gray-500 font-semibold">Don't have an account?</p>
                <Link
                  to="/create"
                  className="
                    text-center 
                    text-gray-800 
                    no-underline 
                    border-2 
                    border-pink-900 
                    py-1 
                    px-3 
                    rounded-lg
                    focus:outline-none 
                    focus:ring-2 
                    transition-all 
                    duration-300 
                    ease-in-out
                    hover:bg-pink-900 
                    hover:text-white 
                    hover:rounded-2xl
                  "
                >
                  SignUp
                </Link>
              </div>
            </div>
          </div>
        </form>

        {/* Right Side - Image */}
        <div className="h-[380px] w-1/2 overflow-hidden">
          <img src={img} className="object-cover h-full animate-fadeInUp delay-200 transition-transform duration-500 ease-in hover:scale-105" alt="Login Visual" />
        </div>
      </div>
    </div>
  );
};

export default Login;
