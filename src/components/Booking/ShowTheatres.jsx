import React, { useEffect, useState } from 'react';
import { json, useLocation, useNavigate } from 'react-router-dom';
import { getData } from '../../api-integration/api';
import filterShowsByDate from '../FilterTheatres';

const initialShowTheatreFormData = {
  movieName: '',
  cityName: '',
  theatres: [
    {
      theatreName: '',
      shows: [
        {
          showId: '',
          startTime: ''
        }
      ]
    }
  ]
};

const ShowTheatres = () => {
  // Get today's date in YYYY-MM-DD format
  //const today = new Date().toISOString().split('T')[0];
  const today = new Date('2024-08-10').toISOString().split('T')[0];

  const [showTheatreFormData, setShowTheatreFormData] = useState(initialShowTheatreFormData);
  const [selectedDate, setSelectedDate] = useState(today); 
  const[filteredDataByDate, setFilteredDataByDate] = useState({});
  const location = useLocation();
  const showMovieCardFormData = location.state?.showMovieCardFormData;

  const fetchTheatresByCityIdAndMovieId = async () => {
    try {
      const result = await getData('show/shows/' + showMovieCardFormData.cityId + '/' + showMovieCardFormData.movieId);
      setShowTheatreFormData(result);
      console.log("Theatres By CityId and movieId");
      console.log(JSON.stringify(result));
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    fetchTheatresByCityIdAndMovieId();
    const res= filterShowsByDate( showTheatreFormData,selectedDate);
    setFilteredDataByDate(res);
    console.log("Filtered Data"+JSON.stringify(res));
    console.log("Filtered Data State"+JSON.stringify(filteredDataByDate));
  }, []);

  useEffect(() => {
    
    const res= filterShowsByDate( showTheatreFormData,selectedDate);
    setFilteredDataByDate(res);
    console.log("Filtered Data"+JSON.stringify(res))
    console.log("Filtered Data State"+JSON.stringify(filteredDataByDate));
  }, [selectedDate, showTheatreFormData]);


  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  // Filter shows based on the selected date
  const filteredShows = showTheatreFormData.theatres.flatMap(theatre =>
    theatre.shows.filter(show => {
      const showDate = show.startTime.split('T')[0];
      return showDate === selectedDate;
    })
  );

  const navigate = useNavigate();
  const handleShowClick=(show)=>{
    navigate(`/home/movie/book/${show.showId}`, { state: {show} });
  }

  return (
    <div className='flex justify-center min-h-screen'>
      <div className="flex items-center flex-col w-3/4 min-h-screen bg-red-800">
        <div className='bg-black text-white font-bold text-3xl w-full text-center'>
          {showTheatreFormData.movieName}
        </div>

        <div className='bg-black w-full flex flex-col items-center justify-center py-4'>
          <label htmlFor="date-picker" className="block text-xl font-2xl text-white">Select a date:</label>
          <input
            type="date"
            id="date-picker"
            value={selectedDate}
            min={today}
            onChange={handleDateChange}
            className="mt-1 block w-1/4 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md hover:bg-neutral-200"
          />
          <p>Selected Date: {selectedDate}</p>
        </div>


        <div className="mt-4 w-3/4">
          {filteredDataByDate.theatres && filteredDataByDate.theatres.length > 0 ? (
            filteredDataByDate.theatres.map((theatre, index) => (
              <div key={index} className="flex flex-row items-center gap-4 p-4 border-b border-gray-300 mb-4 bg-white rounded-md">
                <h3 className="text-lg font-semibold">{theatre.theatreName}</h3>
                {theatre.shows.length > 0 ? (
                  theatre.shows.map((show) => (
                    <div
                      className="mt-2 p-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-500"
                      onClick={() => handleShowClick(show)}
                    >
                      <p>{new Date(show.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                  ))
                ) : (
                  <p>No shows available for this theatre on the selected date.</p>
                )}
              </div>
            ))
          ) : (
            <p>No shows available for the selected date.</p>
          )}
        </div>
       
      </div>
    </div>
  );
};

export default ShowTheatres;
