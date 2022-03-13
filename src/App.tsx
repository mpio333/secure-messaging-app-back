import { Routes, Route, useNavigate } from 'react-router';
import { useAuthContext } from './contexts/AuthContext';
import Register from './components/Register';
import ProtectedRoute, { ProtectedRouteProps } from './components/ProtectedRoute';
import Login from './components/Login';
import Messages from './components/Messages';
import { useEffect } from 'react';
import axios from 'axios';
import Navigation from './components/Navigation';
import Chat from './components/Chat';

const App = () => {
  const [authContext, setAuthContext] = useAuthContext();
  const navigate = useNavigate();

  const defaultProtectedRouteProps: Omit<ProtectedRouteProps, 'outlet'> = {
    isAuthenticated: authContext.isAuthenticated,
    authenticationPath: '/register',
  };

  const validateCookie = async () => {
    const res = await axios.get('http://localhost:3001/session', { withCredentials: true });
    if (res.status === 200) {
      setAuthContext({ ...authContext, isAuthenticated: true, user: res.data.data });
      navigate('/messages');
    }
  };

  useEffect(() => {
    validateCookie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Routes>
      <Route index element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<Navigation />} />} />
      <Route path="messages" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<Messages />} />} />
      <Route path="chat" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<Chat />} />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="*" element={<Register />} />
    </Routes>
  );
};

export default App;
