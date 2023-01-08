import { Routes, Route } from 'react-router-dom';
// import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import './App.scss';

const App = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<Dashboard />} /> */}
      <Route path="/" element={<Register />} />
    </Routes>
  );
};

export default App;
