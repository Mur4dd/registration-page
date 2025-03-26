import React, { useState, useEffect } from "react"
import axios from "axios"
import { data, Link } from "react-router-dom"
import "./LogIn.css"
import SignUp from "./SignUp"

const BASE_URL = "http://localhost:5000"

function LogIn() {

    const [emailValue, setEmailValue] = useState("")
    const [passValue, setPassValue] = useState("")
    const [logInSuccess, setLogInSuccess] = useState(null)

    const getEmail = (email) => {
        setEmailValue(email.target.value)
    }

    const getPass = (password) => {
        setPassValue(password.target.value)
    }

    const getAllUsers = async () => {
        try {
            const response = await axios.get(BASE_URL + "/user")
            const users = response.data
            const userExist = users.find(user => user.email == emailValue && user.password == passValue)
            setLogInSuccess(userExist ? true : false)
        } catch (error) {
            console.error("This user not defined" , error);
            setLogInSuccess(false)
        }
    }

    const handleSubmit = () => {
        event.preventDefault()
        getAllUsers()
    }


    return (
        <>
            {logInSuccess !== null && (
                <div className="alert alert-success" role="alert"
                    style={{
                        backgroundColor: logInSuccess ? "green" : "red",
                        color: "white",
                        display: emailValue.length === 0 || passValue.length === 0 ? "none" : "block"
                    }}
                >
                    {logInSuccess ? "✅ Log In successfull" : "❌ Log In unsuccessfull"}
                </div>
            )}
            <div className="page">
                <div className="mainBox">
                    <div className="leftSide"></div>
                    <div className="rightSide">
                        <div className="rightSideTitle">
                            <h1>Log In</h1>
                            <p>Enter your email and password to login our dashboard</p>
                        </div>
                        <form onSubmit={handleSubmit}>
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
                                    onChange={getPass}
                                />
                            </div>
                            <div className="submitButton">
                                <input type="submit" value="Submit" disabled={!emailValue || !passValue}/>
                            </div>
                        </form>
                        <div className="otherActions">
                            <p>
                                Don't have an account? <Link to="/signup">Sign Up</Link>
                            </p>
                            <a href="#">Forgot password?</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LogIn
