import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../lib/alertsSlice';

function VideoModal({ isVisible, onClose, getUserData }) {
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'video/mp4') {
      setVideoFile(file);
      setError('');
    } else {
      setVideoFile(null);
      setError('Please select a valid MP4 video file.');
    }
  };

  const uploadVideo = async (formData) => {
    try {
      dispatch(showLoading());
      const token = localStorage.getItem('token');
      const uploadVideoResponse = await axios.post(
        '/api/video/upload-video',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + token,
          }
        }
      );
      if(uploadVideoResponse.data.success){
        getUserData()
      }else{
        throw new Error('Something went wrong at backend')
      }
      dispatch(hideLoading());
      onClose();
    } catch (error) {
      dispatch(hideLoading());
      console.error('Failed to upload video:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!videoFile || videoFile.type !== "video/mp4") {
      alert('Video Type should be mp4 only');
      return;
    }

    const fileSize = videoFile.size; // size in bytes
    const fileSizeMB = (fileSize / (1024 * 1024)).toFixed(2);
    if (fileSizeMB > 6) {
      alert('Video size should be less than 6 MB');
      return;
    }

    const formData = new FormData();
    formData.append('title', videoTitle);
    formData.append('description', videoDescription);
    formData.append('video', videoFile);
    await uploadVideo(formData);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <button
          className="text-right text-red-500"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">Upload Video</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">Video Title:</label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 mb-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={videoTitle}
            onChange={(e) => setVideoTitle(e.target.value)}
            required
          />

          <label className="block mb-2">Video Description:</label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 mb-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={videoDescription}
            onChange={(e) => setVideoDescription(e.target.value)}
            required
          />

          <label className="block mb-2">Upload Video:</label>
          <input
            type="file"
            accept="video/mp4"
            className="shadow appearance-none border rounded w-full py-2 px-3 mb-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleFileChange}
            required
          />
          {error && <p className="text-red-500">{error}</p>}

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Upload Video
          </button>
        </form>
      </div>
    </div>
  );
}

export default VideoModal;
