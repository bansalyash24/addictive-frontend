import axios from 'axios';
import React from 'react';
import {Link, useNavigate} from 'react-router-dom'
function Login() {
  const navigate=useNavigate()
  const handleSubmit=async(e)=>{
    e.preventDefault()
    const formData = new FormData(e.target);

    const firstName = formData.get('fName');
    const password = formData.get('password');

      const resp=await axios.post('/api/user/login',{
        firstName,password
      })
      localStorage.setItem('token',resp?.data?.data)
      navigate('/')
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded px-8 py-8 pt-8">
        <p className='text-center text-lg text-bold bg-green-500 text-white '>Password Sent to your Registered Email.</p>
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input 
              type="password" 
              name="password" 
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              required
            />
          </div>
          
          <div className="flex items-center justify-between">
            <button 
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
          </div>
          <Link to={'/register'}>Not Registered! Register Here</Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
