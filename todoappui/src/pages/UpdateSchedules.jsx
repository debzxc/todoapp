import react from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdateSchedules() {
  const { id } = useParams("");
  const { taskNo } = useParams("");
  const [date, setSelectedDate] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate("");
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/getTask/" + taskNo)
      .then((result) => {
        console.log(result);
        setSelectedDate(result.data.date);
        setTitle(result.data.title);
        setDescription(result.data.description);
      })
      .catch((err) => console.log(err));
  }, []);

  const Update = (e) => {
    const formattedDate = formatDate(date);
    e.preventDefault();
    axios
      .put("http://localhost:3001/Update/" + taskNo, {
        date: formattedDate,
        title,
        description,
      })
      .then((result) => {
        console.log(result);
        navigate("/Home");
      })
      .then((err) => console.log(err));
  };

  const formatDate = (date) => {
    if (!date) {
      return ""; // Return an empty string if the date is not provided
    }

    if (!(date instanceof Date)) {
      date = new Date(date); // Convert to Date object if it's a date string
    }

    const month = date.getMonth() + 1; // Months are 0-indexed, so add 1
    const day = date.getDate();
    const year = date.getFullYear();

    // Create the formatted date string
    const formattedDate = `${month}/${day}/${year}`;

    return formattedDate;
  };

  return (
    <>
      <div className="d-flex vh-100 bg-light justify-content-center align-items-center">
        <div className="sched-cards2">
          <form onSubmit={Update}>
            <Link className="x-btn" to="/Home">
              ✖
            </Link>
            <h2>Update Activity</h2>
            <div className="mb-2">
              <label htmlFor="">Due</label>
              <label>{formattedDate}</label>
              <input
                type="date"
                placeholder="Select Date"
                className="form-control"
                value={date}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="">Title</label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="">Description</label>
              <textarea
                type="text"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="u-btn">
              <button className="btn btn-dark">Update</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
