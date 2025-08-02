import React from 'react';
import './orders.scss';
import OrdersCard from '../../components/ordersCard/OrdersCard';

const Orders = () => {
  const dummyOrders = [
    {
      id: 1,
      name: 'Matte Lipstick',
      description: 'Long-lasting pink matte finish',
      price: 'Rs. 899',
    },
    {
      id: 2,
      name: 'Liquid Foundation',
      description: 'Smooth coverage for all-day wear',
      price: 'Rs. 1,499',
    },
    {
      id: 3,
      name: 'Waterproof Mascara',
      description: 'Volumizes and curls lashes',
      price: 'Rs. 1,199',
    },
    {
      id: 4,
      name: 'Compact Powder',
      description: 'Lightweight with natural finish',
      price: 'Rs. 799',
    },
  ];

  return (
    <div className="orders">
      {dummyOrders.map((order) => (
        <OrdersCard
          key={order.id}
          name={order.name}
          description={order.description}
          price={order.price}
        />
      ))}
    </div>
  );
};

export default Orders;
