import React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";

/**
 * A dashboard component displaying key featured metrics like Revenue, Sales, and Cost.
 * The layout is fully responsive, stacking the cards on smaller screens.
 */
const Featured = () => {
    return (
        <div className="w-full flex flex-col md:flex-row gap-6 p-4">
            {/* Featured Item: Revenue */}
            <div className="flex-1 bg-white p-6 rounded-xl shadow-lg transition-transform hover:scale-105 duration-200">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-xl font-semibold text-gray-700">Revenue</span>
                    {/* Add an info icon here if needed */}
                </div>
                <div className="flex items-center my-2">
                    <span className="text-3xl font-bold text-gray-900">$2,415</span>
                    <span className="flex items-center ml-4 text-red-600 text-sm font-medium">
                        -11.4% <ArrowDown size={16} className="ml-1" />
                    </span>
                </div>
                <span className="text-sm text-gray-500">Compared to last month</span>
            </div>

            {/* Featured Item: Sales */}
            <div className="flex-1 bg-white p-6 rounded-xl shadow-lg transition-transform hover:scale-105 duration-200">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-xl font-semibold text-gray-700">Sales</span>
                    {/* Add an info icon here if needed */}
                </div>
                <div className="flex items-center my-2">
                    <span className="text-3xl font-bold text-gray-900">$4,415</span>
                    <span className="flex items-center ml-4 text-green-600 text-sm font-medium">
                        +2.4% <ArrowUp size={16} className="ml-1" />
                    </span>
                </div>
                <span className="text-sm text-gray-500">Compared to last month</span>
            </div>

            {/* Featured Item: Cost */}
            <div className="flex-1 bg-white p-6 rounded-xl shadow-lg transition-transform hover:scale-105 duration-200">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-xl font-semibold text-gray-700">Cost</span>
                    {/* Add an info icon here if needed */}
                </div>
                <div className="flex items-center my-2">
                    <span className="text-3xl font-bold text-gray-900">$2,225</span>
                    <span className="flex items-center ml-4 text-green-600 text-sm font-medium">
                        +1.4% <ArrowUp size={16} className="ml-1" />
                    </span>
                </div>
                <span className="text-sm text-gray-500">Compared to last month</span>
            </div>
        </div>
    );
};

export default Featured;