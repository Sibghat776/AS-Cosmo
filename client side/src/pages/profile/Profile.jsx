import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "./profile.scss"
import axios from 'axios'

const Profile = () => {

    const [userData, setUserData] = useState({})

 const fetchUser = async ()=> {
    try {
      const userData = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/auth/getUser/${localStorage.getItem("userId")}`)
      setUserData(userData.data.data)
    //   console.log(userData.data.data)
    } catch (error) {
      
    }
  }

  useEffect(()=> {
fetchUser()
  }, [])

  return (
    <div className='profileContainer'>
<div className="left">

<div className="firstName">
  <div>FirstName</div>
  <div>{userData?.firstName || <p>No firstName provided</p>}</div>
</div>

<div className="lastName">
  <div>LastName</div>
  <div>{userData?.lastName || <p>No firstName provided</p>}</div>
</div>

    <div className="userName">
        <div>UserName</div>
        <div>{userData?.username}</div>
    </div>
    <div className='email'>
        <div>Email</div>
        <div>{userData?.email}</div>
    </div>

<div className="phoneNumber">
  <div>PhoneNumber</div>
  <div>{userData?.mobileNumber || <p>No Phone Number provided</p>}</div>
</div>

<div className="gender">
  <div>Gender</div>
  <div style={{textTransform: "capitalize"}}>{userData?.gender || <p>No Gender provided</p>}</div>
</div>

<div className="location">
  <div>Location</div>
  <div>{userData?.location || <p>No Location provided</p>}</div>
</div>


    <div className="desc">
        <div>Description</div>
        <div>{userData?.desc || <p>No description provided</p> }</div>
    </div>



    {/* <div className="totalOrders">
<div>Total Orders</div>
<span>22</span>
    </div> */}

{/* <div className="cardContainer">
    <ProfileOrdersCard />
    <ProfileOrdersCard />
    <ProfileOrdersCard />
    <ProfileOrdersCard />
    <ProfileOrdersCard />
    <ProfileOrdersCard />
</div> */}

</div>

<div className="right">
    <h2>{userData?.username}</h2>
    <img src={userData.profilePicture || "/img/avatar.png"} alt="" />
   <Link to="/editProfile"><div className="editBtn">Edit Profile</div></Link>
</div>
    </div>
  )
}

export default Profile