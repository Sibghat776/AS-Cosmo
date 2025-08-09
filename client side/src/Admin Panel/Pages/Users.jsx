import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Trash2, Edit } from 'lucide-react';

// Dummy data and a mock fetch function to make the component runnable
const userRows = [
  {
    id: 1,
    username: "john_doe",
    avatar: "https://placehold.co/128x128/E0E0E0/333333?text=JD",
    email: "john@example.com",
    status: "active",
    transaction: "$120.00"
  },
  {
    id: 2,
    username: "jane_smith",
    avatar: "https://placehold.co/128x128/E0E0E0/333333?text=JS",
    email: "jane@example.com",
    status: "active",
    transaction: "$250.00"
  },
  {
    id: 3,
    username: "sam_wilson",
    avatar: "https://placehold.co/128x128/E0E0E0/333333?text=SW",
    email: "sam@example.com",
    status: "inactive",
    transaction: "$0.00"
  },
  {
    id: 4,
    username: "linda_jones",
    avatar: "https://placehold.co/128x128/E0E0E0/333333?text=LJ",
    email: "linda@example.com",
    status: "active",
    transaction: "$50.00"
  },
  {
    id: 5,
    username: "peter_parker",
    avatar: "https://placehold.co/128x128/E0E0E0/333333?text=PP",
    email: "peter@example.com",
    status: "active",
    transaction: "$400.00"
  },
];

const fetchUsers = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(userRows);
    }, 500);
  });
};

const Users = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers().then((users) => {
      setData(users);
      setLoading(false);
    });
  }, []);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[600px] text-gray-500">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Users</h1>
        <Link to="/users/new">
          <button className="bg-indigo-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
            Add New
          </button>
        </Link>
      </div>

      <div className="bg-white shadow-lg rounded-xl overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Transaction Volume</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <img
                      className="w-10 h-10 rounded-full object-cover"
                      src={user.avatar}
                      alt={user.username}
                    />
                    <span className="text-sm font-medium text-gray-900">{user.username}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                      }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.transaction}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <Link to={`/users/${user.id}`} className="text-indigo-600 hover:text-indigo-900 transition-colors">
                      <Edit size={18} />
                    </Link>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-600 hover:text-red-900 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;