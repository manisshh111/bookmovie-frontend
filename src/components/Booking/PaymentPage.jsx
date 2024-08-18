import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { postData } from '../../api-integration/api';

const initialFormData = {
"sessionId":"",
"email":"",
"mobile":"",
"cardNumber":"",
"cardHolderName":"",
"expiryMonth":"",
 "expiryYear":"",
"cvv":""
 

}

const PaymentPage = () => {

  const [formData, setFormdata] = useState(initialFormData);



  const location = useLocation();
  const [prevPageData, setPrevPageData]= useState(location.state?.formdataTransfer);
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
 
  const[session, setSession] = useState('')

  useEffect(() => {
    lockSeats();
  }, []);

  const lockSeats = async () => {
    try {
      const result = await postData('booking/lockSeats', prevPageData.selectedSeats);
      setSession(result);
      console.log('Result:', result);
    } catch (error) {
      console.error('Error locking:', error);
    }
  };

  useEffect(() => {
    if (session) {
      console.log('Updated session value:', session);
      setFormdata(prevData => ({
        ...prevData,
        sessionId: session
      }));
    }
  }, [session]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    setFormdata(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log(formData)
  }, [formData]);


const[ticket, setTicket]=useState('');

//book ticket
const bookSeats = async () => {
  try {
    const result = await postData('booking/bookwithsessionid', formData);
    setTicket(result);
    console.log('Book Seats Result:', result);
    //navigate(`/home/movie/ticket`, { state: { ticket: result, prevPageData } });
    navigate(`/home/movie/ticket`, { state: { ticket: result } });
  } catch (error) {
    console.error('Error booking:', error);
    navigate(`/`);
  }
};

const handleSubmit = (e) => {
  e.preventDefault();
  bookSeats();
};

useEffect(() => {
  if (!prevPageData) {
    console.error('No previous page data found');
    navigate('/error', { state: { message: 'No data available' } });
  }
}, [prevPageData, navigate]);;



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
              Selected Seats :
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

{/* Combined Form */}
<div className='w-full'>
  <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6 p-4 bg-slate-200 rounded-lg items-center">
    
    {/* Email Phone Number */}
    <div className="flex flex-row gap-5 justify-center">
      <div className="mb-5 w-1/2">
        <input
          value={formData.email}
          onChange={handleInputChange}
          name="email"
          type="email" /* HTML5 validation for email format */
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Email"
          required /* Makes the input required */
        />
        <div className="text-red-500 text-xs mt-1">
          {/* Error message will be displayed here if validation fails */}
        </div>
      </div>

      <div className="mb-5 w-1/2">
        <input
          value={formData.mobile}
          onChange={handleInputChange}
          name="mobile"
          id="mobile"
          type="tel" /* HTML5 validation for phone number */
          pattern="[0-9]{10}" /* Validates that the phone number is 10 digits */
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Mobile number"
          required /* Makes the input required */
        />
        <div className="text-red-500 text-xs mt-1">
          {/* Error message will be displayed here if validation fails */}
        </div>
      </div>
    </div>

    {/* Payment Info */}
    <div className='bg-red-300 p-4 rounded-lg w-1/2'>
      <p className="text-center mb-4 font-bold">Dummy Payment</p>
      <div className="flex flex-col gap-4">
        <input
          value={formData.cardNumber}
          onChange={handleInputChange}
          name="cardNumber"
          type="text"
          id="cardNumber"
          pattern="\d{16}" /* Validates that the card number is 16 digits */
          className="w-full p-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter Dummy Card Number (16 Digits)"
          required /* Makes the input required */
        />
        <div className="text-red-500 text-xs mt-1">
          {/* Error message will be displayed here if validation fails */}
        </div>
        
        <input
          value={formData.cardHolderName}
          onChange={handleInputChange}
          name="cardHolderName"
          type="text"
          id="cardHolderName"
          className="w-full p-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
          placeholder="Card Holder Name"
          required /* Makes the input required */
        />
        <div className="text-red-500 text-xs mt-1">
          {/* Error message will be displayed here if validation fails */}
        </div>

        <div className="flex gap-2">
          <input
            value={formData.expiryMonth}
            onChange={handleInputChange}
            name="expiryMonth"
            type="text"
            id="expiryMonth"
            placeholder="MM"
            maxLength="2"
            pattern="\d{2}" /* Validates that the month is in MM format */
            className="p-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-16"
            required /* Makes the input required */
          />
          <input
            value={formData.expiryYear}
            onChange={handleInputChange}
            name="expiryYear"
            type="text"
            id="expiryYear"
            placeholder="YY"
            maxLength="2"
            pattern="\d{2}" /* Validates that the year is in YY format */
            className="p-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-16"
            required /* Makes the input required */
          />
          <input
            value={formData.cvv}
            onChange={handleInputChange}
            name="cvv"
            type="text"
            id="cvv"
            placeholder="CVV"
            maxLength="3"
            pattern="\d{3}" /* Validates that the CVV is 3 digits */
            className="p-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-16"
            required /* Makes the input required */
          />
        </div>
      </div>
    </div>

    {/* Submit Button */}
    <div className="flex justify-center mt-6">
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg">Submit</button>
    </div>
  </form>
</div>


      </div>
    </div>
  )
}

export default PaymentPage