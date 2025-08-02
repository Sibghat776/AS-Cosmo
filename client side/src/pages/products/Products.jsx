import React, { useState, useEffect } from 'react';
import "./products.scss";
import ProductCard from '../../components/productCard/ProductCard';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const fetchData = async () => {
    try {
      setLoading(true); 
      const data = await axios.get(`http://localhost:3000/api/v1/products/getProducts/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setProducts(data.data.data);
    } catch (error) {
      console.log("Error fetching products:", error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div className="productContainer">
      {loading ? (
        <div className="loaderContainer">
          <div className="spinner"></div>
          <p style={{marginBottom: "50px"}}>Loading products...</p>
        </div>
      ) : (
        products.length === 0 ? (
          <h2 style={{
            textAlign: "center",
            color: "#D63384",
            fontWeight: "500",
            marginTop: "50px",
            fontSize: "22px",
          }}>
            No products found in this category.
          </h2>
        ) : (
          products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))
        )
      )}
    </div>
  );
};

export default Products;
