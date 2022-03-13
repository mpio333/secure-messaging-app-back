import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Message } from '../types/messages';
import ChatMessage from './ChatMessage';
import Navigation from './Navigation';

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const threadId = params.get('id');

  const handleSend = async () => {
    const res = await axios.post(`http://localhost:3001/messages/${threadId}`, { body: message }, { withCredentials: true });
    if (res.status === 200) setMessages(res.data.data?.messages || []);
    setMessage('');
  };

  const getMessages = async () => {
    const res = await axios.get(`http://localhost:3001/messages/${threadId}`, { withCredentials: true });
    if (res.status === 200) setMessages(res.data.data?.messages || []);
  };

  useEffect(() => {
    getMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="flex justify-center items-center pt-10">
        <div className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden mt-10">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Some user</h3>
            </div>
            <div className="border-t border-gray-200 p-4">
              {messages.map(m => (
                <ChatMessage key={m._id} {...m} />
              ))}
            </div>
            <div className="flex bg-gray-300 p-4">
              <input
                className="flex items-center h-10 w-full rounded px-3 text-sm"
                type="text"
                placeholder="Type your message…"
                value={message}
                onChange={e => setMessage(e.target.value)}
              />
              <button
                onClick={() => handleSend()}
                className="flex items-center justify-center ml-3 h-10 px-4 text-white text-sm font-medium rounded bg-gray-500 hover:bg-gray-600"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
