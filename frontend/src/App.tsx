import { Routes, Route } from 'react-router-dom';

import LoginSignupContainer from './components/LoginSignup';
import Dashboard from './components/Dashboard';
import Tes_button2 from './components/Tes_button';

function App() {

  return (
    <Routes>
      <Route path="/" element={<LoginSignupContainer />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/test-path" element={<Tes_button2 />} />
    </Routes>
  );
}

export default App;