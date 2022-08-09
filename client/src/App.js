import React from "react";
import Login from "./components/login/Login.js";
// ADMIN
import Admin from "./components/admin/Admin.js";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
