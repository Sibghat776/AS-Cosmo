import React from "react";
import { Card } from "..//components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Featured from "../components/Featured";
import Chart from "../components/Chart";
import Widget from "../components/Widget";
import Table from "../components/Table";

const Home = () => {
  const chartData = [
    { name: "Jan", users: 4000 },
    { name: "Feb", users: 3000 },
    { name: "Mar", users: 5000 },
    { name: "Apr", users: 4000 },
    { name: "May", users: 6000 },
    { name: "Jun", users: 7000 },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-[#1e293b]">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Widget type="user" />
        <Widget type="order" />
        <Widget type="earning" />
        <Widget type="balance" />
      </div>
      <Featured />
      <div className="mt-8">
        <Chart title="User Analytics" dataKey="users" grid data={chartData} />
      </div>
      <div className="mt-8">
        <Table />
      </div>
    </div>
  );
}