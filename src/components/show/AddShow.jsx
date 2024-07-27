import React, { useCallback, useEffect, useState } from 'react'
import { getData, postData } from '../../api-integration/api';
import AddScreen from '../AddScreen';
import AddShowChild from './AddShowChild';

const initialFormdata = {
  cityId: "",
  theatreId: "",
  shows: [
    {
      screenId:"",
      date: "",
      movieId:"",
      startTime:"",
      categoryVsPrice:[
        {
            categoryId:"",
            price:""
        }
      ]
    }
  ]
};



const AddShow = () => {

    let [formdata, setFormdata] = useState(initialFormdata);
    let [theatreId, setTheatreId] = useState(initialFormdata.theatreId);
  
    useEffect(() => {
      console.log(formdata)
    }, [formdata]);


    useEffect(() => {
      setTheatreId(formdata.theatreId);
    }, [formdata]);

  //Handle submit for Add show
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("Formdata: " + JSON.stringify(formdata));
  
      try {
        const res = await postData("show/add", formdata);
        console.log("Response: " + JSON.stringify(res));
      } catch (error) {
        console.error("Error submitting data: ", error);
      }
    };
  
    //Handle Input Change for Add show
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormdata({
        ...formdata,
        [name]: value
      });
    };
  
  //Handling ShowChild components----------------------------
  
    const [showCount, setShowCount] = useState(1);
  
    const addComponent = () => {
      setShowCount(showCount + 1);
    };
  
    const removeComponent = () => {
      if (showCount > 1) {
        setShowCount(showCount - 1);
      }
    };
  
    const handleShowCountInputChange = (event) => {
      setShowCount(Number(event.target.value));
    };
  
  
  //Handling ShowChild component
  const [showChildArr, setShowChildArr] = useState([]);
  const updateShowChildArr = useCallback((index, newData) => {
    setShowChildArr(prevShowChilds => {
      const updatedShowChilds = [...prevShowChilds];
      updatedShowChilds[index] = newData;
      return updatedShowChilds;
    });
  
  }, []);

  useEffect(() => {
    setFormdata((prevFormdata) => ({
      ...prevFormdata,
      shows: showChildArr
    }));
  }, [showChildArr]);

// Handling Cities dropdown------------------------------------------


const [selectedCityOption, setSelectedCityOption] = useState('');
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
  console.log(event.target.value)
  setFormdata((prevFormdata) => ({
    ...prevFormdata,
    cityId: event.target.value
  }));
};


// Handling Theatre dropdown------------------------------------------


const [selectedTheatreOption, setSelectedTheatreOption] = useState('');
const [theatreOptions, setTheatreOptions] = useState([]);
useEffect(() => {
  fetchTheatres();
}, [formdata.cityId]);

const fetchTheatres = async () => {
  try {
    const result = await getData('theatre/get/theatres/'+formdata.cityId);
    setTheatreOptions(result);
    console.log("theatre")
    console.log(JSON.stringify(result));
  } catch (error) {
    console.error('Error fetching cities:', error);
  }
};

// Handle change event for select
const handleTheatreOptionsChange = (event) => {
  setSelectedTheatreOption(event.target.value);
  console.log(event.target.value)
  setFormdata((prevFormdata) => ({
    ...prevFormdata,
    theatreId: event.target.value
  }));
};

  




  return (




    <div className='flex flex-col p-2 mt-20'>
      <form className=" mx-auto w-3/4" onSubmit={handleSubmit}>


        <div className='flex flex-col p-2 items-start'>
          <div className="mb-5 flex flex-col w-1/2">
            <label htmlFor="theatreName" className="ml-1 flex mb-2 text-sm font-medium text-gray-900 dark:text-white" style={{ alignSelf: 'flex-start', width: '100%' }}>
              Create Show
            </label>
             </div>

          <div className="mb-5 w-1/2">
            <label htmlFor="theatreName" className="ml-1 flex mb-2 text-sm font-medium text-gray-900 dark:text-white" style={{ alignSelf: 'flex-start', width: '100%' }}>
              City
            </label>
            <select
              id="cityId"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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

          <div className="mb-5 w-1/2">
            <label htmlFor="theatreName" className="ml-1 flex mb-2 text-sm font-medium text-gray-900 dark:text-white" style={{ alignSelf: 'flex-start', width: '100%' }}>
              Theatre
            </label>
            <select
              id="theatreId"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={selectedTheatreOption}
              onChange={handleTheatreOptionsChange}
              name="theatreId"
              required
            >
              <option value="">Select Theatre</option>
              {theatreOptions.map((theatre, index) => (
                <option key={theatre.id} value={theatre.id}>
                  {theatre.name}
                </option>
              ))}
            </select>
          </div>



          <div className="mb-1">
            <label htmlFor="noOfShows" className="ml-1 flex mb-2 text-sm font-medium text-gray-900 dark:text-white" style={{ alignSelf: 'flex-start', width: '100%' }}>
              No. Of shows
            </label>
            <select
              value={showCount}
              onChange={handleShowCountInputChange}
              name="showCount"
              id="showCount"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            >
              <option value="">No. of Shows </option>
              {[...Array(10)].map((_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </div>



        </div>
        {Array.from({ length: showCount }).map((_, index) => (
        <AddShowChild key={index} index={index} updateShowChildArr={updateShowChildArr} theatreId={theatreId} />
      ))}

        {}

        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
       
      </form>

      <div className='w-1/2'>

      </div>

       


    </div>

  )
}

export default AddShow