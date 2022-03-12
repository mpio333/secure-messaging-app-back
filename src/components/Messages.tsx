import axios from 'axios';
import { useEffect, useState } from 'react';
import { User } from '../types/user';

const Messages = () => {
  const [users, setUsers] = useState<User[]>([]);

  const getUsers = async () => {
    const res = await axios.get('http://localhost:3001/users', { withCredentials: true });
    if (res.status === 200) setUsers(res.data.data);
  };

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {users.map(u => (
        <span>{u.email}</span>
      ))}
    </div>
  );
};

export default Messages;
