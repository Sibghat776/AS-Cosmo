import React from 'react'
import "./people.scss"

const People = ({user}) => {
  console.log(user)
  return (
<div className="people">
  <div className="container">
    <img src={user?.profilePicture || "/img/avatar.png"} alt="user" />
    <div className="userName">{user?.username}</div>
    <div className="desc">{user?.desc || <p style={{textDecoration: "line-through"}}>No Description Provided</p> }</div>
    <div className="stats">
      <div className="item">{user?.gender || <p style={{textDecoration: "line-through"}}>Missing</p> }</div>
      <div className="item">{user?.location || <p style={{textDecoration: "line-through"}}>Missing</p> }</div>
      <div className="item">{user?.date}</div>
    </div>
  </div>
</div>
  )
}

export default People