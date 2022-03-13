import { useNavigate } from 'react-router';

type Props = {
  user: string;
  id: string;
};

const Thread = ({ user, id }: Props) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/chat?id=${id}`);
  };
  return (
    <div onClick={() => handleClick()} className="flex items-center bg-gray-100 hover:bg-gray-200 border-t border-gray-200 px-4 py-5 cursor-pointer">
      <dt className="text-sm font-medium text-gray-500">
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
      </dt>
      <dd className="ml-4 text-sm">{user}</dd>
    </div>
  );
};

export default Thread;
