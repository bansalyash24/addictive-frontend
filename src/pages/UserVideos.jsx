import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { hideLoading, showLoading } from '../lib/alertsSlice';
import { useDispatch } from 'react-redux';

function UserVideos() {
   const [details,setDetails]=useState(null)
   const params= useParams()
   const [firstName,lastName]=params.userName.split('-')
   console.log("🚀 ~ UserVideos ~ firstName,lastName:", firstName,lastName)
   const dispatch=useDispatch()
   const getUserData = async () => {
    try {
      dispatch(showLoading());
      const resp = await axios.post(
        '/api/user/get-user-info',
        {
            firstName,
            lastName
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      if(resp.data?.success){
          setDetails(resp?.data?.data);
      }else{
        setDetails(null)
      }
      dispatch(hideLoading());
    } catch (error) {
      console.error('Failed to fetch user data:', error)
      dispatch(hideLoading());
    }
  };

   useEffect(()=>{
    getUserData()
   },[])
if(!details) return <div>No user exists with this name</div>
  return (
    <div key={details?.user._id} className="mb-8">
          <div className="flex items-center mb-4 justify-between">
            <div className='flex'>
            <img src={details?.user?.profile_Image} alt={`${details?.user?.firstName} ${details?.user?.lastName}`} className="w-16 h-16 rounded-full mr-4" />
            <div>
              <h2 className="lg:text-2xl font-bold text-lg">{details?.user?.firstName} {details?.user?.lastName}</h2>
              <p className="text-gray-600">{details?.user?.email}</p>
            </div>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {details?.user?.videos?.length==0 && <div>No videos available for this details?.user</div>} 
          {details?.videos?.map((video) => (
              <div key={video?._id} className="relative w-40 h-20">
                <img src={video?.thumbnailSrc} alt={video?.title} className="w-40 h-20 object-contain aspect-video" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
  )
}

export default UserVideos