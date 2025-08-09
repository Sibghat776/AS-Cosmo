import React from "react";

// Mock data for the table rows
const rows = [
    {
        id: 1,
        username: "John Smith",
        img: "https://placehold.co/40x40/E0E0E0/333333?text=JS",
        date: "2 Jun 2025",
        amount: 122.0,
        method: "Cash on Delivery",
        status: "Approved",
    },
    {
        id: 2,
        username: "Alice Johnson",
        img: "https://placehold.co/40x40/E0E0E0/333333?text=AJ",
        date: "3 Jun 2025",
        amount: 250.0,
        method: "Online Payment",
        status: "Pending",
    },
    {
        id: 3,
        username: "Michael Lee",
        img: "https://placehold.co/40x40/E0E0E0/333333?text=ML",
        date: "4 Jun 2025",
        amount: 90.0,
        method: "Online Payment",
        status: "Approved",
    },
    {
        id: 4,
        username: "Emma Brown",
        img: "https://placehold.co/40x40/E0E0E0/333333?text=EB",
        date: "5 Jun 2025",
        amount: 320.0,
        method: "Cash on Delivery",
        status: "Declined",
    },
];

/**
 * A responsive table component to display the latest transactions.
 */
const Table = () => {
    // A helper component for rendering the status badge
    const StatusBadge = ({ status }) => {
        let colorClass;
        switch (status) {
            case "Approved":
                colorClass = "bg-green-100 text-green-700";
                break;
            case "Pending":
                colorClass = "bg-yellow-100 text-yellow-700";
                break;
            case "Declined":
                colorClass = "bg-red-100 text-red-700";
                break;
            default:
                colorClass = "bg-gray-100 text-gray-700";
        }

        return (
            <span
                className={`px-3 py-1 rounded-full text-xs font-medium tracking-wide ${colorClass}`}
            >
                {status}
            </span>
        );
    };

    return (
        <div className="w-full shadow-lg rounded-xl p-6 bg-white overflow-x-auto">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
                Latest Transactions
            </h3>
            <table className="min-w-full text-left border-collapse">
                <thead>
                    <tr className="text-xs font-semibold text-gray-500 uppercase border-b border-gray-200">
                        <th className="py-3 px-2">Customer</th>
                        <th className="py-3 px-2">Date</th>
                        <th className="py-3 px-2">Amount</th>
                        <th className="py-3 px-2">Payment Method</th>
                        <th className="py-3 px-2">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {rows.map((row) => (
                        <tr key={row.id} className="text-sm text-gray-800 hover:bg-gray-50 transition-colors duration-150">
                            <td className="flex items-center gap-3 py-3 px-2 whitespace-nowrap">
                                <img
                                    src={row.img}
                                    alt={row.username}
                                    className="w-10 h-10 rounded-full object-cover border border-gray-200"
                                />
                                <span className="font-medium">{row.username}</span>
                            </td>
                            <td className="py-3 px-2 whitespace-nowrap">{row.date}</td>
                            <td className="py-3 px-2 whitespace-nowrap font-medium">${row.amount.toFixed(2)}</td>
                            <td className="py-3 px-2 whitespace-nowrap text-gray-600">{row.method}</td>
                            <td className="py-3 px-2 whitespace-nowrap">
                                <StatusBadge status={row.status} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;