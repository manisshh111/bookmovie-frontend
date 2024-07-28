import React from 'react'
import { Link } from 'react-router-dom'

const AdminDashboard = () => {



  return (
<div className='flex justify-center  min-h-screen'>
  <div className="flex  items-center flex-col w-3/4 min-h-screen bg-red-800">
    <label htmlFor="theatreName" className="pt-20 ml-1 mb-2 text-2xl font-medium text-white dark:text-white">
      Admin Dashboard
    </label>
  
    <div className='grid grid-cols-4 gap-4 w-full p-10'>
      
      <Link to="/shows">
      <div className='w-full h-24 bg-red-200 border border-black rounded hover:bg-red-100 cursor-pointer flex justify-center items-center text-lg font-bold text-slate-500 hover:text-black'>
        Shows
      </div>
      </Link>
       
      <Link to="/theatres">
      <div className='w-full h-24 bg-red-200 border border-black rounded hover:bg-red-100 cursor-pointer flex justify-center items-center text-lg font-bold text-slate-500 hover:text-black'>
       Theatres
      </div>
      </Link>

      <Link to="/movies">
      <div className='w-full h-24 bg-red-200 border border-black rounded hover:bg-red-100 cursor-pointer flex justify-center items-center text-lg font-bold text-slate-500 hover:text-black'>
        Movies
      </div>
      </Link>

      <Link to="/cities">
      <div className='w-full h-24 bg-red-200 border border-black rounded hover:bg-red-100 cursor-pointer flex justify-center items-center text-lg font-bold text-slate-500 hover:text-black'>
        Cities
      </div>
      </Link>


      <Link to="/categories">
      <div className='w-full h-24 bg-red-200 border border-black rounded hover:bg-red-100 cursor-pointer flex justify-center items-center text-lg font-bold text-slate-500 hover:text-black'>
       Categories
      </div>
      </Link>
      

      


    </div>
  </div>
</div>
  )
}

export default AdminDashboard