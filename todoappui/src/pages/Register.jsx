import react from "react";
import { useState, useEffect } from "react";
import "./css/register.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TaskImg2 from "../assets/listed.png";

export default function Register() {
  const [email, setEmail] = useState();
  const [firstname, setFirstName] = useState();
  const [lastname, setLastName] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/Register", {
        email,
        firstname,
        lastname,
        password,
      })
      .then((res) => {
        if (res.data.message === "Email already exists") {
          alert("Email already exists. Please use a different email.");
        } else if (
          res.data.message ===
          "An email has been sent please verify your account"
        ) {
          alert("Verify your account first.");
          navigate("/");
        } else {
          console.log(error);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div id="register-container">
        <div className="rg-container">
          <div className="register-content">
            <form className="rg-forms" onSubmit={handleSubmit}>
              <div className="form-group">
                <h3>SIGN UP</h3>
                <label
                  className="mail-label"
                  htmlFor="exampleInputEmail1"
                ></label>
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
                <label htmlFor="exampleInputFirstName1"></label>
                <input
                  type="name"
                  className="form-control"
                  id="exampleInputFirstName1"
                  aria-describedby="emailHelp"
                  placeholder="First Name"
                  required
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <label htmlFor="exampleInputLastName1"></label>
                <input
                  type="name"
                  className="form-control"
                  id="exampleInputLastName1"
                  aria-describedby="emailHelp"
                  placeholder="Last Name"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label
                  className="pass-label"
                  htmlFor="exampleInputPassword1"
                ></label>
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
                  Register
                </button>
              </div>
              <br></br>
              <div className="link">
                <span className="account-text">Don't have an Account? </span>
                &nbsp;
                <Link to="/Login" className="custom-link">
                  Sign in
                </Link>
              </div>
              <div className="r-logo">
                <img className="rlogo-img" src={TaskImg2} alt="" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
