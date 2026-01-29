import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import Components
import LoginSignupContainer from './components/LoginSignup'
import Dashboard from './components/Dashboard'
import TestComponent from './components/test'


function App() {
  return (
    <>
      <LoginSignupContainer />
      {/* <TestComponent /> */}
    </>
  )
}

export default App