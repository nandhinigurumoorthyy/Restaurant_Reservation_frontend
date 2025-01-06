import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
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
    <>
      <div className="d-flex justify-content-center align-items-center vh-100 vw-100 bg-light">
        <form className="w-25" onSubmit={handleSubmit}>
          <div className="card rounded p-3 shadow-lg">
            <div className="card-body">
              <h3 className="card-title mb-3 text-center d-flex justify-content-center align-items-center gap-3">
                <span>
                  <GiDirectionSign />
                </span>{" "}
                SignUp
              </h3>
              <h6 className="mb-3 text-secondary">Create an account</h6>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  User Name
                </label>
                <input
                  name="name"
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="User name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="name@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder=".........."
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="d-grid mb-4">
                <button className="btn btn-danger" type="submit">
                  SignUp
                </button>
              </div>
              <div>
                <p className="mb-3">Already have an account!!</p>
                <div className="d-grid">
                  <Link to="/login" className="btn btn-primary" type="submit">
                    LogIn
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Signup;
