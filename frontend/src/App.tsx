import React from 'react';

import { Routes, Route } from 'react-router-dom';

import LoginSignupContainer from './components/LoginSignup';

function App() {

  return (
    <Routes>
      <Route path="/" element={<LoginSignupContainer />} />
    </Routes>
  );
}

export default App;