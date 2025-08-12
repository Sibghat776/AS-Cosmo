import React, { useContext, useEffect, useState } from 'react'
import "./cart.scss"
import CartProductCard from '../../components/cartProductCard/CartProductCard'
import { CartContext } from '../../../context/CartContext'
import { Link, useNavigate } from 'react-router-dom'

const Cart = () => {
    const {items} = useContext(CartContext)

useEffect(() => {
  if (!sessionStorage.getItem("reloaded")) {
    sessionStorage.setItem("reloaded", "true");
    window.location.reload();
  }
}, []);

  return (
    <>
   {
    items.length === 0 ?
     <h2 className='emptyCartHeading'>No items in your cart yet.</h2> :
     <div className='cartPage'>

 <div className="cartHeader">
        <h2>Your Shopping Cart</h2>
        <p>You have {items.length} items in your cart.</p>
      </div>

{
    items.map((item, idx)=> {
 return <CartProductCard item={item} idx={idx} key={idx} />
    })
}

 <div className="cartSummary">
          <div className="summaryDetails">
            <h3>Order Summary</h3>
            <p>Total Items: <span>{items.length}</span></p>
            <p>Estimated Total: <span>Rs. {
         items?.reduce((total, item) => total + item.price * item.quantity, 0)
        }/-</span></p>
          </div>

          <Link to="/checkout"><button className="orderBtn">Place Order</button></Link>
        </div>
    </div>
   }
    </>
  )
}

export default Cart