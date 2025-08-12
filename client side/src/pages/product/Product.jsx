import React, { useContext, useEffect, useState } from "react";
import "./product.scss";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CartContext } from "../../../context/CartContext";
import { toastAlert } from "../../utils/toastAlert";

const Product = () => {
  const [product, setProduct] = useState();
  const { id } = useParams();
  const [productQuantity, setProductQuantity] = useState(0)
  const [err, setErr] = useState(false)
  const {items, setItems} = useContext(CartContext)

  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/products/getProduct/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setProduct(res.data.data);
    } catch (error) {
      console.error("Error fetching product", error);
    }
  };

  const addToCart = ()=> {

if (productQuantity <= 0) {
 return toastAlert({
    type: "error",
    message: "Select quantity first."
  })
}

    const data = {
  name: product.name,
  img: product.images[0].url,
  price: product.price,
  description: product.description,
  quantity: productQuantity
}
const itemsCopy = [...items]
itemsCopy.push(data)
localStorage.setItem("items", JSON.stringify(itemsCopy))
setItems(itemsCopy)
toastAlert({
  type: "success",
  message: "Item added to cart!"
})
setProductQuantity(0)
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="productPage">
      <div className="topSection">
        <div className="left">
          <img src={product?.images?.[0]?.url} alt={product?.name} />
        </div>

        <div className="right">
          <h1 className="title">{product?.name}</h1>
          <p className="price">Rs. {product?.price}/-</p>
          <p className="description">{product?.description}</p>

          <div className="options">
            <div className="quantity">
              <button onClick={()=> {
                productQuantity > 0 ? setProductQuantity(productQuantity - 1) : null
                    setErr(false)
              }}>-</button>
              <span>{productQuantity}</span>
              <button onClick={()=> {
if (productQuantity > 18) {
    setErr(true)
    setProductQuantity(20)
} else {
    setErr(false)
    setProductQuantity(productQuantity + 1)
}
              }}>+</button>
{err && <span style={{fontSize: "14px", color: "gray", lineHeight: "19px"}}>You can only add up to 20 items at a time. Please reduce the quantity.</span>}
            </div>
          </div>
            <button className="addToCart" onClick={addToCart}>Add to Cart</button>

          <div className="meta">
            <p>
              <strong>Stock:</strong>{" "}
              {product?.stock > 0
                ? `${product?.stock} available`
                : "Out of Stock"}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(product?.createdAt).toLocaleDateString("en-GB")}
            </p>
          </div>
        </div>
      </div>

      {/* Moved Note Below */}
      <div className="note">
        <h2>⚠ Important</h2>
        <p>
          Please note that we do not offer any return policy. However, we
          guarantee that your product will be delivered safely, securely, and in
          excellent condition. That's our promise to you.
        </p>
      </div>
    </div>
  );
};

export default Product;
