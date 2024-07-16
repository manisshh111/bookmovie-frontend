import React, { useCallback, useEffect, useState } from 'react'
import { getData, postData } from '../api-integration/api';
import AddScreen from './AddScreen';

const initialFormdata = {
  theatreName: "",
  cityId: "",
  address: "",
  screens: [
    {
      screenName: "",
      seats: []
    }
  ]
};



const AddTheatre = () => {

  let [formdata, setFormdata] = useState(initialFormdata);
  let [screenArr, setScreenArr] = useState([]);

//Handle submit for Add Theatre Array
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Formdata: " + JSON.stringify(formdata));

    try {
      const res = await postData("theatre/add", formdata);
      console.log("Response: " + JSON.stringify(res));
    } catch (error) {
      console.error("Error submitting data: ", error);
    }
  };

  //Handle Input Change for Add Theatre Array

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormdata({
      ...formdata,
      [name]: value
    });
  };

//Handling Screen components----------------------------

  const [screenCount, setScreenCount] = useState(1);

  const addComponent = () => {
    setScreenCount(screenCount + 1);
  };

  const removeComponent = () => {
    if (screenCount > 1) {
      setScreenCount(screenCount - 1);
    }
  };

  const handleScreenCountInputChange = (event) => {
    setScreenCount(Number(event.target.value));
  };


const updateScreenArr = useCallback((index, newData) => {
  setScreenArr(prevScreens => {
    const updatedScreens = [...prevScreens];
    updatedScreens[index] = newData;
    return updatedScreens;
  });

}, []);
  

 // Synchronize screenArr with formdata
 useEffect(() => {
  setFormdata((prevFormdata) => ({
    ...prevFormdata,
    screens: screenArr
  }));
}, [screenArr]);


//Printing formdata-----------------------------------------------------------------
    useEffect(() => {
    const intervalId = setInterval(() => {
      console.log(formdata);
    }, 5000);
    
    return () => clearInterval(intervalId);
  }, [formdata]); 


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





  return (




    <div className='flex flex-col p-2 mt-20'>
      <form className=" mx-auto w-3/4" onSubmit={handleSubmit}>


        <div className='flex flex-col p-2 items-start'>
          <div className="mb-5 flex flex-col w-1/2">
            <label htmlFor="theatreName" className="ml-1 flex mb-2 text-sm font-medium text-gray-900 dark:text-white" style={{ alignSelf: 'flex-start', width: '100%' }}>
              Theatre name
            </label>
            <input
              value={formdata.theatreName}
              onChange={handleInputChange}
              name="theatreName"
              type="text" id="theatreName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Theatre Name" required />
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
              Address
            </label>
            <textarea
              value={formdata.address}
              onChange={handleInputChange}
              name="address"
              id="address"
              rows="2" // Set the number of visible rows
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Address" required

            />

          </div>

          <div className="mb-1">
            <label htmlFor="noOfScreens" className="ml-1 flex mb-2 text-sm font-medium text-gray-900 dark:text-white" style={{ alignSelf: 'flex-start', width: '100%' }}>
              No. Of screens
            </label>
            <select
              value={screenCount}
              onChange={handleScreenCountInputChange}
              name="screenCount"
              id="screenCount"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            >
              <option value="">No. of screens </option>
              {[...Array(10)].map((_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </div>



        </div>
        {Array.from({ length: screenCount }).map((_, index) => (
        <AddScreen key={index} index={index} updateScreenArr={updateScreenArr} />
      ))}

        {}

        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
       
      </form>

      <div className='w-1/2'>

      </div>

       


    </div>

  )
}

export default AddTheatre