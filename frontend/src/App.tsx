import { Routes, Route } from 'react-router-dom';

import LoginSignupContainer from './components/LoginSignup';
import Dashboard from './components/Dashboard';

function App() {

  return (
    <Routes>
      <Route path="/" element={<LoginSignupContainer />} />,
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;