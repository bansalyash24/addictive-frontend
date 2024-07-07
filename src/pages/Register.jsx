import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { hideLoading, showLoading } from '../lib/alertsSlice';
import { useDispatch } from 'react-redux';

function Register() {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const handleSubmit=async(e)=>{
    try{

        e.preventDefault()
        dispatch(showLoading())
        const formData = new FormData(e.target);

      const firstName = formData.get('fName');
      const lastName = formData.get('lName');
      const email = formData.get('email');
      const mobileNumber = formData.get('mobileNumber');

      const regexMobileNumber = /^[0-9]{10}$/;
      if(regexMobileNumber){
        const resp=await axios.post('/api/user/register',{
          firstName,lastName,email,mobileNumber,password:"123"
        })
        if(resp.data?.success){
          navigate('/login')
          dispatch(hideLoading())
        }else{
          dispatch(hideLoading())
          alert(resp?.data?.message+" with firstName or Email")
        }
      }
    }
    catch(err){
      dispatch(hideLoading())
      console.log(err.message)
      alert(err.message)
    }
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded px-8 py-8 pt-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fName">
              First Name
            </label>
            <input 
              type="text" 
              name="fName" 
              id="fName"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lName">
              Last Name
            </label>
            <input 
              type="text" 
              name="lName" 
              id="lName"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input 
              type="email" 
              name="email" 
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobileNumber">
              Mobile Number
            </label>
            <input 
              type="number" 
              name="mobileNumber" 
              id="mobileNumber"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button 
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Register
            </button>
          </div>
          <Link to={'/login'}>Already Registered! Login Here</Link>

        </form>
      </div>
    </div>
  );
}

export default Register;
