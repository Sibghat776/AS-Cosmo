import React from "react";
import { ArrowUp, User, ShoppingCart, Wallet, PiggyBank } from "lucide-react";

/**
 * A reusable dashboard widget component for displaying key metrics.
 * The widget dynamically renders content based on the 'type' prop.
 *
 * @param {object} props - The component props.
 * @param {string} props.type - The type of widget to display (e.g., "user", "order", "earning", "balance").
 */
const Widget = ({ type }) => {
    let data;

    // Dummy data for demonstration purposes
    const amount = 100;
    const diff = 20;

    // This switch statement determines the content based on the 'type' prop
    switch (type) {
        case "user":
            data = {
                title: "USERS",
                isMoney: false,
                link: "See all users",
                icon: (
                    <User size={18} className="text-red-500 bg-red-200 p-1 rounded-sm" />
                ),
            };
            break;
        case "order":
            data = {
                title: "ORDERS",
                isMoney: false,
                link: "View all orders",
                icon: (
                    <ShoppingCart size={18} className="text-yellow-600 bg-yellow-200 p-1 rounded-sm" />
                ),
            };
            break;
        case "earning":
            data = {
                title: "EARNINGS",
                isMoney: true,
                link: "View net earnings",
                icon: (
                    <PiggyBank size={18} className="text-green-600 bg-green-200 p-1 rounded-sm" />
                ),
            };
            break;
        case "balance":
            data = {
                title: "BALANCE",
                isMoney: true,
                link: "See details",
                icon: (
                    <Wallet size={18} className="text-purple-600 bg-purple-200 p-1 rounded-sm" />
                ),
            };
            break;
        default:
            // Handle the default case or an invalid type
            data = { title: "UNKNOWN", isMoney: false, link: "", icon: null };
            break;
    }

    return (
        <div className="flex justify-between p-4 shadow-lg rounded-xl w-full bg-white transition-transform hover:scale-105 duration-200">
            <div className="flex flex-col justify-between">
                <span className="text-sm font-bold text-gray-500 uppercase">{data.title}</span>
                <span className="text-3xl font-bold text-gray-900">
                    {data.isMoney && "$"} {amount}
                </span>
                <a href="#" className="text-xs underline text-blue-600 hover:text-blue-800 transition-colors">
                    {data.link}
                </a>
            </div>
            <div className="flex flex-col justify-between items-end text-sm text-green-600 font-semibold">
                <div className="flex items-center gap-1">
                    <ArrowUp size={16} />
                    {diff}%
                </div>
                {data.icon}
            </div>
        </div>
    );
};

export default Widget;