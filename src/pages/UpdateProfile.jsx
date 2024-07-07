import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { hideLoading, showLoading } from '../lib/alertsSlice';
import ProfileDisplay from '../components/UpdateProfile/ProfileDisplay';
import BioModal from '../components/UpdateProfile/BioModal';
import VideoModal from '../components/UpdateProfile/VideoModal';
import VideoList from '../components/UpdateProfile/VideoList';
// import VideoList from './VideoList';
// import Modal from '../components/Modal';

function ProfilePage() {
  const [userDetails, setUserDetails] = useState({});
  const [videos, setVideos] = useState([]);
  const [isBioModalVisible, setBioModalVisible] = useState(false);
  const [isVideoModalVisible, setVideoModalVisible] = useState(false);
  const dispatch = useDispatch();

  const getUserData = async () => {
    try {
      dispatch(showLoading());
      const token = localStorage.getItem('token');
      const resp = await axios.post(
        '/api/user/get-user-info-by-id',
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          }
        }
      );
      setUserDetails(resp?.data?.data?.user);
      setVideos(resp?.data?.data?.videos)
      dispatch(hideLoading());
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      dispatch(hideLoading());
    }
  };

  const updateBio = async (bio) => {
    try {
      dispatch(showLoading());
      const token = localStorage.getItem('token');
      const resp = await axios.post(
        '/api/user/update-bio',
        { bio },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          }
        }
      );
      setUserDetails({ ...userDetails, bio: resp?.data?.data?.bio });
      dispatch(hideLoading());
    } catch (error) {
      console.error('Failed to update bio:', error);
      dispatch(hideLoading());
    }
  };

 

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <ProfileDisplay userDetails={userDetails} getUserData={getUserData}/>
      <div className="mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
          onClick={() => setBioModalVisible(true)}
        >
          Add Bio
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => setVideoModalVisible(true)}
        >
          Upload Video
        </button>
      </div>
      <BioModal
        userDetails={userDetails}
        isVisible={isBioModalVisible}
        onClose={() => setBioModalVisible(false)}
        onSave={updateBio}
      />
      <VideoModal
        isVisible={isVideoModalVisible}
        onClose={() => setVideoModalVisible(false)}
        getUserData={getUserData}
      />
      <VideoList videos={videos} />
    </div>
  );
}

export default ProfilePage;
