import React, { useState } from 'react';


const AddSeats = ({ updateSeatArr }) => {
  const initialRow = {
    categoryId: '',
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
    const updatedRows = [...formData];
    updatedRows[index] = {
      ...updatedRows[index],
      [fieldName]: value,
    };
    setFormData(updatedRows);
    updateSeatArr(updatedRows);
   // console.log(updatedRows);
  };

  const [categories, setCatergories] = useState([]);

  return (
    <div className="p-4">
      {rows.map((_, rowIndex) => (
        <div key={rowIndex} className="text-xs grid grid-cols-6 gap-0 border border-gray-300 mb-2 w-full">
          <div className="col-span-1 p-2 border border-gray-300 text-center flex items-center justify-center">
            <select
              className="text-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={formData[rowIndex]?.categoryId || ''}
              onChange={(e) => handleInputChange(rowIndex, 'categoryId', e.target.value)}
              name="categoryId"
              required
            >
              <option value="">Seat Category</option>
              {categories.map((category, index) => (
                <option key={index} value={category.categoryId}>
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
