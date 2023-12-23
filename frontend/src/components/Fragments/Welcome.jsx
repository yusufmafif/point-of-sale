import React from 'react'
import { useSelector } from "react-redux";
import Cashier from './Cashier';

export const Welcome = () => {
  const { user } = useSelector((state) => state.auth)
  return (
    <div>
      <h1 className="title">Dashboard</h1>
      <h2 className="subtitle">Welcome Back <strong>{user && user.name}</strong></h2>
      <Cashier />

      
    </div>
  )
}

export default Welcome