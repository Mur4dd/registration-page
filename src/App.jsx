import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LogIn from './Components/LogIn'
import SignUp from './Components/SignUp'

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<LogIn />}/>
        <Route path='/signup' element={<SignUp />}/>
      </Routes>
    </Router>
      {/* <LogIn></LogIn> */}
      {/* <SignUp></SignUp> */}
    </>
  )
}

export default App
