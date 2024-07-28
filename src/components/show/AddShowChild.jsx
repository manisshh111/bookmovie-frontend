import React, { useCallback, useEffect, useState } from 'react'
import { getData, postData } from '../../api-integration/api'
import AddSeats from '../../components/AddSeats';
import CategPrice from './CategPrice';

const showChildFormData = {
  startTime: '',
  movieId: "",
  screenId: "",
  categPrice: [
    {
      categoryId: "",
      price: ""
    }
  ]

};


const AddShowChild = ({ index, updateShowChildArr, theatreId }) => {



  let [formdata, setFormdata] = useState(showChildFormData);


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormdata({
      ...showChildFormData,
      [name]: value,
    });
  };

  useEffect(() => {
    // Update parent with current screen data
    updateShowChildArr(index, formdata);
  }, [formdata, index, updateShowChildArr]);


  // Handling movies dropdown------------------------------------------


  const [selectedMovieOption, setSelectedMovieOption] = useState('');
  const [movieOptions, setMoviesOptions] = useState([]);
  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const result = await getData('movie/movies');
      setMoviesOptions(result);
      console.log("movie")
      console.log(JSON.stringify(result));
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  // Handle change event for select
  const handleMovieOptionsChange = (event) => {
    setSelectedMovieOption(event.target.value);
    console.log(event.target.value)
    setFormdata((prevFormdata) => ({
      ...prevFormdata,
      movieId: event.target.value
    }));
  };


  // Handling screens dropdown------------------------------------------


  const [selectedScreenOption, setSelectedScreenOption] = useState('');
  const [screenOptions, setScreenOptions] = useState([]);
  useEffect(() => {
    fetchScreens();
  }, [theatreId]);

  const fetchScreens = async () => {
    try {
      const result = await getData('screen/get/' + theatreId);
      setScreenOptions(result);
      console.log("screen")
      console.log(JSON.stringify(result));
    } catch (error) {
      console.error('Error fetching screens:', error);
    }
  };

  // Handle change event for select
  const handleScreensOptionsChange = (event) => {
    setSelectedScreenOption(event.target.value);
    console.log(event.target.value)
    setFormdata((prevFormdata) => ({
      ...prevFormdata,
      screenId: event.target.value
    }));
  };

  useEffect(() => {
    console.log(formdata)
  }, [formdata]);



  //Handling CategPrice component
  const [count, setCount] = useState(0);
  const [categPriceArr, setCategPriceArr] = useState([]);
  const updateCategPriceArr = useCallback((index, newData) => {
    setCategPriceArr(prevCategPrices => {
      const updatedCategPrices = [...prevCategPrices];
      updatedCategPrices[index] = newData;
      return updatedCategPrices;
    });
  
  }, []);

  useEffect(() => {
    setFormdata((prevFormdata) => ({
      ...prevFormdata,
      categPrice: categPriceArr
    }));
  }, [categPriceArr]);


  // Fetch categories when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await getData('category/get/categories/' + formdata.screenId);
        setCount(result.length);
        console.log(result.length)
        console.log("count---" + count);


      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, [formdata.screenId]);



  return (
    <div className='flex flex-col p-2 mt-2 bg-stone-200'>
      {/* <form className=" mx-auto w-full" onSubmit={handleSubmit}> */}
      <form className=" mx-auto w-full">


        <div className='flex flex-row p-2 items-start gap-4'>
          {/* //date picker */}
          <input type="datetime-local" id="startTime" name="startTime"
            className="w-1/4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={formdata.startTime}
            onChange={(event) => {
              setFormdata((prevFormdata) => ({
                ...prevFormdata,
                startTime: event.target.value
              }));
            }}
          />
          {/* //select movie */}
          <select
            className=" w-1/4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={selectedMovieOption}
            onChange={handleMovieOptionsChange}
            name="movieId"
            required
          >
            <option value="">Movie</option>
            {movieOptions.map((movie) => (
              <option key={movie.id} value={movie.id}>
                {movie.name}
              </option>
            ))}
          </select>

          {/* //select screen */}

          <select
            className="w-1/4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={formdata.screenId}
            onChange={handleScreensOptionsChange}
            name="screenId"
            required
          >
            <option value="">Screen</option>
            {screenOptions.map((screen) => (
              <option key={screen.id} value={screen.id}>
                {screen.name}
              </option>
            ))}
          </select>

          {/* Time Picker
          <input
            type="time"
            id="time"
            name="time"
            className="w-1/4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={formdata.startTime}
            onChange={(event) => {
              setFormdata((prevFormdata) => ({
                ...prevFormdata,
                startTime: event.target.value
              }));
            }}
          /> */}

          {/* //dynamic categPrice[] */}
        </div>
        {Array.from({ length: count }, (_, index) => (
          <CategPrice key={index} index={index} updateCategPriceArr={updateCategPriceArr} screenId={formdata.screenId} />
        ))}
      </form>

    </div>
  )
}

export default AddShowChild