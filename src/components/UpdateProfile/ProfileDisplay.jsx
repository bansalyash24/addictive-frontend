import axios from "axios";
import { useState } from "react";
import { hideLoading, showLoading } from "../../lib/alertsSlice";
import { useDispatch } from "react-redux";

function ProfileDisplay({ userDetails,getUserData }) {
  const [profile_image, setProfileImage] = useState(userDetails?.profile_Image?userDetails.profile_Image:null)
  const dispatch=useDispatch()
  const setFiletoBase=(file)=>{
    const reader=new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend=()=>{
      setProfileImage(reader.result)
    }
}
  const handleImageUpload = async () => {
    if(!profile_image){
      alert('Please select image to upload')
      return
    }
    try {
      dispatch(showLoading())
      const uploadResponse = await axios.post('/api/user/upload-image', {
        image: profile_image
      },
       { headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem('token')
        }
      })
      if(uploadResponse.data.success){
        getUserData()
      }else{

      }
      dispatch(hideLoading())
    } catch (err) {
      dispatch(hideLoading())

      // console.log("🚀 ~ handleImageUpload ~ err:", err.message)
    }
  }
  return (
    <div className="p-4 bg-white shadow-md rounded">
      {
        userDetails?.profile_Image ?
          <img src={userDetails?.profile_Image} alt={'profile'} className="w-10 h-10 object-contain" />
          : <>
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              className=""
              onChange={(e)=>setFiletoBase(e.target.files[0])}
            />
            <button className="bg-blue-500 p-2 text-white rounded-md m-2" onClick={handleImageUpload}>Upload Profile </button>
          </>
      }
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      <p><strong>First Name:</strong> {userDetails?.firstName}</p>
      <p><strong>Last Name:</strong> {userDetails?.lastName}</p>
      <p><strong>Email:</strong> {userDetails?.email}</p>
      <p><strong>Mobile Number:</strong> {userDetails?.mobileNumber}</p>
      <p><strong>Bio:</strong> {userDetails?.bio}</p>
    </div>
  );
}

export default ProfileDisplay;
