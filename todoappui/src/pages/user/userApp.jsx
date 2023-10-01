import react from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Home from "./SchedulesForm";
import UserSched from "./Schedules";

export default function UserApp() {
  return (
    <>
      <div>
        <Home />
      </div>
    </>
  );
}
