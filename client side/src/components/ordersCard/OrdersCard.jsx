import React from 'react';
import './ordersCard.scss';

const OrdersCard = ({ name, description, price }) => {
  return (
    <div className="ordersCard">
      <img src="/img/lipstick.avif" alt="product" className="productImg" />
      <div className="productName">{name}</div>
      <div className="productDes">{description.slice(0, 40)} ....</div>
      <div className="price">{price}</div>
      <div className="orderDate">25 Feb 2025</div>
    </div>
  );
};

export default OrdersCard;
