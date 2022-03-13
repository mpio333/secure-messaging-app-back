import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useAuthContext } from '../contexts/AuthContext';

const Navigation = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [authContext, setAuthContext] = useAuthContext();
  const navigate = useNavigate();

  const signOut = async () => {
    const res = await axios.get('http://localhost:3001/sign-out', { withCredentials: true });
    if (res.status === 200) {
      setAuthContext({ isAuthenticated: false });
      navigate('/register');
    }
  };

  return (
    <div className="flex items-center flex-shrink-0 h-16 px-8 border-b border-gray-300 bg-gray-100">
      <h1 className="text-lg font-medium mr-10">CW</h1>
      <button className="flex items-center justify-center h-10 px-4 text-sm font-medium rounded hover:bg-gray-300">
        <NavLink to="/messages">Messages</NavLink>
      </button>
      <button onClick={() => signOut()} className="flex items-center justify-center ml-auto h-10 px-4 text-sm font-medium rounded hover:bg-gray-300">
        Sign Out
      </button>
    </div>
  );
};

export default Navigation;
