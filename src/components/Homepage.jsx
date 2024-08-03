import React, { useEffect, useState } from 'react'
import { getData } from '../api-integration/api';
import ShowMovieCard from './ShowMovieCard';



const Homepage = () => {

  const [movies, setMovies] = useState([]);


  // Handling Cities dropdown------------------------------------------


  const [selectedCityOption, setSelectedCityOption] = useState(0);
  const [citiesOptions, setCitiesOptions] = useState([]);


  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const result = await getData('city/cities');
      setCitiesOptions(result);
      console.log("city")
      console.log(JSON.stringify(result));
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  // Handle change event for select
  const handleCityOptionsChange = (event) => {
    setSelectedCityOption(event.target.value);
    console.log("Selected City"+event.target.value)
    
  };


  //Get all movies by cityId
  const fetchMovies = async () => {
    try {
      const result = await getData('show/shows/' + selectedCityOption);
      setMovies(result);
      console.log("movies")
      console.log(JSON.stringify(result));
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [selectedCityOption]);



  return (

    <div className='flex justify-center  min-h-screen'>
      <div className="flex  items-center flex-col w-3/4 min-h-screen bg-red-800">
        <div className='w-40'>

          <select
            id="cityId"
            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={selectedCityOption}
            onChange={handleCityOptionsChange}
            name="cityId"
            required
          >
            <option value="">Select City</option>
            {citiesOptions.map((city, index) => (
              <option key={city.id} value={city.id}>
                {city.cityName}
              </option>
            ))}
          </select>

        </div>


        <div className='grid grid-cols-4 gap-4 w-full p-10'>

          {movies.map((movie) => (
            <ShowMovieCard key={movie.id} movie={movie} cityId={selectedCityOption} />
          ))}




        </div>
      </div>
    </div>
  )
}

export default Homepage