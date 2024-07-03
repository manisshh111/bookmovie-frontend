
import React, { useEffect, useState } from 'react'
import { postData } from '../api-integration/api';
import { getData } from '../api-integration/api';


const initialFormdata = {
  cityName: "",
  state: "",
  country: "",
};


const AddCity = () => {

  let [formdata, setFormdata] = useState(initialFormdata);

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetchCities();
    console.log("Formdata: " + JSON.stringify(formdata));

    try {
      const res = await postData("city/add", formdata);
      console.log("Response: " + JSON.stringify(res));
    } catch (error) {
      console.error("Error submitting data: ", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormdata({
      ...formdata,
      [name]: value
    });
  };

  //List of cities

  const [cities, setCities] = useState([]);
  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const result = await getData('city/cities');
      setCities(result);
      console.log(JSON.stringify(result));
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };





  return (




      <div className='flex flex-row p-2 mt-20'>
        <form className="max-w-sm mx-auto w-1/2" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label for="cityName" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Add City</label>
            <input
              value={formdata.cityName}
              onChange={handleInputChange}
              name="cityName"
              type="text" id="cityName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="City" required />
          </div>

          <div className="mb-5">
            <input
              value={formdata.state}
              onChange={handleInputChange}
              name="state"
              type="text" id="state" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="State" required />
          </div>

          <div className="mb-5">
            <input
              value={formdata.country}
              onChange={handleInputChange}
              name="country"

              type="text" id="country" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Country" required />
          </div>

          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>

        <div className="container mx-auto p-4 w-1/2">
          <h1 className="text-2xl font-bold mb-4">List of Cities</h1>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-200">City</th>
                <th className="py-2 px-4 border-b border-gray-200">State</th>
                <th className="py-2 px-4 border-b border-gray-200">Country</th>
                <th className="py-2 px-1 border-b border-gray-200">Edit</th>
                <th className="py-2 px-1 border-b border-gray-200">Delete</th>


              </tr>
            </thead>
            <tbody>
              {cities.map((city, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b border-gray-200">{city.cityName}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{city.state}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{city.country}</td>
                  <td className="py-2 px-1 border-b border-gray-200"><button type="button" class="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Edit</button></td>
                  <td className="py-2 px-1 border-b border-gray-200"> <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button></td>
                 
                </tr>
              ))}
            </tbody>
          </table>
        </div>


      </div>
  
  )
}

export default AddCity