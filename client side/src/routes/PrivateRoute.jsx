import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Modal from '../components/modal/Modal'

const PrivateRoute = () => {
  return (
     !localStorage.getItem("token") ? <Navigate to="/login" /> : <Outlet /> 
  )
}

export default PrivateRoute