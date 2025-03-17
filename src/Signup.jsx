import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { IoRestaurant } from "react-icons/io5";
import img from "../src/images/sign1.jpg";
import "./index.css";

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
      .post("https://restaurant-reservation-backend-a4q3.onrender.com/create", {
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
    <div className="flex min-h-screen flex-col px-5" style={{backgroundColor:'#341920'}}>
      {/* logo */}
      <div className="flex gap-3 pb-3 pt-2 animate-fadeInUp delay-200">
        <span>
          <IoRestaurant className="text-white text-2xl" />
        </span>
        <span className="text-white dancing-script-regular">
          Reserve & Dine
        </span>
      </div>

      {/* main content */}
      <div className="flex justify-center items-center">
        {/* left side - sign up form */}
        <form className="w-1/3 h-2/3 animate-fadeInUp delay-200" onSubmit={handleSubmit}>
          <div className="card shadow-lg bg-pink-200 px-2">
            <div className="card-body">
              <h3 className="text-lg text-center flex justify-center items-center font-semibold">
                Sign up now — where every meal becomes a memory...🥂
              </h3>
              <h6 className="mb-2 text-gray-500 font-semibold pl-4">
                Create an account
              </h6>

              <div className="px-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  User Name
                </label>
                <input
                  name="username"
                  type="text"
                  className="block  w-60 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  id="username"
                  placeholder="user name"
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </div>

              <div className="px-4 mt-1 pt-1">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  className="mt-1 block w-60 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  id="password"
                  placeholder=".........."
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="px-4 mt-1 pt-1">
                <label
                  htmlFor="age"
                  className="block text-sm font-medium text-gray-700"
                >
                  Age
                </label>
                <input
                  name="age"
                  type="number"
                  className="mt-1 block w-60 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  id="age"
                  placeholder="age"
                  onChange={(e) => setAge(e.target.value)}
                  required
                />
              </div>

              <div className="px-4 mt-1 pt-1">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
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
                <label
                  htmlFor="contact"
                  className="block text-sm font-medium text-gray-700"
                >
                  Contact
                </label>
                <input
                  name="contact"
                  type="tel" // Changed to 'tel' type for phone number input
                  className="mt-1 block w-60 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  id="contact"
                  placeholder="+91 91234 56789"
                  onChange={(e) => setContact(e.target.value)}
                  required
                />
              </div>

              <div className="w-full mt-1 pt-2 flex justify-center items-center">
                <button
                  type="submit"
                  className="text-center border-2 border-pink-900 py-1 hover:bg-pink-900 hover:text-white px-3 rounded-lg hover:rounded-2xl focus:outline-none focus:ring-2"
                >
                  SignUp
                </button>
              </div>

              <div className="w-full mt-2 pt-2 flex justify-center items-center gap-2">
                <p className="mb-2 text-gray-500 font-semibold">
                  Already have an account?
                </p>
                <Link
                  to="/login"
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
                  LogIn
                </Link>
              </div>
            </div>
          </div>
        </form>


{/* Image content */}
<div className="h-[500px] w-1/2 overflow-hidden ">
  <img src={img} className="object-cover h-full animate-fadeInUp delay-200 transition-transform duration-500 ease-in hover:scale-105" />
</div>

      </div>
    </div>
  );
}

export default Signup;
