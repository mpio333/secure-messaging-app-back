import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types/User';
import { AuthContext } from '../utils/authContext';

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const [user, setUser] = useState<User>(null!);

  const onLogin = async (token: string) => {
    const res = await axios.get(`http://localhost:3001/login?token=${token}`, { withCredentials: true });
    if (res.status === 200) {
      setUser(res.data.data);
      navigate('/messages');
    }
  };

  const validateCookie = async () => {
    const res = await axios.get('http://localhost:3001/session', { withCredentials: true });
    if (res.status === 200) {
      setUser(res.data.data);
      navigate('/messages');
    }
  };

  const value = {
    user,
    onLogin,
    validateCookie,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
