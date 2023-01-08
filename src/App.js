import { Routes, Route } from 'react-router-dom';
// import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import './App.scss';

const App = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<Dashboard />} /> */}
      <Route path="/" element={<Signup />} />
    </Routes>
  );
};

export default App;
