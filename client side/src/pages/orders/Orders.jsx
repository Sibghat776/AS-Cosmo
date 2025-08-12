import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import "./orders.scss";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loadingId, setLoadingId] = useState(false);
  

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/orders/`);
      // console.log(res.data.orders)
      const reverseOrders = res.data.orders.reverse()
      setOrders(reverseOrders);
    } catch (error) {
      console.log(error.message);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  const formatAmount = (amount) => {
    return amount.toLocaleString('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0
    });
  }

  const deleteHandler = async (id) => {
    setLoadingId(id)
    try {
      const res = axios.delete(`${import.meta.env.VITE_API_URL}/api/v1/orders/${id}`)
          setOrders((prev) => prev.filter((order) => order._id !== id));
    } catch (error) {
setLoadingId(null)
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  return (

    <div className="ordersContainer">
      {orders.map((order, i) => (
        <Link to={`/order/${order._id}`} state={{ order }} key={i} >
{
  loadingId === order?._id ? 
  <div className="center">
    <div className="loading"></div>
  </div>
  :
      <div className="orderCard" key={i}>
            <div className="statusBar"></div>

            <div className="orderContent">
              {/* Left Side */}
              <div className="customerInfo">
                <h3>{order.fullName}</h3>
                <p><strong>Email:</strong> {order.email}</p>
                <p><strong>City:</strong> {order.city}</p>
                <p><strong>Address:</strong> {order.address}</p>
                <p><strong>Phone:</strong> {order.phoneNumber}</p>
              </div>

              {/* Right Side */}
              <div className="orderInfo">
                <p><strong>Price:</strong> PKR {formatAmount(order.totalPrice)}/-</p>
                <p><strong>Orders:</strong> {order.totalItems}</p>
                <p><strong>Date:</strong> {formatDate(order.createdAt)}</p>
                <button className="delete" onClick={(e) => {
                  e.preventDefault()
                  deleteHandler(order?._id)
                }}>Delete</button>
              </div>
            </div>
          </div>
}
        </Link>
      ))}
    </div>
  );
};

export default Orders;
