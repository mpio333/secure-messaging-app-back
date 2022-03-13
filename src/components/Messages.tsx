import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import { Thread } from '../types/threads';
import Navigation from './Navigation';
import NewMessageButton from './NewMessageButton';
import ThreadItem from './Thread';

const Messages = () => {
  const [authContext] = useAuthContext();
  const [threads, setThreads] = useState<Thread[]>([]);

  const getMessages = async () => {
    const res = await axios.get('http://localhost:3001/messages', { withCredentials: true });
    if (res.status === 200) setThreads(res.data.data);
  };

  useEffect(() => {
    getMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Navigation />
      <div className="flex flox-col justify-center items-center pt-10">
        <div className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg mt-10">
          <div className="bg-white shadow">
            <div className="flex items-center justify-between px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Messages</h3>
              {authContext.user?.roles.includes('admin') ? <NewMessageButton /> : null}
            </div>
            <div className="border-t border-gray-200">
              <dl>
                {threads.map(thread => (
                  <ThreadItem key={thread._id} user={authContext.user?.roles.includes('admin') ? thread.user : thread.admin} id={thread._id} />
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
