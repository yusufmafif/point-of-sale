import { Provider } from "react-redux"
import AuthLayout from "../Elements/Layouts/AuthLayouts"
import FormLogin from "../Fragments/FormLogin"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { getMe } from "../../features/authSlice"
import React, { useEffect } from 'react'

const LoginPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isError, user, isSuccess } = useSelector((state) => state.auth)
  
    useEffect(() => {
      dispatch(getMe())
    }, [dispatch])
  
    useEffect(() => {
      if (isSuccess || user) {
        navigate("/items")
      }
    }, [isError, navigate])


    return (
            <AuthLayout title="Login" type="login">
                <FormLogin />
            </AuthLayout>

    )

}

export default LoginPage