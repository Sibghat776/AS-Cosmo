import React, { useEffect, useState } from 'react'
import './navbar.scss'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [userData, setUserData] = useState({})
  const { pathname } = useLocation()
  const [isToggle, setIsToggle] = useState(false)
  const [toggleOptions, setToggleOptions] = useState(false)
  const navigate = useNavigate()

  const token = localStorage.getItem("token")

  const handleOptionClick = (to) => {
    if (pathname !== to) {
      setIsOpen(false)
    }
  }

  const fetchUser = async ()=> {
    try {
      const userData = await axios.get(`http://localhost:3000/api/v1/auth/getUser/${localStorage.getItem("userId")}`)
      setUserData(userData.data.data)
    } catch (error) {
      
    }
  }

  useEffect(()=> {
    fetchUser()
  }, [])
      
  return (
 <>
    <div className='navbar' style={{
      display: token ? "flex" : "none" ,
    }}>

      <div className='webName'>
        <Link to='/'>
          <h1 onClick={() => setIsOpen(false)}>AS Cosmo</h1>
        </Link>
      </div>

      <div className='navLinks'>
       <Link to='/' onClick={() => setIsOpen(false)}>
  <li className={pathname === '/' ? 'navLinkActive' : ''}>home</li>
</Link>

<Link to='/about' onClick={() => setIsOpen(false)}>
  <li className={pathname === '/about' ? 'navLinkActive' : ''}>about</li>
</Link>

{userData?.isAdmin ? (
  <Link to='/peoples' onClick={() => setIsOpen(false)}>
    <li className={pathname === '/peoples' ? 'navLinkActive' : ''}>peoples</li>
  </Link>
) : (
  <Link to='/peoples' onClick={() => setIsOpen(false)}>
    <li className={pathname === '/peoples' ? 'navLinkActive' : ''}>peoples</li>
  </Link>
)}

<Link to='/contact' onClick={() => setIsOpen(false)}>
  <li className={pathname === '/contact' ? 'navLinkActive' : ''}>contact</li>
</Link>

      </div>
      
       {token ?
  <div className='navIcons' style={{
    display: "flex",
    gap: "25px"
  }}>
      <img src='/img/cartImg.png' height='37px' alt='' className='cart' />
   
<div className="profileWrapper">
   <div className='profile' onClick={() => setIsOpen(!isOpen)}>
      <div className="profilePic" style={{
        width: "30px",
        height: "30px",
        objectFit: "cover",
        overflow: "hidden"
      }}>
        <img
        src= {userData?.profilePicture || "/img/avatar.png" }
        width='30px'
        height='30px'
        style={{
          borderRadius: '50%',
        }}
        alt=''
      />
      </div>
      <span>{userData?.username}</span>
    </div>
</div>

  </div>
: 
<div style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "25px"
}}>
    <div style={{
        color: "#D63384",
        fontSize: "13px",
        cursor: "pointer",
        backgroundColor: "white",
        borderRadius: "30px",
        padding: "7px 18px"
    }} onClick={()=> {navigate("/signup")}}>Join Now</div>
    <div style={{
        color: "white",
        fontSize: "15px",
        cursor: "pointer"
    }} onClick={()=> {navigate("/login")}}>Login</div>
</div>
}

<img src="/img/menuBar.png" height="30px" width="30px" onClick={()=> {setIsToggle(!isToggle)
  setToggleOptions(false)
}} className='menuBar' alt="" />

      <div className={`options ${isOpen ? 'active' : ''}`}>
        {userData?.isAdmin ? (
          <Link to='/addProduct' onClick={() => handleOptionClick('/addProduct')}>
            <li>add product</li>
          </Link>
        ) : (
          <Link to='/orders' onClick={() => handleOptionClick('/orders')}>
            <li>orders</li>
          </Link>
        )}

      <Link to='/profile' onClick={() => handleOptionClick('/profile')}>
          <li>profile</li>
        </Link>

        {userData?.isAdmin ? (
          <Link to='/notifications' onClick={() => handleOptionClick('/notifications')}>
            <li>notifications</li>
          </Link>
        ) : (
          <Link to='/editProfile' onClick={() => handleOptionClick('/history')}>
            <li>Edit Profile</li>
          </Link>
        )}

        <li onClick={() => {
          setIsOpen(false)
          localStorage.removeItem("token")
          localStorage.removeItem("userId")
          navigate("/login")
        }}>logout</li>
      </div>
    </div>

    {
  isToggle && 
<div className="toggleNavbar">
  <div className='toggleNavLinks'>
    <Link to='/' onClick={() => setIsOpen(false)}>
      <li className={pathname === '/' ? 'navLinkActive' : ''}>home</li>
    </Link>

    <Link to='/about' onClick={() => setIsOpen(false)}>
      <li className={pathname === '/about' ? 'navLinkActive' : ''}>about</li>
    </Link>

    {userData?.isAdmin ? (
      <Link to='/peoples' onClick={() => setIsOpen(false)}>
        <li className={pathname === '/peoples' ? 'navLinkActive' : ''}>Peoples</li>
      </Link>
    ) : (
      <Link to='/peoples' onClick={() => setIsOpen(false)}>
        <li className={pathname === '/peoples' ? 'navLinkActive' : ''}>peoples</li>
      </Link>
    )}

    <Link to='/contact' onClick={() => setIsOpen(false)}>
      <li className={pathname === '/contact' ? 'navLinkActive' : ''}>contact</li>
    </Link>
  </div>

  <div className="toggleNavIcons">
    <img src='/img/cartImg.png' height='37px' alt='' className='cart' />

    <div className="profileWrapper">
      <div className='profile' onClick={() => setToggleOptions(!toggleOptions)}>
        <div className="profilePic" style={{
          width: "30px",
          height: "30px",
          objectFit: "cover",
          overflow: "hidden"
        }}>
          <img
            src={userData?.profilePicture || "/img/avatar.png"}
            width='30px'
            height='30px'
            style={{ borderRadius: '50%' }}
            alt=''
          />
        </div>
        <span>{userData?.username}</span>
      </div>

      <div className={`toggleOptions ${toggleOptions ? 'active' : ''}`}>
        {userData?.isAdmin ? (
          <Link to='/addProduct' onClick={() => {handleOptionClick('/addProduct')
            setIsToggle(false)
            setToggleOptions(false)
          }}>
            <li>add product</li>
          </Link>
        ) : (
          <Link to='/orders' onClick={() => {handleOptionClick('/orders')
                        setIsToggle(false)
            setToggleOptions(false)
          }}>
            <li>orders</li>
          </Link>
        )}

        <Link to='/profile' onClick={() => {handleOptionClick('/profile')
                      setIsToggle(false)
            setToggleOptions(false)
        }}>
          <li>profile</li>
        </Link>

        {userData?.isAdmin ? (
          <Link to='/notifications' onClick={() => {handleOptionClick('/notifications')
                                  setIsToggle(false)
            setToggleOptions(false)
          }}>
            <li>notifications</li>
          </Link>
        ) : (
          <Link to='/editProfile' onClick={() => {handleOptionClick('/editProfile')
                                  setIsToggle(false)
            setToggleOptions(false)
          }}>
            <li>Edit Profile</li>
          </Link>
        )}

        <li onClick={() => {
          setIsOpen(false)
          localStorage.removeItem("token")
          localStorage.removeItem("userId")
          navigate("/login")
        }}>logout</li>
      </div>
    </div>
  </div>
</div>
}
 </>
  )
}

export default Navbar
