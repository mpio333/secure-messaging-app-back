import { useAuthContext } from '../contexts/AuthContext';
import { Message } from '../types/messages';

const ChatMessage = ({ author, body, createdAt }: Message) => {
  const [authContext] = useAuthContext();
  return (
    <div className={`flex w-full mt-2 space-x-3 max-w-xs ${authContext.user?._id === author ? 'ml-auto justify-end' : ''}`}>
      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
      <div>
        <div
          className={`p-3 ${
            authContext.user?._id === author ? 'bg-blue-600 text-white rounded-l-lg rounded-br-lg' : 'bg-gray-300 rounded-r-lg rounded-bl-lg'
          }`}
        >
          <p className="text-sm">{body}</p>
        </div>
        <span className="text-xs text-gray-500 leading-none">{createdAt}</span>
      </div>
    </div>
  );
};

export default ChatMessage;
