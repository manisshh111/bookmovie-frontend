import React from 'react'

const NavBar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-red-600 font-bold text-lg">BookMovie by Manish</div>
        <div className="flex space-x-8">
          <a href="#" className="text-gray-800 hover:text-gray-600">Book</a>
          <a href="#" className="text-gray-800 hover:text-gray-600">Admin Dashboard</a>
        </div>
      </div>
    </nav>

  )
}

export default NavBar