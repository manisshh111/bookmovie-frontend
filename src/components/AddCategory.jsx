
import React, { useEffect, useState } from 'react'
import { postData } from '../api-integration/api';
import { getData } from '../api-integration/api';


const initialFormdata = {
  categoryName: '',
};

const AddCategory = () => {
  const [formdata, setFormdata] = useState(initialFormdata);
  const [categoriesList, setCategoriesList] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("before post");
      console.log(formdata);
      const res = await postData("category/add", formdata);
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

  useEffect(() => {
    fetchCategoriesList();
  }, []);

  const fetchCategoriesList = async () => {
    try {
      const result = await getData('category/categories');
      setCategoriesList(result);
      console.log(JSON.stringify(result));
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  return (
    <div className='flex flex-col p-2 mt-20'>
      <form className="max-w-sm mx-auto w-1/2" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="categoryName" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
            Add Category
          </label>
          <input
            value={formdata.categoryName}
            onChange={handleInputChange}
            name="categoryName"
            type="text"
            id="categoryName"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Category"
            required
          />
        </div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Submit
        </button>
      </form>

      <div className="container mx-auto p-10 w-1/2">
        <h1 className="text-2xl font-bold mb-4">List of Categories</h1>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200">Category</th>
              <th className="py-2 px-1 border-b border-gray-200">Edit</th>
              <th className="py-2 px-1 border-b border-gray-200">Delete</th>
            </tr>
          </thead>
          <tbody>
            {categoriesList.map((c, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b border-gray-200">{c.categoryName}</td>
                <td className="py-2 px-1 border-b border-gray-200">
                  <button type="button" className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                    Edit
                  </button>
                </td>
                <td className="py-2 px-1 border-b border-gray-200">
                  <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddCategory;
