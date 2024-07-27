import React, { useState, useEffect } from 'react';
import { getData } from '../../api-integration/api';

const initialFormdata = {
  categoryId: "",
  price: ""
};

const CategPrice = ({index, updateCategPriceArr,  screenId}) => {
  const [formData, setFormData] = useState(initialFormdata);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [count, setCount] = useState(0);

  // Fetch categories when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await getData('category/get/categories/'+screenId);
        setCategoryOptions(result);
        console.log(JSON.stringify(result));
        setCount(result.length);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, [screenId]);

  // Handle input change
  const handleInputChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value
    }));
  };


  useEffect(() => {
    // Update parent with current screen data
    updateCategPriceArr(index, formData);
  }, [formData, index, updateCategPriceArr]);

  return (
    <div className='p-4'>
      <div className="text-xs grid grid-cols-6 gap-0 border border-gray-300 mb-2 w-full">
        <div className="col-span-3 p-2 border border-gray-300 text-center flex items-center justify-center">
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={formData.categoryId}
            onChange={(e) => handleInputChange('categoryId', e.target.value)}
            name="categoryId"
            required
          >
            <option value="">Seat Category</option>
            {categoryOptions.map((category) => (
              <option key={category.id} value={category.id}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </div> 

        <div className="col-span-3 p-2 border border-gray-300 text-center flex items-center justify-center">
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={formData.price}
            onChange={(e) => handleInputChange('price', e.target.value)}
            name="price"
            placeholder="Price"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default CategPrice;
