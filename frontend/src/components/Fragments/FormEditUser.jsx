import React, { useRef, useEffect, useState } from 'react'
import InputForm from "../Elements/Input/index"
import Button from "../Elements/Button";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";


const FormEditUser = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confPassword, setConfPassword] = useState("")
  const [role, setRole] = useState("user")
  const [msg, setMsg] = useState("")
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    const getUserById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${id}`)
        setName(response.data.name)
        setEmail(response.data.email)
        setRole(response.data.role)
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg)
        }
      }
    }
    getUserById()
  }, [id])


  const saveUser = async (e) => {
    e.preventDefault()
    try {
      await axios.patch(`http://localhost:5000/users/${id}`, {
        name: name,
        email: email,
        password: password,
        confPassword: confPassword,
        role: role
      })
      navigate('/users')
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg)
      }
    }
  }


  const usernameRef = useRef(null)
  useEffect(() => {
    usernameRef.current.focus()
  }, [])

  return (
    <div>
      <h1 className="title">Users</h1>
      <h2 className="subtitle">Update User</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content"></div>
          <form onSubmit={saveUser}>
            <InputForm label="Fullname" type="text" placeholder="Muhammad" name="Full Name" value={name} onChange={(e) => setName(e.target.value)} ref={usernameRef} />
            <InputForm label="Email" type="email" placeholder="example@mail.com" value={email} onChange={(e) => setEmail(e.target.value)} name="Email" />
            <InputForm label="Password" type="password" placeholder="*******" value={password} onChange={(e) => setPassword(e.target.value)} name="Password" />
            <InputForm label="Confirm Password" type="password" placeholder="*******" value={confPassword} onChange={(e) => setConfPassword(e.target.value)} name="Confirm Password" />
            <div className='field mb-6'>
              <label className='label'>Role</label>
              <div className='control'>
                <div className='select is-fullwidth'>
                  <select>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>
              </div>
            </div>
            <Button children="Update" classname="bg-blue-700 w-full" type="submit"></Button>
          </form>

        </div>
      </div>
    </div>
  )
}

export default FormEditUser
