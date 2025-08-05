import React from "react";

const NewUser = () => {
    return (
        <div className="p-4 md:p-6 lg:p-8 w-full">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Create New User</h1>

            <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-white shadow-lg p-6 rounded-xl max-w-4xl mx-auto">
                <div className="flex flex-col col-span-1">
                    <label className="text-sm font-medium text-gray-600 mb-2">Username</label>
                    <input
                        type="text"
                        placeholder="john_doe"
                        className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                    />
                </div>

                <div className="flex flex-col col-span-1">
                    <label className="text-sm font-medium text-gray-600 mb-2">Full Name</label>
                    <input
                        type="text"
                        placeholder="John Doe"
                        className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                    />
                </div>

                <div className="flex flex-col col-span-1">
                    <label className="text-sm font-medium text-gray-600 mb-2">Email</label>
                    <input
                        type="email"
                        placeholder="john@example.com"
                        className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                    />
                </div>

                <div className="flex flex-col col-span-1">
                    <label className="text-sm font-medium text-gray-600 mb-2">Password</label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                    />
                </div>

                <div className="flex flex-col col-span-1">
                    <label className="text-sm font-medium text-gray-600 mb-2">Phone</label>
                    <input
                        type="text"
                        placeholder="+92 300 1234567"
                        className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                    />
                </div>

                <div className="flex flex-col col-span-1">
                    <label className="text-sm font-medium text-gray-600 mb-2">Address</label>
                    <input
                        type="text"
                        placeholder="Karachi, Pakistan"
                        className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                    />
                </div>

                <div className="flex flex-col col-span-1">
                    <label className="text-sm font-medium text-gray-600 mb-2">Gender</label>
                    <select className="border border-gray-300 p-3 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200">
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className="flex flex-col col-span-1">
                    <label className="text-sm font-medium text-gray-600 mb-2">Active</label>
                    <select className="border border-gray-300 p-3 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200">
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>

                <div className="col-span-full mt-4">
                    <button
                        type="submit"
                        className="w-full sm:w-auto bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Create
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewUser;