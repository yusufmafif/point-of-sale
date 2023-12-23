import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../../features/authSlice";



export const Navbar = () => {
  const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)

const logout = () => {
    dispatch(LogOut())
    dispatch(reset())
    navigate("/")
}

  return (
    <div><nav className="navbar is-fixed-top has-shadow" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <NavLink to={"/dashboard"} className="navbar-item" href="https://bulma.io">
         <h1 className="title">ADMIN</h1>
        </NavLink>
    
        <a href="!#" role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
    
      <div id="navbarBasicExample" className="navbar-menu">
    
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">

              <button className="button is-light" onClick={logout}>
                Log out
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav></div>
  )
}

export default Navbar