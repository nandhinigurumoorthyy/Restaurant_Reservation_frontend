import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { IoRestaurant } from "react-icons/io5";
import img from "./images/sign1.jpg";
import "./index.css";

function Signup() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [contact, setContact] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://restaurant-reservation-backend-a4q3.onrender.com/create", {
        username,
        email,
        password,
        age,
        contact,
      })
      .then((res) => {
        navigate("/login");
      })
      .catch((error) => {
        navigate("/error", {
          state: {
            message: "Signup failed! Please check your credentials.",
            details: error.message,
          },
        });
      });
  };

  return (
    <div className="flex min-h-screen flex-col   py-4" style={{ backgroundColor: '#341920' }}>
      {/* logo */}
      <div className="flex gap-3 px-3 pb-4 pt-2 animate-fadeInUp delay-200">
        <span>
          <IoRestaurant className="text-white text-2xl" />
        </span>
        <span className="text-white text-xl sm:text-2xl dancing-script-regular">
          Reserve & Dine
        </span>
      </div>

      {/* Main content */}
      <div className="pl-2 pr-2 lg:pl-16 lg:pr-16 sm:pl-3 sm:pr-3 md:pr-10 md:pl-10 flex flex-col md:flex-row justify-center items-center gap-5 md:gap-10 animate-fadeInUp delay-200">
        {/* Form section */}
        <form
          className="w-full md:w-1/2 lg:w-1/2 bg-white rounded-lg shadow-lg px-4 py-2"
          onSubmit={handleSubmit}
        >
          <h3 className="text-lg text-center font-semibold mb-2">
            Sign up now — where every meal becomes a memory...🥂
          </h3>
          <h6 className="mb-1 text-gray-600 font-semibold text-center">
            Create an account
          </h6>

          {/* Fields */}
          {[
            { label: "User Name", value: username, setter: setUserName, type: "text", placeholder: "User name", id: "username" },
            { label: "Password", value: password, setter: setPassword, type: "password", placeholder: "********", id: "password" },
            { label: "Age", value: age, setter: setAge, type: "number", placeholder: "Age", id: "age" },
            { label: "Email address", value: email, setter: setEmail, type: "email", placeholder: "name@example.com", id: "email" },
            { label: "Contact", value: contact, setter: setContact, type: "tel", placeholder: "+91 91234 56789", id: "contact" }
          ].map(({ label, value, setter, type, placeholder, id }) => (
            <div className="mb-3" key={id}>
              <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {label}
              </label>
              <input
                name={id}
                type={type}
                value={value}
                onChange={(e) => setter(e.target.value)}
                className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder={placeholder}
                required
              />
            </div>
          ))}

          {/* Submit Button */}
          <div className="flex mt-4 justify-center">
            <button
              type="submit"
              className="px-4 py-2 border-2 border-pink-900 rounded-lg hover:bg-pink-950 hover:text-white transition-all duration-300"
            >
              Sign Up
            </button>
          </div>

          {/* Login Link */}
          <div className="flex justify-center items-center gap-2 mt-3 pb-2">
            <p className="text-gray-600 font-semibold">Already have an account?</p>
            <Link
              to="/login"
              className="no-underline text-gray-800 border-2 border-pink-950 py-1 px-3 rounded-lg hover:bg-pink-900 hover:text-white transition-all duration-300"
            >
              Login
            </Link>
          </div>
        </form>

        {/* Image section */}
        <div className="w-full md:w-1/2 lg:w-1/2 h-64 md:h-[600px] overflow-hidden rounded-lg shadow-lg">
          <img
            src={img}
            alt="Signup Visual"
            className="object-cover w-full h-full animate-fadeInUp delay-200 transition-transform duration-500 ease-in-out hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
}

export default Signup;
