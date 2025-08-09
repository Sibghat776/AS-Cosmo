import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminLayout from "./components/AdminLayout";
import Home from "./Pages/Home";
import Users from "./Pages/Users";
import Products from "./Pages/Products";
import User from "./Pages/User";
import NewUser from "./Pages/NewUser";
import Chart from "./components/Chart";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout Route */}
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Home />} />
          <Route path="users" element={<Users />} />
          <Route path="products" element={<Products />} />
          <Route path="user/:id" element={<User />} />
          <Route path="new-user" element={<NewUser />} />
          <Route path="analytics" element={<Chart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;