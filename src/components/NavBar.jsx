import React from 'react'
import { useNavigate } from 'react-router-dom'





const NavBar = () => {

  const navigate = useNavigate();

  const handleAdminClick=()=>{
  navigate('/admin')
  }
  
  const handleBookClick=()=>{
  navigate('/')
  }
  return (
    <nav className="bg-[#003C43] shadow-md">
  <div className="container mx-auto px-4 py-1 flex justify-between items-center">
   <div className='sm:w-1/2 lg:w-1/6'><img src='/bookmovie_logo.png'  className='w-full h-full object-fill' /></div>
    <div className="flex space-x-1 items-center">
      <div className="bg-red-700 border border-gray-300 rounded-lg hover:bg-red-600 h-1/2">
        <a href="#" onClick={handleBookClick} className="text-white hover:text-gray-600 px-4 py-2 block">Book</a>
      </div>
      <div className="bg-red-700 border border-gray-300 rounded-lg hover:bg-red-600 h-1/2">
        <a href="#" onClick={handleAdminClick} className="text-white hover:text-gray-600 px-4 py-2 block">Admin</a>
      </div>
    </div>
  </div>
</nav>


  )
}

export default NavBar