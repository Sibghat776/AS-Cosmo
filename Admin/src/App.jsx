import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import Users from "./Pages/Users";
import Products from "./Pages/Products";
import User from "./Pages/User";
import NewUser from "./Pages/NewUser";
import Chart from "./components/Chart";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="flex w-full h-screen bg-gray-100 overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        {/* Main Content Wrapper */}
        <div className="flex-1 flex flex-col">
          {/* Navbar */}
          <Navbar setIsSidebarOpen={setIsSidebarOpen} />

          {/* Scrollable Page Content */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/users" element={<Users />} />
              <Route path="/products" element={<Products />} />
              <Route path="/users/:id" element={<User />} />
              <Route path="/new-user" element={<NewUser />} />
              <Route path="/analytics" element={<Chart />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;