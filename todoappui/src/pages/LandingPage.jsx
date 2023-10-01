import React, { useState } from "react";
import "./css/landingpage.css";
import { Link } from "react-router-dom";
import TaskImg from "../assets/task.png";
import TaskImg2 from "../assets/listed.png";

export default function LandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <>
      <div id="main-container">
        <nav className="navbar">
          {/* <div className="logo">TODO</div> */}
          <ul className="nav-list">
            <li className="nav-item">Home</li>
            <li className="nav-item">About</li>
            <li className="nav-item">Services</li>
            <li className="nav-item">Contact</li>
          </ul>
          <div className="logo">TODO</div>
        </nav>
        <div className="page-content">
          <div className="p-container">
            <div className="m-title">
              <h6>TODO . . .</h6>
            </div>
            <div className="m-content">
              <p className="parag">
                Welcome to our TODO app, a powerful and intuitive solution
                designed to streamline your life and boost your productivity.
              </p>
            </div>
            <br />

            <div className="content-btn">
              <Link className="btn" to="/Login">
                Sign in
              </Link>
              &nbsp; &nbsp; &nbsp;
              <Link className="btn" to="/Register">
                Sign up
              </Link>
            </div>
          </div>
        </div>
        <div className="todo-icon">
          <img className="img" src={TaskImg2} alt="task" />
        </div>
        {/* <div className="wrapper">
          <div className="M-container"></div>
        </div>
        <div className="page-card">
          <div className="card-body"></div>
          <div className="card-body"></div>
          <div className="card-body"></div>
          <div className="card-body"></div>
        </div> */}
        {/* <nav className={`navbar ${isMobileMenuOpen ? "open" : ""}`}>
          <button onClick={toggleMobileMenu} className="menu-button">
            Menu
          </button>
          <ul className={`nav-list ${isMobileMenuOpen ? "mobile" : ""}`}>
            <li className="nav-item">Home</li>
            <li className="nav-item">About</li>
            <li className="nav-item">Services</li>
            <li className="nav-item">Contact</li>
          </ul>
        </nav> */}
      </div>
    </>
  );
}
