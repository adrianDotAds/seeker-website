import React from 'react'
import './LoginSignup.css'

// Component Imports
import APIButtons from '../components/APIButtons'

// Sign Up and Login Assets
import logo from '../assets/logo.png'
import user from '../assets/user.png'
import menu_logo from '../assets/menu.png'

const LoginSignup = () => {
  return (
    <div>
        LoginSignup
        <img src={menu_logo} alt="Menu Logo" />
        <APIButtons />
    </div>
  )
}


export { LoginSignup }