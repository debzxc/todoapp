import react from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "./css/home.css";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import { Bar } from "react-chartjs-2";
import LogoutButton from "./logout";

export default function Home(props) {
  const [taskNo] = useState(1);
  const [date, setSelectedDate] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [count, setCount] = useState(null);
  const [todos, setTodos] = useState([]);
  const Navigate = useNavigate();

  const Submit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/Home", {
        taskNo,
        title,
        date,
        description,
      })
      .then((result) => {
        console.log(result);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  // const handleDelete = (taskNo) => {
  //   axios
  //     .delete("http://localhost:3001/deleteTask/" + taskNo)
  //     .then((res) => {
  //       console.log(res);
  //       window.location.reload();
  //     })
  //     .catch((err) => console.log(err));
  // };

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3001/Count")
  //     .then((response) => {
  //       const { count } = response.data;
  //       setCount(count);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, []);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3001/Home")
  //     .then((result) => setTodos(result.data))
  //     .catch((err) => console.log(err));
  // }, []);

  // const handleLogout = async () => {
  //   try {
  //     const response = await axios.post("http://localhost:3001/Logout");

  //     if (response.status === 200) {
  //       // Redirect to the login page
  //       Navigate("/Login");
  //     } else {
  //       // Handle any errors or display a message to the user
  //       console.error("Logout failed");
  //     }
  //   } catch (error) {
  //     console.error("An error occurred during logout:", error);
  //   }
  // };

  const handleLogout = async () => {
    try {
      // Send a POST request to the server to log the user out
      await axios.post("http://localhost:3001/Logout");

      // If the request is successful, you can redirect the user to the login page
      Navigate("/Login"); // You can also use React Router for navigation
    } catch (error) {
      console.error("Error logging out:", error);
      // Handle any error appropriately, e.g., showing an error message to the user
    }
  };

  return (
    <>
      <div id="wrapper">
        <nav className="navbar">
          {/* <div className="logo">TODO</div> */}
          <ul className="nav-list">
            <li className="nav-item">Home</li>
            <li className="nav-item">Activity</li>
            <li className="nav-item">About</li>
            <li className="nav-item">Contact</li>
          </ul>
          {/* <form onSubmit={handleLogout}>
            <button type="submit" className="logout-btn">
              Logout
            </button>
          </form> */}
          <button onClick={handleLogout}>Logout</button>
        </nav>
        <div className="form-container">
          <br></br>
          <form onSubmit={Submit} className="sched-form">
            <button className="button-64" role="button">
              <span className="text">+ Add</span>
            </button>
            <br></br>
            <label className="text-label" htmlFor="">
              Activity
            </label>
            <input
              className="text-input"
              type="text"
              placeholder=". . . "
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <br></br>
            <label className="text-label" htmlFor="">
              Due
            </label>
            <input
              className="text-input"
              type="date"
              onChange={(e) => setSelectedDate(e.target.value)}
              required
            />
            <br></br>
            <label className="text-label" htmlFor="">
              Task
            </label>
            <textarea
              className="text-input"
              name=""
              id=""
              placeholder="Todo"
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </form>
        </div>
        <div className="weekly-activities">
          <div className="activities">
            <span className="this-activities">Activity</span>
            <br></br>
            <hr></hr>
            <small className="numActivities1">Activity 📓 {count}</small>
            <br></br>
            <small className="numActivities2">Activity ✔ 4</small>
            <br></br>
            <small className="numActivities3">Activity ✖ 4</small>
          </div>
        </div>
        {/* <div className="schedules">{todoData}</div> */}
      </div>
    </>
  );
}
