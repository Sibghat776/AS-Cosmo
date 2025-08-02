import React from 'react';
import './productCard.scss';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
<Link to={`/product/${product._id}`}>
    <div className="productCard">
      <img src={product?.images[0].url} alt="" />
      <h2>{product.name}</h2>
      <p style={{textAlign: "center"}}>{product.description}</p>
      <p>Rs.{product?.price}/-</p>
    </div>
    </Link>
  );
};

export default ProductCard;
