import React from 'react'
import "./homePageCards.scss"
import { Link } from 'react-router-dom'

const HomePageCards = ({name, img, id}) => {
  return (
<Link to={`/products/${id}`}>
    <div className='homePageCards'>
        <img src={img} alt="" />
        <h1>{name}</h1>
        <div className="blackScreen"></div>
    </div>
</Link>
  )
}

export default HomePageCards