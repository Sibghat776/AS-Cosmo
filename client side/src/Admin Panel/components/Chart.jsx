import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

// Sample data - This can be replaced with data from an API or a different source.
const data = [
    { name: "Jan", ActiveUser: 4000 },
    { name: "Feb", ActiveUser: 3000 },
    { name: "Mar", ActiveUser: 2000 },
    { name: "Apr", ActiveUser: 2780 },
    { name: "May", ActiveUser: 1890 },
    { name: "Jun", ActiveUser: 2390 },
    { name: "Jul", ActiveUser: 3490 },
    { name: "Aug", ActiveUser: 2000 },
    { name: "Sep", ActiveUser: 2780 },
    { name: "Oct", ActiveUser: 1890 },
    { name: "Nov", ActiveUser: 2390 },
    { name: "Dec", ActiveUser: 3490 },
];

/**
 * A reusable React component for displaying a line chart.
 *
 * @param {object} props - Component props.
 * @param {string} props.title - The title of the chart.
 * @param {string} props.dataKey - The key from the data object to display on the y-axis.
 * @param {boolean} props.grid - Whether to display a grid on the chart.
 * @returns {JSX.Element} The rendered chart component.
 */
const Chart = ({ title = "User Analytics", dataKey = "ActiveUser", grid = true }) => {
    return (
        <div className="w-full p-6 shadow-lg bg-white rounded-xl mt-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <XAxis dataKey="name" stroke="#5a67d8" />
                    <Line type="monotone" dataKey={dataKey} stroke="#5a67d8" strokeWidth={2} />
                    <Tooltip />
                    {/* Optionally display a grid based on the 'grid' prop */}
                    {grid && <CartesianGrid stroke="#e0e0e0" strokeDasharray="5 5" />}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Chart;