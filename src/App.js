import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from './redux/currentUserSlice';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ChatFeed from './layouts/ChatFeed';
import './App.scss';

const App = () => {
  const { isLoggedIn } = useSelector(state => state.currentUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      dispatch(getCurrentUser(user));

      if (user) navigate('/');
    });

    return () => {
      unsubscribe();
    };

    // Do NOT add 'navigate' to dependencies array
    // Adding 'navigate' leads to '/' every time url changes when logged in
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
      >
        <Route path="/:id" element={<ChatFeed />} />
      </Route>
      <Route path="/register" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
