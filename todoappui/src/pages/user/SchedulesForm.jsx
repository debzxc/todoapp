import react, { useContext } from "react";
import { createContext, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "./css/home.css";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import { Bar } from "react-chartjs-2";
import Login from "../Login";
import Cookies from "js-cookie";
import AuthContext from "./AuthContext";
import { AuthContextProvider } from "./AuthContext";

export default function Home(props) {
  const [taskNo] = useState(1);
  const [date, setSelectedDate] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [count, setCount] = useState(null);
  const [todos, setTodos] = useState([]);
  const Navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [email, setEmail] = useState();

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3001/auth-check")
  //     .then((res) => {
  //       if (res.data.status === "authenticated") {
  //         setAuthenticated(true);
  //       }
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       setAuthenticated(false);
  //     });
  // }, []);
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3001/auth-check")
  //     .then((response) => {
  //       if (response.data.status === "authenticated") {
  //         setAuthenticated(true);
  //       }
  //     })
  //     .catch((error) => {});
  // }, []);

  // useEffect(() => {
  //   const token = Cookies.get("connect.sid");

  //   if (token) {
  //     axios
  //       .get("http://localhost:3001/auth-check", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //       .then((res) => {
  //         if (res.data.status === "authenticated") {
  //           setAuthenticated(true);
  //         } else {
  //           // Token is invalid or expired, redirect to the login page
  //           window.location.href = "/Login";
  //         }
  //       })
  //       .catch((err) => console.error(err));
  //   } else {
  //     // window.location.href = "/Login";
  //     // console.log(token);
  //     console.log("error");
  //   }
  // }, []);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3001/userVerify")
  //     .then((res) => {
  //       console.log(res.data);
  //       if (res.data === "Authenticated") {
  //         setAuthenticated(true);
  //       } else {
  //         Navigate("/Login");
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  // // Set a timer to automatically delete authentication status from localStorage after a specified time (e.g., 30 minutes)
  // const expirationTimeInMinutes = 0.5;
  // const expirationTimeInMilliseconds = expirationTimeInMinutes * 60 * 1000;

  // const clearAuthenticationTimer = setTimeout(() => {
  //   localStorage.removeItem("authentication");
  // }, expirationTimeInMilliseconds);

  // // Make sure to clear the timer when the component unmounts
  // return () => clearTimeout(clearAuthenticationTimer);

  // useEffect(() => {
  //   // // Check localStorage for authentication status
  //   // const localStorageAuth = localStorage.getItem("authentication");
  //   // if (localStorageAuth === "true") {
  //   //   setAuthenticated(true);
  //   // } else {
  //   //   axios
  //   //     .get("http://localhost:3001/userVerify")
  //   //     .then((res) => {
  //   //       console.log(res.data);
  //   //       if (res.data === "Authenticated") {
  //   //         setAuthenticated(true);
  //   //         localStorage.setItem("authentication", "true");
  //   //       } else {
  //   //         Navigate("/Login");
  //   //       }
  //   //     })
  //   //     .catch((err) => console.log(err));
  //   // }
  // }, []);

  // useEffect(() => {
  //   // Check localStorage for authentication status
  //   const localStorageAuth = localStorage.getItem("authenticated");

  //   if (localStorageAuth === "false") {
  //     axios
  //       .get("http://localhost:3001/userVerify")
  //       .then((res) => {
  //         console.log(res.data);
  //         if (res.data === "Authenticated") {
  //           setAuthenticated(true);

  //           localStorage.setItem("authenticated", "true");
  //         } else {
  //           Navigate("/Login");
  //         }
  //       })
  //       .catch((err) => console.log(err));
  //   } else if (localStorage.getItem("authenticated", "true")) {
  //     Navigate("/Home");
  //   } else {
  //     console.log("Auth Error");
  //   }
  // }, []);

  // useEffect(() => {
  //   const checkAuthentication = async () => {
  //     try {
  //       const localStorageAuth = localStorage.getItem("authentication");

  //       if (localStorageAuth === "true") {
  //         setAuthenticated(true);
  //       } else {
  //         const response = await axios.get("http://localhost:3001/userVerify");
  //         console.log(response.data);

  //         if (response.data === "Authenticated") {
  //           setAuthenticated(true);

  //           try {
  //             const loginResponse = await axios.post(
  //               "http://localhost:3001/Login"
  //             );
  //             setUserInfo(loginResponse.data.user);
  //             localStorage.setItem("authentication", "true");
  //           } catch (loginError) {
  //             console.error(loginError);
  //           }
  //         } else {
  //           Navigate("/Login");
  //         }
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   checkAuthentication();
  // }, []);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3001/userVerify")
  //     .then((res) => {
  //       console.log(res.data);
  //       if (res.data === "Authenticated") {
  //         setAuthenticated(true);
  //       } else {
  //         // Check if the session is already authenticated
  //         if (res.data.authenticated) {
  //           Navigate("/Home");
  //         } else {
  //           // Session is not authenticated, redirect to Login
  //           Navigate("/Login");
  //         }
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  // useEffect(() => {
  //   // Get a specific cookie by name
  //   const token = Cookies.get('token');

  //   if (token) {
  //     // Use the 'token' value
  //     console.log('Token:', token);
  //   } else {
  //     // No 'token' cookie found
  //     console.log('Token cookie not found');
  //   }
  // }, []);

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
      await axios.post("http://localhost:3001/Logout");
      localStorage.removeItem("authentication");
      localStorage.removeItem("LOGGED_IN_USER");
      localStorage.removeItem("USER_ROLE");
      localStorage.removeItem("SESSION");
      localStorage.setItem("LOGGED_IN", false);
      Navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const localStorageUser = localStorage.getItem("LOGGED_IN_USER");
  const UserAuth = localStorage.getItem("LOGGED_IN");
  // const { loggedIn } = useContext(AuthContext);
  // console.log(loggedIn);

  return (
    <>
      {/* {loggedIn === false && (
        <>
          <h1>
            You're Not Logged In Please Log in here{" "}
            <Link to="/Login">CLick here!1</Link>
          </h1>
        </>
      )}
      {loggedIn === true && (
        <> */}
      <div id="wrapper">
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
        <div className="weekly-activities">
          <div className="activities">
            <span className="this-activities">Activity</span>
            <br></br>
            <hr></hr>
            <small className="numActivities1">Activity 📓 {count}</small>
            <br></br>
            <small className="numActivities2">Activity ✔ </small>
            <br></br>
            <small className="numActivities3">Activity ✖ 4</small>
          </div>
        </div>
      </div>
      {/* </> */}
      {/* // )} */}
    </>
  );
}
