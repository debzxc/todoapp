import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Admin() {
  const [success, setSuccess] = useState();
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:3001/Admin")
      .then((res) => {
        console.log(res.data);
        if (res.data === "Success") {
          setSuccess("Succeeded!");
        } else {
          console.log("Error");
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <div>Admin Home</div>
      <p>{success}</p>
    </>
  );
}
