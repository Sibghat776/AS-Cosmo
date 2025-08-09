import React from "react";
import Featured from "../components/Featured";
import Chart from "../components/Chart";
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
    <div className="flex flex-col h-full bg-gray-50">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">

        {/* Title */}
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 text-gray-800">
          Dashboard
        </h1>

        {/* Featured Section */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Featured />
        </div>

        {/* Chart */}
        <section className="mt-8">
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
            <Chart title="User Analytics" dataKey="users" grid data={chartData} />
          </div>
        </section>

        {/* Table */}
        <section className="mt-8">
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 overflow-x-auto">
            <Table />
          </div>
        </section>
      </div>
    </div>
  );
};

export default React.memo(Home);