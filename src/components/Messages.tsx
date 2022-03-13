import axios from 'axios';
import { useEffect, useState } from 'react';
import { Thread } from '../types/threads';
import Navigation from './Navigation';
import ThreadItem from './Thread';

const Messages = () => {
  const [threads, setThreads] = useState<Thread[]>([]);

  const getMessages = async () => {
    const res = await axios.get('http://localhost:3001/messages', { withCredentials: true });
    if (res.status === 200) setThreads(res.data.data);

    //REMOVE
    setThreads([
      { _id: 'asd', admin: 'me', user: 'user1' },
      { _id: 'asdq', admin: 'me', user: 'user2' },
    ]);
  };

  useEffect(() => {
    getMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Navigation />
      <div className="flex justify-center items-center pt-10">
        <div className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden mt-10">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Messages</h3>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                {threads.map(thread => (
                  <ThreadItem key={thread._id} user={thread.user} id={thread._id} />
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
