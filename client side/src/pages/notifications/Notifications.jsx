import React, { useEffect, useState } from 'react'
import Notification from '../../components/notification/Notification'
import "./notifications.scss"
import axios from 'axios'

const Notifications = () => {
const [notifications, setNotifications] = useState([])
const [refresher, setRefresher] = useState(false)

  const fetchNotifications = async ()=> {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/notification/`)
      console.log(res.data.data)
      setNotifications(res.data.data.reverse())
    } catch (error) {
      
    }
  }

  useEffect(()=> {
fetchNotifications()
  }, [refresher])

  return (
    <div className='notifications'>
      <h1>Notifications</h1>
{
notifications?.map((notification, idx)=> {
  const date = notification?.date
 return <Notification notification={notification} setRefresher={setRefresher} refresher={refresher} date={date} key={idx}/>
})
}
    </div>
  )
}

export default Notifications