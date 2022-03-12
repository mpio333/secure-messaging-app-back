import { Routes, Route } from 'react-router';
import { useAuthContext } from './contexts/AuthContext';
import Register from './components/Register';
import ProtectedRoute, { ProtectedRouteProps } from './components/ProtectedRoute';
import Login from './components/Login';
import Messages from './components/Messages';
import { useEffect } from 'react';
import axios from 'axios';
import Navigation from './components/Navigation';

const App = () => {
  const [authContext, setAuthContext] = useAuthContext();

  const setRedirectPath = (path: string) => {
    setAuthContext({ ...authContext, redirectPath: path });
  };

  if (!authContext.redirectPath) {
    setRedirectPath('messages');
  }

  const defaultProtectedRouteProps: Omit<ProtectedRouteProps, 'outlet'> = {
    isAuthenticated: authContext.isAuthenticated,
    authenticationPath: 'register',
  };

  const validateCookie = async () => {
    const res = await axios.get('http://localhost:3001/session', { withCredentials: true });
    if (res.status === 200) {
      setAuthContext({ ...authContext, isAuthenticated: true });
    }
  };

  useEffect(() => {
    validateCookie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Routes>
      <Route index element={<Navigation />} />
      <Route path="messages" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<Messages />} />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Routes>
  );
};

export default App;
