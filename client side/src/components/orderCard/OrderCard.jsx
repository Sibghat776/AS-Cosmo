import React, { useState } from "react";
import "./orderCard.scss"; 

const OrderCard = ({ order }) => {

  return (
    <div className="cartProductCard">
      <img src={order?.img} alt={order.name} className="productImg" />

      <div className="details">
        <h2 className="productName">{order?.name}</h2>
        <p className="price">Rs. {order?.price}</p>
        <p className="quantity">
          Quantity: <span>{order?.quantity}</span>
        </p>
        <p className="desc">{order?.description}</p>
        <p className="totalPrice">Total Price: {order?.price * order?.quantity}</p>
      </div>
    </div>
  );
};

export default OrderCard;
