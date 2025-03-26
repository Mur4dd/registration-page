import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import "./SignUp.css"
import LogIn from "./LogIn"

const BASE_URL = "http://localhost:5000"

function SignUp() {
    const [passValue, setPassValue] = useState("")
    const [reEnterPassValue, setReEnterPassValue] = useState("")
    const [isSecure, setIsSecure] = useState(false)
    const [emailValue, setEmailValue] = useState("")
    const [fullName, setFullName] = useState("")

    const getFullName = (fullName) => {
        setFullName(fullName.target.value)
    }

    const getEmail = (email) => {
        setEmailValue(email.target.value)
    }

    const postUsers = async (newUser) => {
        const response = await axios.post(BASE_URL + "/user", newUser)
    }

    const getAllUsers = async () => {
        const response = await axios.get(BASE_URL + "/user")
        console.log(response.data);
    }

    const setPass = (password) => {
        setPassValue(password.target.value)
        // console.log(password.target.value);
    }

    const setReEnterPass = (password) => {
        setReEnterPassValue(password.target.value)
        // console.log(password.target.value);
    }

    useEffect(() => {
      getAllUsers()
    } , [])

    useEffect(() => {
        securePass(passValue, reEnterPassValue)
    }, [passValue, reEnterPassValue])

    const handleSubmit = () => {
      event.preventDefault()
      const newUser = {
        "fullName" : fullName ,
        "email" : emailValue ,
        "password" : passValue
    }
    postUsers(newUser)
    setFullName("")
    setEmailValue("")
    setPassValue("")
    setReEnterPassValue("")
    }

    const securePass = (password, confirmPassword) => {
        const hasUpperCase = /[A-Z]/.test(password)
        const hasSpecialChar = /[.,!]/.test(password)
        const hasNumber = /\d/.test(password)
        const minLength = password.length >= 8

        if (password.length == 0 || confirmPassword.length == 0) {
            setIsSecure(false)
            console.error("Input is empty");
        } else if (password == confirmPassword) {
            console.log("First pass is equal second pass");
            if (hasUpperCase && hasSpecialChar && hasNumber && minLength) {
                setIsSecure(true)
                console.log("Pass is secure");
            }
        } else {
            setIsSecure(false)
        }
    }

    return (
        <div className="page">
            <div className="mainBox">
                <div className="leftSide"></div>
                <div className="rightSide">
                    <div className="rightSideTitle">
                        <h1>Sign Up</h1>
                        <p>Enter your email and password to sign up our dashboard</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                    <div className="fullNameInput">
                        <h3>Full name</h3>
                        <input
                            type="text"
                            name="fullName"
                            id="fullName"
                            value={fullName}
                            onChange={getFullName}
                        />
                    </div>
                    <div className="mailInput">
                        <h3>Email</h3>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={emailValue}
                            onChange={getEmail}
                        />
                    </div>
                    <div className="passwordInput">
                        <h3>Password</h3>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={passValue}
                            onChange={setPass}
                        />
                        <p
                            style={{ opacity: "50%" }}
                        >Re-enter password</p>
                        <input
                            type="password"
                            name="repeatPass"
                            id="repeatPass"
                            value={reEnterPassValue}
                            onChange={setReEnterPass}
                        />
                        <p style={{ color: isSecure ? "green" : "red" }}>
                            {isSecure ? "✅ Secure Password" : "❌ Password is not secure"}
                        </p>
                    </div>
                    <div className="submitButton">
                        <input type="submit" value="Submit" disabled={!isSecure} />
                    </div>
                    </form>
                    <div className="otherActions">
                        <p>
                            Do you have an account? <Link to="/">Log In</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp
