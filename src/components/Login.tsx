import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../utils/authContext';

const Login = () => {
  const { onLogin } = useAuth();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get('token');

  useEffect(() => {
    if (token) onLogin(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1 className="font-bold text-2xl">Logging in..</h1>
    </div>
  );
};

export default Login;
