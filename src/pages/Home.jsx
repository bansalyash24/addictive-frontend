import React from 'react'
import { setUser } from '../lib/userSlice'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

function Home() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  return (
    <div className='flex justify-between p-2'>
      <div className='flex flex-col'>
      <Link to='/update-profile' className='text-blue-500 underline'>Update Your Bio or Upload Videos Now!</Link>
      <Link to='/listing-page' className='text-blue-500 underline'>Listing of all Videos</Link>
      </div>
      <button className='bg-red-500 p-2 rounded-md text-white' onClick={()=>{
        dispatch(setUser(null))
        localStorage.clear('token')
        navigate('/login')
      }}>Logout</button>
    </div>
  )
}

export default Home