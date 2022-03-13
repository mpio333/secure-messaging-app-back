import axios from 'axios';
import { useEffect, useState } from 'react';
import { User } from '../types/user';
import { useNavigate } from 'react-router';

const NewMessageButton = () => {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();
  const handleClick = async (id: string) => {
    const res = await axios.post('http://localhost:3001/messages', { user: id }, { withCredentials: true });
    if (res.status === 200) navigate(`/chat?id=${res.data.data._id}`);
  };

  const getUsers = async () => {
    const res = await axios.get('http://localhost:3001/users', { withCredentials: true });
    if (res.status === 200) setUsers(res.data.data);
  };

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center ml-auto h-10 px-4 text-sm text-white font-medium rounded bg-gray-500 hover:bg-gray-600"
      >
        New Message
      </button>
      <div className={`${!open ? 'invisible' : ''} absolute right-0 flex flex-col w-40 mt-5 bg-white border border-gray-200 shadow-lg`}>
        {users.map(user => (
          <div key={user._id} onClick={() => handleClick(user._id)} className="flex items-center h-8 px-3 text-sm hover:bg-gray-200 cursor-pointer">
            {user.email}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewMessageButton;
