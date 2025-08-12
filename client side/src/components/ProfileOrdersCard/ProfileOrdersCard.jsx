import React from 'react'
import "./profileOrdersCard.scss"

const ProfileOrdersCard = () => {
  return (
    <div className='profileOrdersCard'>
        <div className="card">
            <img src="/img/lipstick.avif" className='productImg' alt="" />
            <div className="productName">Lipstick</div>
            <div className="price">Rs.899/-</div>
            <div className="desc">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus omnis beatae harum iste impedit.</div>
        </div>
    </div>
  )
}

export default ProfileOrdersCard