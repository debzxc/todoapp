import react from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "./css/schedule.css";
import axios from "axios";

export default function UserSched() {
  const [todos, setTodos] = useState([]);
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
      // <div key={todo._id} className="card">
      //   <div className="card-body">
      //     <h4 className="card-title mt-0">
      //       <a className="text-light">{todo.title}</a>
      //     </h4>
      //     <small>
      //       <i className="far fa-clock"></i> {formattedDate}
      //     </small>
      //     <h5>{whatDay}</h5>
      //     <div className="content-body">
      //       <p>{todo.description}</p>
      //     </div>
      //   </div>
      // </div>

      <div className="sched-cards">
        <div className="task-delete">delete</div>
        <div className="task">
          <h4 className="sched-task">Task</h4>
          <h5 className="task-day">Day</h5>
          <small>
            <i className="task-date"></i>asd
          </small>
          <div className="task-todo">
            <p>Text</p>
          </div>
        </div>
      </div>
    );
  });
  return (
    <>
      <div className="cContainer">
        <div className="cards">{todoData}</div>;
      </div>
    </>
  );
}
