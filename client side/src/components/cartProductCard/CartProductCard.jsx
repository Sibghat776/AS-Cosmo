import React, { useContext, useState } from 'react'
import "./cartProductCard.scss"
import { CartContext } from '../../../context/CartContext'

const CartProductCard = ({item, idx}) => {

  const [loadingIdx, setLoadingIdx] = useState(null)
  const {items, setItems} = useContext(CartContext)

const deleteHandler = (id)=> {
  setLoadingIdx(id)
const itemsCopy = [...items]
const filteredItems = itemsCopy.filter((_, i)=> i !== idx)
console.log(filteredItems)
localStorage.setItem("items", JSON.stringify(filteredItems))
window.location.reload()
}

return (
    <div className='cartProductCard'>
      {loadingIdx === idx ? (
        <div style={{
          width: "100%",
          display: "flex",
          justifyContent: "center"
        }}>
          <div className='loading' style={{
          height: "25px",
          width: "25px",
          borderRadius: "50%",
          border: "3px solid white",
          borderBottom: "3px solid #D63384",
          borderRight: "3px solid #D63384",
        }}></div>
        </div>
      ) : (
        <>
          <img src={item?.img} alt="product" className='productImg' />
          <div className="details">
            <div className="productName">{item?.name}</div>
            <div className="price">Rs.{item?.price}/-</div>
            <div className="quantity">Quantity: <span>{item?.quantity}</span></div>
            <div className="desc">{item?.description}</div>
            <button className="toggleDeleteBtn" onClick={() => deleteHandler(idx)}>Remove</button>
          </div>
          <button className="deleteBtn" onClick={() => deleteHandler(idx)}>✕</button>
        </>
      )}
    </div>
  )
}

export default CartProductCard
