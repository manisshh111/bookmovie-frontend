import React, { useState, useEffect } from 'react';
import { getData } from '../api-integration/api';


const AddSeats = ({ updateSeatArr }) => {
  const initialRow = {
    categoryId: "0",
    fromRow: '',
    fromSeat: '',
    toRow: '',
    toSeat: '',
  };



  const [rows, setRows] = useState([initialRow]);
  const [formData, setFormData] = useState([initialRow]);

  const addRow = () => {
    setRows([...rows, initialRow]);
    setFormData([...formData, initialRow]);
  };

  const removeRow = (index) => {
    const updatedRows = [...rows];
    const updatedFormData = [...formData];
    updatedRows.splice(index, 1);
    updatedFormData.splice(index, 1);
    setRows(updatedRows);
    setFormData(updatedFormData);
  };

  const handleInputChange = (index, fieldName, value) => {
    const updatedFormData = [...formData];
    updatedFormData[index] = {
      ...updatedFormData[index],
      [fieldName]: value,
    };
    setFormData(updatedFormData);
    updateSeatArr(updatedFormData);
  };


// Handling Categories option dropdown------------------------------------------

// const [categories, setCategories] = useState([]);
// const [selectedCategoryOption, setSelectedCategoryOption] = useState('');

// useEffect(() => {
//   fetchCategories();
// }, []);

// const fetchCategories = async () => {
//   try {
//     const res = await getData('category/categories'); 
//     setCategories(res);
//     console.log(res);
//   } catch (error) {
//     console.error('Error fetching categories:', error);
//   }
// };

const [selectedCategoryOption, setSelectedCategoryOption] = useState('');
const [categoryOptions, setCategoryOptions] = useState([]);
useEffect(() => {
  fetchCategories();
}, []);

const fetchCategories = async () => {
  try {
    const result = await getData('category/categories');
    setCategoryOptions(result);
    console.log(JSON.stringify(result));
    console.log(JSON.stringify(categoryOptions));
  } catch (error) {
    console.error('Error fetching cities:', error);
  }
};





  return (
    <div className="p-4">
      {rows.map((_, rowIndex) => (
        <div key={rowIndex} className="text-xs grid grid-cols-6 gap-0 border border-gray-300 mb-2 w-full">
          <div className="col-span-1 p-2 border border-gray-300 text-center flex items-center justify-center">
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={formData[rowIndex]?.categoryId || ''}
              onChange={(e) => handleInputChange(rowIndex, 'categoryId', e.target.value)}
              name="categoryId"
              required
            >
              <option value="">Seat Category</option>
              {categoryOptions.map((category, index) => (
                <option key={index} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-1 p-2 border border-gray-300 text-center flex items-center justify-center">
            <label htmlFor={`fromRow-${rowIndex}`} className="ml-5 flex mt-2 text-sm font-medium text-gray-900" style={{ alignSelf: 'flex-start', width: '100%' }}>
              From: Row
            </label>
            <input
              value={formData[rowIndex]?.fromRow || ''}
              onChange={(e) => handleInputChange(rowIndex, 'fromRow', e.target.value)}
              name={`fromRow-${rowIndex}`}
              type="text"
              id={`fromRow-${rowIndex}`}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="A"
              required
            />
          </div>

          <div className="col-span-1 p-2 border border-gray-300 text-center flex items-center justify-center">
            <label htmlFor={`fromSeat-${rowIndex}`} className="ml-5 flex mt-2 text-sm font-medium text-gray-900" style={{ alignSelf: 'flex-start', width: '100%' }}>
              From: Seat
            </label>
            <input
              value={formData[rowIndex]?.fromSeat || ''}
              onChange={(e) => handleInputChange(rowIndex, 'fromSeat', e.target.value)}
              name={`fromSeat-${rowIndex}`}
              type="text"
              id={`fromSeat-${rowIndex}`}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="1"
              required
            />
          </div>

          <div className="col-span-1 p-2 border border-gray-300 text-center flex items-center justify-center">
            <label htmlFor={`toRow-${rowIndex}`} className="ml-5 flex mt-2 text-sm font-medium text-gray-900" style={{ alignSelf: 'flex-start', width: '100%' }}>
              To: Row
            </label>
            <input
              value={formData[rowIndex]?.toRow || ''}
              onChange={(e) => handleInputChange(rowIndex, 'toRow', e.target.value)}
              name={`toRow-${rowIndex}`}
              type="text"
              id={`toRow-${rowIndex}`}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="B"
              required
            />
          </div>

          <div className="col-span-1 p-2 border border-gray-300 text-center flex items-center justify-center">
            <label htmlFor={`toSeat-${rowIndex}`} className="ml-5 flex mt-2 text-sm font-medium text-gray-900" style={{ alignSelf: 'flex-start', width: '100%' }}>
              To: Seat
            </label>
            <input
              value={formData[rowIndex]?.toSeat || ''}
              onChange={(e) => handleInputChange(rowIndex, 'toSeat', e.target.value)}
              name={`toSeat-${rowIndex}`}
              type="text"
              id={`toSeat-${rowIndex}`}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="20"
              required
            />
          </div>

          <div className="col-span-1 p-2 border border-gray-300 text-center cursor-pointer flex items-center justify-center" onClick={rowIndex === 0 ? addRow : () => removeRow(rowIndex)}>
            {rowIndex === 0 ? '+' : '-'}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AddSeats;
