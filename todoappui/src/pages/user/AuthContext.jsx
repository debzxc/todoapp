import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [loggedIn, setLoggedIn] = useState(() => {
    // Use the value from localStorage or default to false if not present
    return JSON.parse(localStorage.getItem("LOGGED_IN")) || false;
  });

  async function getLoggedIn() {
    console.log("Fetching loggedIn status...");
    try {
      const loggedInRes = await axios.get("http://localhost:3001/loggedIn");
      console.log("Received loggedIn response:", loggedInRes.data);
      setLoggedIn(loggedInRes.data);
    } catch (error) {
      console.error("Error fetching loggedIn status:", error);
    }
  }

  useEffect(() => {
    console.log("Component mounted");

    // Check if the logged-in status is already fetched
    if (loggedIn === null) {
      getLoggedIn();
    }
  }, [loggedIn]);

  useEffect(() => {
    console.log("loggedIn state changed:", loggedIn);
    if (loggedIn !== null) {
      localStorage.setItem("LOGGED_IN", JSON.stringify(loggedIn));
    }
  }, [loggedIn]);

  return (
    <AuthContext.Provider value={{ loggedIn, getLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
}
export default AuthContext;
export { AuthContextProvider };
