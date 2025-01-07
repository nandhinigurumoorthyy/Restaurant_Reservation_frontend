import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoLogIn } from "react-icons/io5";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  console.log(email, password);
  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({ email, password });

    axios
      .post("http://localhost:10000/login", {
        email,
        password,
      })
      .then((res) => {
        if (res.data && res.data.user) {
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
                placeholder="..........."
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3 mt-2">
              <button
                className="w-full text-center bg-sky-600 text-white py-2 px-4 rounded-lg hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-400"
                type="submit"
              >
                LogIn
              </button>
            </div>
            <div className="mt-4">
              <p>Create a new account</p>
              <Link
                to="/create"
                type="submit"
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
