import react, { useContext } from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Home from "./SchedulesForm";
import UserHome from "./UserDashboard";
import UserSched from "./Schedules";
import AuthContext from "./AuthContext";
import { AuthContextProvider } from "./AuthContext";
import axios from "axios";

export default function UserApp() {
  return (
    <AuthContextProvider>
      <UserHome />
    </AuthContextProvider>
  );
}
