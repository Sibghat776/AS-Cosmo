import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import OrderCard from '../../components/orderCard/OrderCard';

const Order = () => {
const location = useLocation();
const [singleUserOrder, setSingleUserOrder] = useState()
const order = location.state || {}

useEffect(()=> {
setSingleUserOrder(order?.order?.orders)
// console.log(order?.order?.orders)
}, [])


  return (
    <div className='order'>
      {
        singleUserOrder?.map((singleOrder, idx)=> {
return <OrderCard order={singleOrder} key={idx}/>
        })
      }
    </div>
  )
}

export default Order