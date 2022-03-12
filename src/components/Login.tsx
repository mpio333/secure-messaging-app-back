import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useAuthContext } from '../contexts/AuthContext';

const Login = () => {
  const [authContext, setAuthContext] = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get('token');

  const handleLogin = async () => {
    const res = await axios.get(`http://localhost:3001/login?token=${token}`, { withCredentials: true });
    if (res.status === 200) {
      setAuthContext({ ...authContext, isAuthenticated: true });
      navigate(authContext.redirectPath);
    }
  };

  useEffect(() => {
    handleLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1 className="font-bold text-2xl">Logging in..</h1>
    </div>
  );
};

export default Login;
