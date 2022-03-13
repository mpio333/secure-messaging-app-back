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
    <div onClick={() => handleClick()} className="bg-gray-100 hover:bg-gray-200 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 cursor-pointer">
      <dt className="text-sm font-medium text-gray-500">
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
      </dt>
      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user}</dd>
    </div>
  );
};

export default Thread;
