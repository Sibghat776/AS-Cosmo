import React, { useEffect, useState } from 'react'
import "./notification.scss"
import axios from 'axios'

const Notification = ({notification, date, setRefresher, refresher}) => {


const seenNotification = async ()=> {
  try {
        const res = await axios.put(`http://localhost:3000/api/v1/notification/${notification?._id}`)
        console.log(res)
        setRefresher(!refresher)
        console.log("chala")
      } catch (error) {
        
      }
}

const deleteNotification = async ()=> {
  try {
        const res = await axios.delete(`http://localhost:3000/api/v1/notification/${notification?._id}`)
        console.log(res)
        setRefresher(!refresher)
        console.log("chala")
      } catch (error) {
        
      }
}

  return (
    <div className='notification'>

        <div className="user">
            <div>
                <img src={notification?.userPic || "/img/avatar.png"} alt="" />
                <span>{notification?.username}</span>
            </div>
<div className='date'>{date}</div>
        </div>

        <hr />

<div className="subject" style={{textTransform: "capitalize"}}>{notification?.title}</div>

<div className="message">
{notification?.message}
</div>

<div className="toggleDate">{date}</div>

<div className="btns" style={{
  display: "flex",
  width: "100%",
  justifyContent: "flex-end",
  gap: "15px"
}}>
<div className="deleteBtn" onClick={deleteNotification}>Delete</div>
  {notification.isRead ? null : <div className="seenBtn" onClick={seenNotification}>Seen</div>}
</div>
    </div>
  )
}

export default Notification