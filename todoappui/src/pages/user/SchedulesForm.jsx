import react from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "./css/home.css";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import { Bar } from "react-chartjs-2";

export default function Home() {
  const [taskNo] = useState(1);
  const [date, setSelectedDate] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [count, setCount] = useState(null);
  const [todos, setTodos] = useState([]);

  const Submit = (e) => {
    e.preventDefault();

    // Replace line breaks with <br> tags
    const formattedDescription = description.replace(/\n/g, "<br />");

    axios
      .post("http://localhost:3001/Home", {
        taskNo,
        title,
        date,
        description: formattedDescription, // Use the formatted description
      })
      .then((result) => {
        console.log(result);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (taskNo) => {
    axios
      .delete("http://localhost:3001/deleteTask/" + taskNo)
      .then((res) => {
        console.log(res);
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

  useEffect(() => {
    axios
      .get("http://localhost:3001/Home")
      .then((result) => setTodos(result.data))
      .catch((err) => console.log(err));
  }, []);

  const todoData = todos.map((todo) => {
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
      <div key={todo._id} className="sched-cards">
        <div className="task-buttons">
          <button className="e-btn">✎</button>
          <button className="c-btn">✔</button>
          <button className="x-btn" onClick={(e) => handleDelete(todo._id)}>
            ✖
          </button>
        </div>
        <div className="task">
          <h4 className="sched-task">{todo.title}</h4>
          <hr></hr>
          <h5 className="task-day">{whatDay}</h5>
          <hr></hr>
          <small>
            <i className="task-date"></i>
            {formattedDate}
          </small>
          <hr></hr>
          <div style={{ wordWrap: "break-word" }} className="task-todo">
            <p>{todo.description}</p>
          </div>
          <hr></hr>
        </div>
      </div>
    );
  });

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
          <div className="logo">TODO</div>
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
        <div className="schedules">{todoData}</div>
      </div>
    </>
  );
}
