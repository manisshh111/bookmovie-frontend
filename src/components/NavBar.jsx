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
    <nav className="bg-white shadow-md">
  <div className="container mx-auto px-4 py-4 flex justify-between items-center">
    <div className="text-red-600 font-bold text-lg hover:text-black">BookMovie by Manish</div>
    <div className="flex space-x-8">
      <div className="bg-red-700 border border-gray-300 rounded-lg hover:bg-red-600">
        <a href="#" onClick={handleBookClick} className="text-white hover:text-gray-600 px-4 py-2 block">Book</a>
      </div>
      <div className="bg-red-700 border border-gray-300 rounded-lg hover:bg-red-600">
        <a href="#" onClick={handleAdminClick} className="text-white hover:text-gray-600 px-4 py-2 block">Admin Dashboard</a>
      </div>
    </div>
  </div>
</nav>


  )
}

export default NavBar