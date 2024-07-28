import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';

const ShowTheatres = () => {

    const location = useLocation();
    const movie = location.state?.movie;

    const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
        <div className='flex justify-center  min-h-screen'>
            <div className="flex  items-center flex-col w-3/4 min-h-screen bg-red-800">

                <div>
                    {movie.name}
                </div>

                <div>
                    <label htmlFor="date-picker" className="block text-sm font-medium text-gray-700">Select a date:</label>
                    <input
                        type="date"
                        id="date-picker"
                        value={selectedDate}
                        min={ new Date().toISOString().split('T')[0]}
                        onChange={handleDateChange}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    />
                    <p>Selected Date: {selectedDate}</p>
                </div>
            </div>

            <div>

            </div>





        </div>
    
  )
}

export default ShowTheatres