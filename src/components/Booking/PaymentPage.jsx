import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const initialFormData = {

}

const PaymentPage = () => {

  const [formData, setFormdata] = useState(initialFormData);


  const handleInputChange = () => {

  }


  const location = useLocation();
  const prevPageData = location.state?.formdataTransfer;
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    console.log(JSON.stringify(prevPageData))
    if (prevPageData.startTime) {
      const [extractedDate, extractedTime] = prevPageData.startTime.split('T');
      setDate(extractedDate);
      setTime(extractedTime);
    }
  }, [prevPageData.startTime])

  const navigate = useNavigate();
  const handleSubmit=()=>{
    navigate(`/home/movie/ticket`, { state: {formData} });
  }


  return (
    <div className='flex justify-center min-h-screen'>
      <div className="flex items-center flex-col w-3/4 min-h-screen bg-slate-200">
        <div className='flex flex-col gap-1 bg-black w-full text-white items-center justify-center text-lg'>
          <div className='flex flex-row gap-1'>
            <div className='font-bold text-3xl hover:text-green-200'>
              {prevPageData.movieName}
            </div>

          </div>

          <div className='flex flex-row gap-10'>

            <div className='hover:text-green-200'>
              <label>Theatre : </label>
              {prevPageData.theatreName}
            </div>

            <div className='hover:text-green-200'>
              <label>City : </label>
              {prevPageData.cityName}
            </div>


            <div className='hover:text-green-200'>
              <label>Date : </label>
              {date}
              <label>, Time: </label>
              {new Date(prevPageData.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>


        </div>


        {/* Selected Seats */}
        <div className='flex flex row bg-slate-200 w-full pt-4 justify-center gap-5'>

          <div className='flex flex-row gap-2'>
            <div className='font-bold'>
              SelectedSeats :
            </div>
            {prevPageData.selectedSeats.map((seat, seatIndex) => (
              <div key={seatIndex} className="categ-seat flex flex-row gap-=1 mb-4">
                <p> {seat.seatNumber}</p>
                {seatIndex < prevPageData.selectedSeats.length - 1 && ','}
              </div>
            ))}
          </div>
          <div className='font-bold flex flex-row'>
            Price : &nbsp;
            <p className='font-normal'>
              Rs. {prevPageData.totalPrice}
            </p>

          </div>
        </div>


        {/* Email Phone Number */}
        <div className='w-full'>
          <form className="w-full flex flex-row gap-5 justify-center">

            <div className="mb-5 w-1/4">
              <input
                value={formData.email}
                onChange={handleInputChange}
                name="email"
                type="text" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email" required />
            </div>

            <div className="mb-5 w-1/8">
              <input
                value={formData.mobile}
                onChange={handleInputChange}
                name="mobile"
                id="mobile"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Mobile number" required />
            </div>
          </form>
        </div>

        {/* Payment Info */}
        <div className='flex justify-center items-center w-1/2'>
          <div className='w-full max-w-md bg-red-300 p-4 rounded-lg mb-6'>
            <p className="text-center mb-4 font-bold">Dummy Payment</p>
            <form className="w-full flex flex-col gap-4">
              <div className='flex justify-center'>
                <input
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  name="cardNumber"
                  type="text"
                  id="cardNumber"
                  className="w-full p-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter Dummy Card Number"
                  required
                />
              </div>
              <div className='flex justify-center'>
                <input
                  value={formData.cardHolderName}
                  onChange={handleInputChange}
                  name="cardHolderName"
                  type="text"
                  id="cardHolderName"
                  className="w-full p-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Card Holder Name"
                  required
                />
              </div>
              <div className="flex justify-center gap-2">
                <input
                  type="text"
                  id="expiryMonth"
                  name="expiryMonth"
                  placeholder="MM"
                  maxLength="2"
                  pattern="\d{2}"
                  className="p-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-16"
                  required
                />
                <input
                  type="text"
                  id="expiryYear"
                  name="expiryYear"
                  placeholder="YY"
                  maxLength="2"
                  pattern="\d{2}"
                  className="p-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-16"
                  required
                />
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  placeholder="CVV"
                  maxLength="3"
                  pattern="\d{3}"
                  className="p-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-16"
                  required
                />
              </div>
            </form>
          </div>
        </div>

        <button type="submit" onClick={handleSubmit} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>




      </div>
    </div>
  )
}

export default PaymentPage