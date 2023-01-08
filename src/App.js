import { Routes, Route } from 'react-router-dom';
// import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import Login from './pages/Login/Login';
import './App.scss';

const App = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<Dashboard />} /> */}
      <Route path="/register" element={<Signup />} />
      <Route path="/" element={<Login />} />
    </Routes>
  );
};

export default App;
