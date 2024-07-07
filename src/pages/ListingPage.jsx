import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ListingPage = () => {
  const [users, setUsers] = useState([]);
  const navigate=useNavigate()
  const fetchUsersWithVideos = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/user/all-users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setUsers(response.data.data);
    } catch (error) {
      console.error('Failed to fetch users with videos:', error);
    }
  };

  useEffect(() => {
    fetchUsersWithVideos();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {users?.map((user) => (
        <div key={user._id} className="mb-8">
          <div className="flex items-center mb-4 justify-between">
            <div className='flex'>
            <img src={user.profile_Image} alt={`${user.firstName} ${user.lastName}`} className="w-16 h-16 rounded-full mr-4" />
            <div>
              <h2 className="lg:text-2xl font-bold text-lg">{user.firstName} {user.lastName}</h2>
              <p className="text-gray-600">{user.email}</p>
            </div>
            </div>
            <button className='bg-blue-500 text-white p-2 rounded-md' onClick={()=>navigate(`/${user?.firstName}-${user?.lastName}`)}>Show More</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {user?.videos?.length==0 && <div>No videos available for this user</div>} 
          {user?.videos?.map((video) => (
              <div key={video._id} className="relative w-40 h-20">
                <img src={video.thumbnailSrc} alt={video?.title} className="w-40 h-20 object-contain aspect-video" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListingPage