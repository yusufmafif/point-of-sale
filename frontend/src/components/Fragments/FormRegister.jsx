import Button from "../Elements/Button";
import InputForm from "../Elements/Input/index"
import {useRef, useEffect} from "react";

const FormRegister = () => {
    const usernameRef = useRef(null)
    useEffect(() => {
        usernameRef.current.focus()
    }, [])

    
    return (
        <form action="">
            <InputForm label="Fullname" type="text" placeholder="Muhammad" name="Full Name" ref={usernameRef}/>
            <InputForm label="Email" type="email" placeholder="example@mail.com" name="Email" />
            <InputForm label="Password" type="password" placeholder="*******" name="Password" />
            <InputForm label="Confirm Password" type="password" placeholder="*******" name="Confirm Password" />
            <Button children="Register" classname="bg-blue-700 w-full"></Button>
        </form>
    )
}

export default FormRegister;