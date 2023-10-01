import react from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import axios from "axios";
import "./css/login.css";
import TaskImg2 from "../assets/listed.png";
// import Cookies from "universal-cookie";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const Navigate = useNavigate();

  // const axiosInstance = axios.create({
  axios.defaults.withCredentials = true;
  //   withCredentials: true,
  // });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/Login", {
        email,
        password,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.Status === "Success") {
          if (res.data.role === "admin") {
            Navigate("/Admin");
          } else if (res.data.role === "Visitor") {
            Navigate("/Home");
          } else {
            alert("Error");
          }
        } else if (res.data.message === "Password incorrect") {
          alert("Password is incorrect");
        } else {
          alert("No record Existed");
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div id="login-container">
        <div className="lm-container">
          <div className="login-content">
            <form className="forms" onSubmit={handleSubmit}>
              <div className="form-group">
                <h3>SIGN IN</h3>
                <label className="mail-label" htmlFor="exampleInputEmail1">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <small id="emailHelp" className="form-text text-muted">
                  <span className="span">
                    We'll never share your email with anyone else.
                  </span>
                </small>
              </div>
              <div className="form-group">
                <label className="pass-label" htmlFor="exampleInputPassword1">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {/* <div className="form-group form-check"></div> */}
              &nbsp;
              <div className="btn-link">
                <button type="submit" className="btn btn-dark">
                  Login
                </button>
              </div>
              <br></br>
              <div className="link">
                <span className="account-text">Don't have an Account? </span>
                &nbsp;
                <Link to="/Register" className="custom-link">
                  Sign Up
                </Link>
              </div>
              <Link to="/" className="custom-link2">
                Back
              </Link>
              <div className="m-logo">
                <img className="logo-img" src={TaskImg2} alt="" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
