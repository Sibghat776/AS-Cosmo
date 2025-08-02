import React, { useEffect, useState } from 'react'
import "./peoples.scss"
import People from '../../components/people/People'
import axios from 'axios'

const Peoples = () => {
  const [users, setUsers] = useState([])

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:3000/api/v1/auth/getUsers")
    setUsers(res.data.data)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className='peoples'>
      {
users.map((user)=> {
return <People user={user} />
})
      }
    </div>
  )
}

export default Peoples