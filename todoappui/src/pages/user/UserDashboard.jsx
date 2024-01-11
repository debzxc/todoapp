import React from "react";
import react, { useContext } from "react";
import { createContext, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContextProvider } from "./AuthContext";
import { Link } from "react-router-dom";
import AuthContext from "./AuthContext";
import axios from "axios";
import "./css/home.css";

function UserHome() {
  const localStorageUser = localStorage.getItem("LOGGED_IN_USER");
  const [todos, setTodos] = useState([]);
  const [taskNo] = useState(1);
  const [count, setCount] = useState(null);
  const [date, setSelectedDate] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const Navigate = useNavigate();

  // const Submit = (e) => {
  //   e.preventDefault();
  //   axios
  //     .post("http://localhost:3001/Home", {
  //       taskNo,
  //       title,
  //       date,
  //       description,
  //     })
  //     .then((result) => {
  //       console.log(result);
  //       window.location.reload();
  //     })
  //     .catch((err) => console.log(err));
  // };

  useEffect(() => {
    axios
      .get("http://localhost:3001/Home")
      .then((result) => setTodos(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (taskNo) => {
    axios
      .delete("http://localhost:3001/deleteTask/" + taskNo)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const user = localStorage.getItem("LOGGED_IN_USER");
  const { loggedIn } = useContext(AuthContext);
  // console.log(loggedIn);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3001/Logout");
      localStorage.removeItem("authentication");
      localStorage.removeItem("LOGGED_IN_USER");
      localStorage.removeItem("USER_ROLE");
      localStorage.removeItem("SESSION");
      localStorage.removeItem("LOGGED_IN");
      Navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  const Submit = (e) => {
    e.preventDefault();
    const localStorageUser = localStorage.getItem("LOGGED_IN_USER");
    const userEmail = localStorageUser;
    axios
      .post("http://localhost:3001/Home", {
        userEmail,
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

  useEffect(() => {
    axios
      .get("http://localhost:3001/Count")
      .then((response) => {
        const { count } = response.data;
        setCount(count);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const todoData = todos.map((todo, index) => {
    const date = new Date(todo.date);

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const perDay = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    const sevenDays = perDay[date.getDay()];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    const formattedDate = `${month} ${day}, ${year}`;
    const whatDay = `${sevenDays}`;

    return (
      <>
        <div key={todo._id} className="sched-cards">
          <div className="task-buttons">
            <div className="edit-button">
              <Link className="e-btn" to={`/Update/${todo.taskNo}/${todo._id}`}>
                {" "}
                ✎
              </Link>
            </div>

            <button className="c-btn" onClick={(e) => handleCheck(todo._id)}>
              ✔
            </button>
            <button className="x-btn" onClick={(e) => handleDelete(todo._id)}>
              ✖
            </button>
          </div>
          <div className="task">
            <h4>📍 Activity # {index + 1}</h4>
            <hr></hr>
            <h4 className="sched-task">{todo.title}</h4>
            <hr></hr>
            <h5 className="task-day">{whatDay}</h5>
            <hr></hr>
            <small>
              <i className="task-date"></i>
              {formattedDate}
            </small>
            <hr></hr>
            <div className="task-todo">{todo.description}</div>
            <hr></hr>
          </div>
        </div>
      </>
    );
  });

  return (
    <>
      {loggedIn === false && (
        <>
          <h1>False</h1>
        </>
      )}

      {loggedIn === true && (
        <>
          <div className="wrapper">
            <nav className="navbar">
              <ul className="nav-list">
                <li className="nav-item">Home</li>
                <li className="nav-item">Activity</li>
                <li className="nav-item">About</li>
                <li className="nav-item">Contact</li>
                <li className="nav-item">{localStorageUser}</li>
              </ul>

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
            {todos.map(
              (todos) =>
                localStorageUser === todos.userEmail && (
                  <React.Fragment key={todos._id}>
                    <div className="taskNo">{todoData}</div>
                    <div className="weekly-activities">
                      <div className="activities">
                        <span className="this-activities">Activity</span>
                        <br></br>
                        <hr></hr>
                        <small className="numActivities1">
                          Activity 📓 {count}
                        </small>
                        <br></br>
                        <small className="numActivities2">Activity ✔ </small>
                        <br></br>
                        <small className="numActivities3">Activity ✖ 4</small>
                      </div>
                    </div>
                  </React.Fragment>
                )
            )}
          </div>
        </>
      )}
    </>
  );
}

export default UserHome;
