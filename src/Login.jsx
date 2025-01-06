import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoLogIn } from "react-icons/io5";
import "bootstrap/dist/css/bootstrap.min.css";
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
      .post("https://password-reset-flow-server-0ne8.onrender.com/login", {
        email,
        password,
      })
      .then((res) => {
        if (res.data && res.data.user) {
          localStorage.setItem("name", res.data.user.name);
          navigate("/hom");
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
    <div className="d-flex justify-content-center align-items-center vh-100 vw-100 bg-light">
      <form className="w-25" onSubmit={handleSubmit}>
        <div className="card rounded p-3 shadow-lg">
          <div className="card-body">
            <h3 className="card-title mb-3 text-center d-flex justify-content-center align-items-center gap-3">
              <span>
                <IoLogIn />
              </span>{" "}
              LogIn
            </h3>
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
                placeholder="......."
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="d-grid mb-1">
              <button className="btn btn-primary" type="submit">
                LogIn
              </button>
            </div>
            <div>
              <p className="mb-3 mt-3">Create a new account</p>
              <div className="d-grid">
                <Link to="/create" className="btn btn-danger" type="submit">
                  SignUp
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
