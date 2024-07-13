import React, { useEffect, useState } from 'react'
import { postData } from '../api-integration/api';
import AddSeats from './AddSeats';

const screenFormData = {
  screenName: '',
  seats: []
};



const AddScreen = ({ index, updateScreenArr }) => {



  const [seatArr, setSeatArr] = useState([]);
  let [formdata, setFormdata] = useState(screenFormData);

  const updateSeats = (newSeats) => {
    setSeatArr(newSeats);

  };

  useEffect(() => {
    setFormdata((prevFormdata) => ({
      ...prevFormdata,
      seats: seatArr
    }));
  }, [seatArr]);


  //---------------------

  // useEffect(() => {
  //   updateScreenArr(index, formdata);
  // }, [formdata, index, updateScreenArr]);



  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;


  //   setFormdata({
  //     ...formdata,
  //     [name]: value
  //   });

  //   updateScreenArr(formdata)

  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormdata({
      ...formdata,
      [name]: value
    });
  };

  useEffect(() => {
    // Update parent with current screen data
    updateScreenArr(index, formdata);
  }, [formdata, index, updateScreenArr]);






  return (
    <div className='flex flex-col p-2 mt-2 bg-stone-200'>
      {/* <form className=" mx-auto w-full" onSubmit={handleSubmit}> */}
      <form className=" mx-auto w-full">


        <div className='flex flex-col p-2 items-start'>

          <div className="mb-5 flex flex-col w-full">

            <label htmlFor="theatreName" className="ml-1 flex mb-2 text-sm font-medium text-gray-900 dark:text-white" style={{ alignSelf: 'flex-start', width: '100%' }}>
              Screen name
            </label>

            <input
              value={formdata.theatreName}
              onChange={handleInputChange}
              name="screenName"
              type="text" id="screenName" className=" w-1/6 mb-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Screen Name" required />

            {<AddSeats updateSeatArr={updateSeats}/>}
          </div>


        </div>





      </form>



    </div>
  )
}

export default AddScreen