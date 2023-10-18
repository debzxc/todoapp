import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserApp from "./pages/user/userApp";
import Admin from "./components/admin/Admin";
import Schedule from "./pages/user/Schedules";
import EmailVerify from "./pages/EmailVerify/emailVerify";
import LandingPage from "./pages/LandingPage";
import EmailVerification from "./pages/EmailVerify/verifyEmail";
import UpdateSchedules from "./pages/UpdateSchedules";
import DashBoard from "./pages/DashBoard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/Register" element={<Register />}></Route>
          <Route path="/Home" element={<UserApp />}></Route>
          <Route path="/Admin" element={<Admin />}></Route>
          <Route path="/Home/Schedule" element={<Schedule />}></Route>
          <Route
            path="/users/:id/verify/:token"
            element={<EmailVerify />}
          ></Route>
          <Route
            path="/Update/:taskNo/:id"
            element={<UpdateSchedules />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
