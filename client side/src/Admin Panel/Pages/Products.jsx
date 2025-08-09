import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, Edit } from 'lucide-react';

// Dummy data to make the component runnable
const productRows = [
  { id: 1, name: "Apple AirPods", img: "https://placehold.co/64x64/E0E0E0/333333?text=AirPods", stock: 123, status: "active", price: "$120.00" },
  { id: 2, name: "MacBook Pro", img: "https://placehold.co/64x64/E0E0E0/333333?text=MacBook", stock: 250, status: "active", price: "$1500.00" },
  { id: 3, name: "Samsung S23", img: "https://placehold.co/64x64/E0E0E0/333333?text=S23", stock: 75, status: "inactive", price: "$999.00" },
  { id: 4, name: "Logitech Mouse", img: "https://placehold.co/64x64/E0E0E0/333333?text=Mouse", stock: 400, status: "active", price: "$50.00" },
];

const Products = () => {
  const [data, setData] = useState(productRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Products</h1>
        <Link to="/products/new">
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
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <img
                      className="w-10 h-10 rounded-full object-cover"
                      src={row.img}
                      alt={row.name}
                    />
                    <span className="text-sm font-medium text-gray-900">{row.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.stock}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${row.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                      }`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.price}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <Link to={`/products/${row.id}`} className="text-indigo-600 hover:text-indigo-900 transition-colors">
                      <Edit size={18} />
                    </Link>
                    <button
                      onClick={() => handleDelete(row.id)}
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

export default Products;