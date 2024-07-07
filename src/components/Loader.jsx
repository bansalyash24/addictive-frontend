import { useSelector } from 'react-redux';

const Loader = () => {
  const {loading:isLoading} = useSelector((state) => state.alerts);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
