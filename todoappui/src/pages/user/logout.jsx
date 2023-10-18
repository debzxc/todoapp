import React from "react";
import axios from "axios";

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      // Send a POST request to the server to log the user out
      await axios.post("http://localhost:3001/Logout");

      // If the request is successful, you can redirect the user to the login page
      window.location.href = "/Login"; // You can also use React Router for navigation
    } catch (error) {
      console.error("Error logging out:", error);
      // Handle any error appropriately, e.g., showing an error message to the user
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
