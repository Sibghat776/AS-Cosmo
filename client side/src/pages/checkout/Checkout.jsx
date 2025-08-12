import React, { useContext, useState } from 'react'
import "./checkout.scss"
import { CartContext } from '../../../context/CartContext'
import axios from 'axios'
import { toastAlert } from '../../utils/toastAlert'
import { useNavigate } from 'react-router-dom'

const Checkout = () => {

  const { items } = useContext(CartContext)

  const allItemsPrice = items?.reduce((total, item) => total + item.price * item.quantity, 0)

  
const navigate = useNavigate()
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [number, setNumber] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [orderNote, setOrderNote] = useState("")
  const [totalPrice, setTotalPrice] = useState(allItemsPrice)
  const [totalItems, setTotalItems] = useState(items.length)
  const [order, setOrder] = useState(items)


  const orderConfirmHandler = async () => {
    console.log(totalItems)
    console.log(totalPrice)
    console.log(order)
    console.log(fullName)
    console.log(email)
    console.log(number)
    console.log(address)
    console.log(city)
    console.log(orderNote)
    console.log(localStorage.getItem("userId"))
    if (!order.length) {
      return toastAlert({
        type: "error",
        message: "Your cart is empty!"
      })
    }

if (!order.length || !fullName.trim() || !email.trim() || !number.trim() || !address.trim() || !city.trim()) {
  return toastAlert({
    type: "error",
    message: "Missing fields!"
  })
}

    try {
      console.log("api tak req gai")
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/orders/`, {
        id: localStorage.getItem("userId"),
        orders: order,
        totalItems,
        totalPrice,
        fullName,
        email,
        phoneNumber: number,
        address,
        city,
        orderNote,
      })

      setFullName("")
setEmail("")
setNumber()
setAddress("")
setCity("")
setOrderNote("")

localStorage.removeItem("items")

navigate("/")
window.location.reload()
toastAlert({
  type: "success",
  message: "Order Placed"
})

    } catch (error) {
console.log(error.message)
    }
  }

  return (
    <div className='checkout'>
      <h2>Checkout</h2>

      <div className="inputContainer">
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input id="fullName" type="text" onChange={(e) => { setFullName(e.target.value) }} value={fullName} placeholder='Enter Your Full Name' autoComplete="off" />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder='Enter Your Email' value={email} autoComplete="off" />
        </div>

        <div>
          <label htmlFor="phone">Phone Number</label>
          <input id="phone" type="text" onChange={(e) => { setNumber(e.target.value) }} placeholder='Enter Your Phone Number 03**-******' value={number} autoComplete="off" />
        </div>

        <div>
          <label htmlFor="address">Address</label>
          <input id="address" type="text" onChange={(e) => { setAddress(e.target.value) }} placeholder='Enter Your Address' value={address} autoComplete="off" />
        </div>

        <div>
          <label htmlFor="city">City</label>
          <input id="city" type="text" onChange={(e) => { setCity(e.target.value) }} placeholder='Enter Your City' value={city} autoComplete="off" />
        </div>

        <div>
          <label htmlFor="notes">Order Notes (Optional)</label>
          <input id="notes" type="text" value={orderNote} onChange={(e) => { setOrderNote(e.target.value) }} placeholder='Any special instructions for delivery? (Optional)' autoComplete="off" />
        </div>

        <div className="paymentMethod">
          <label>Payment Method</label>
          <p>Cash on Delivery (Only)</p>
        </div>

        <button className='confirmOrderBtn' onClick={orderConfirmHandler}>Confirm Order</button>
      </div>

      <div className="note">
        <span style={{ color: "#D63384", fontSize: "17px" }}> ⚠ <strong>Important Note:</strong> </span> Please make sure all the details entered below are accurate. If any information is incorrect or incomplete, your order may be canceled.
      </div>
    </div>
  )
}

export default Checkout
