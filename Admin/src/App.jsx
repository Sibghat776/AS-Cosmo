import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Note: In a real app, you would import your components here
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import Users from "./Pages/Users";
import Products from "./Pages/Products";
import User from "./Pages/User";
import NewUser from "./Pages/NewUser";
import Widget from "./components/Widget";
import Chart from "./components/Chart";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <BrowserRouter>
      {/* Main container with a clean, responsive layout */}
      <div className="flex w-full min-h-screen bg-gray-100">
        <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

        {/* Content area: flex-1 takes remaining width, flex-col for stacking Navbar and page content */}
        <div className="flex-1 flex flex-col transition-all duration-300">
          <Navbar setIsSidebarOpen={setIsSidebarOpen} />

          {/* Main content area with padding */}
          <div className="p-4 md:p-6 lg:p-8 flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/users" element={<Users />} />
              <Route path="/products" element={<Products />} />
              <Route path="/users/:id" element={<User />} />
              <Route path="/new-user" element={<NewUser />} />
              <Route path="/analytics" element={<Chart />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;