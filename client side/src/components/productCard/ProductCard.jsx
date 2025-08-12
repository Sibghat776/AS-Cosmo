import React from 'react';
import './productCard.scss';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
<Link to={`/product/${product._id}`}>
    <div className="productCard">
      <img src={product?.images[0].url} alt="" />
      {
        product?.name?.length < 15 ?
        <h2 style={{textAlign: "center"}}>{product.name}</h2> :
        <h2 style={{textAlign: "center"}}>{product.name.slice(0, 15)}....</h2> 
      }
      <p style={{textAlign: "center"}}>{product.description.slice(0, 50)}....</p>
      <p>Rs.{product?.price}/-</p>
    </div>
    </Link>
  );
};

export default ProductCard;
