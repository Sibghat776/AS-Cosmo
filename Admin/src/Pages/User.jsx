import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { User, Calendar, Mail, Phone, MapPin } from 'lucide-react';

// Dummy data and fetch function to make the component runnable
const userRows = [
    {
        id: 1,
        username: "john_doe",
        fullName: "John Doe",
        avatar: "https://placehold.co/128x128/E0E0E0/333333?text=JD",
        email: "john@example.com",
        status: "active",
        phone: "+92 300 1234567",
        address: "Karachi, Pakistan",
        birthDate: "12.08.1995"
    },
    {
        id: 2,
        username: "jane_smith",
        fullName: "Jane Smith",
        avatar: "https://placehold.co/128x128/E0E0E0/333333?text=JS",
        email: "jane@example.com",
        status: "active",
        phone: "+92 300 9876543",
        address: "Lahore, Pakistan",
        birthDate: "05.12.1990"
    }
];

const fetchUsers = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(userRows);
        }, 500);
    });
};

const user = () => {
    const { userId } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchUsers().then((users) => {
            const found = users.find((u) => u.id === parseInt(userId));
            setUser(found || null);
        });
    }, [userId]);

    if (!user) {
        return (
            <div className="p-4 md:p-6 lg:p-8 flex flex-col items-center justify-center min-h-[500px]">
                <h2 className="text-2xl font-bold text-red-600 mb-4">User not found</h2>
                <button
                    onClick={() => navigate(-1)}
                    className="bg-indigo-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-6 lg:p-8 w-full">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800">User Details</h1>
                <Link to="/users/new">
                    <button
                        className="bg-indigo-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm"
                    >
                        Create New User
                    </button>
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Side: User Info */}
                <div className="lg:col-span-1 bg-white shadow-lg rounded-xl p-6">
                    <div className="flex items-center gap-4 border-b pb-4 mb-4">
                        <img
                            src={user.avatar}
                            alt="avatar"
                            className="w-16 h-16 rounded-full object-cover shadow"
                        />
                        <div>
                            <h3 className="text-lg font-bold text-gray-800">{user.username}</h3>
                            <p className="text-gray-500 text-sm">Software Engineer</p>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-gray-600 font-semibold text-sm mb-3 uppercase tracking-wider">
                            Account Details
                        </h4>
                        <div className="flex items-center gap-2 text-gray-700 text-sm mb-2">
                            <User size={18} className="text-indigo-500" />
                            <span>{user.fullName}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700 text-sm mb-2">
                            <Calendar size={18} className="text-indigo-500" />
                            <span>{user.birthDate}</span>
                        </div>

                        <h4 className="text-gray-600 font-semibold text-sm mt-6 mb-3 uppercase tracking-wider">
                            Contact Details
                        </h4>
                        <div className="flex items-center gap-2 text-gray-700 text-sm mb-2">
                            <Phone size={18} className="text-indigo-500" />
                            <span>{user.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700 text-sm mb-2">
                            <Mail size={18} className="text-indigo-500" />
                            <span>{user.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700 text-sm">
                            <MapPin size={18} className="text-indigo-500" />
                            <span>{user.address}</span>
                        </div>
                    </div>
                </div>

                {/* Right Side: Edit Form */}
                <div className="lg:col-span-2 bg-white shadow-lg rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit User</h2>
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-600 mb-2">
                                Username
                            </label>
                            <input
                                type="text"
                                defaultValue={user.username}
                                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-600 mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                defaultValue={user.fullName}
                                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-600 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                defaultValue={user.email}
                                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-600 mb-2">
                                Phone
                            </label>
                            <input
                                type="text"
                                defaultValue={user.phone}
                                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-600 mb-2">
                                Address
                            </label>
                            <input
                                type="text"
                                defaultValue={user.address}
                                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-600 mb-2">
                                Status
                            </label>
                            <select
                                defaultValue={user.status}
                                className="p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>

                        <div className="col-span-full flex justify-end">
                            <button
                                type="submit"
                                className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-4"
                            >
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default User;