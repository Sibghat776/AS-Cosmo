// src/Admin/AdminPanel.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css"

import Home from "./Pages/Home";
import Users from "./Pages/Users";
import Products from "./Pages/Products";
import User from "./Pages/User";
import NewUser from "./Pages/NewUser";
import Chart from "./components/Chart";
import AdminLayout from "./components/AdminLayout"

const AdminPanel = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Home />} />
        <Route path="users" element={<Users />} />
        <Route path="products" element={<Products />} />
        <Route path="user/:id" element={<User />} />
        <Route path="new-user" element={<NewUser />} />
        <Route path="analytics" element={<Chart />} />
      </Route>
    </Routes>
  );
};

export default AdminPanel;
