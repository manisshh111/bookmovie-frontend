import React, { useEffect, useState } from 'react'
import { json, useLocation } from 'react-router-dom';
import { getData } from '../../api-integration/api';

const initialFormData= {
  "showId": null,
  "movieName": "",
  "screenName": "",
  "theatreName": "",
  "cityName": "",
  "startTime": "",
  "categSeatsList": [
      {
          "categPrice": {
              "categoryId": null,
              "categoryName": "",
              "price": null
          },
          "rowVsSeats": [
              {
                  "row": "",
                  "showSeats": [
                      {
                          "id": null,
                          "seatNumber": "",
                          "category": {
                              "id": null,
                              "categoryName": ""
                          },
                          "booking": null,
                          "price": null,
                          "booked": false
                      }
                  ]
              }
          ]
      }
  ]
}

const SeatLayout = () => {
  const location = useLocation();
  const showId = (location.state?.show).showId;

  const [formData, setFormdata] = useState(initialFormData);


  useEffect(() => {
    fetchSeatLayoutData();
  }, []);


  useEffect(() => {
    console.log("formData : ->"+JSON.stringify(formData))
  }, [formData]);



  const fetchSeatLayoutData = async () => {
    try {
      const result = await getData('booking/seatlayout/' + showId);
      console.log("Response : --->" + JSON.stringify(result));
      setFormdata(result);
      console.log("formData : ->"+JSON.stringify(formData))
    } catch (error) {
      console.error('Error fetching Seat form data:', error);
    }
  };

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    if (formData.startTime) {
      const [extractedDate, extractedTime] = formData.startTime.split('T');
      setDate(extractedDate);
      setTime(extractedTime);
    }
  }, [formData.startTime])




  

  const handleSeatClick=(seat)=>{
    
    console.log("Seat Selected"+  JSON.stringify(seat))
  }


  return (
    <div className='flex justify-center min-h-screen'>
      <div className="flex items-center flex-col w-3/4 min-h-screen bg-white">
        <div className='flex flex-col gap-1 bg-black w-full text-white items-center justify-center text-lg'>
          <div className='flex flex-row gap-1'>
            <div className='font-bold text-3xl hover:text-green-200'>
              {formData.movieName}
            </div>

          </div>

          <div className='flex flex-row gap-10'>

            <div className='hover:text-green-200'>
              <label>Theatre : </label>
              {formData.theatreName}
            </div>

            <div className='hover:text-green-200'>
              <label>City : </label>
              {formData.cityName}
            </div>


            <div className='hover:text-green-200'>
              <label>Date : </label>
              {date}
              <label>, Time: </label>
              {new Date(formData.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>


        </div> 

        <div>
      {formData.categSeatsList.map((categSeat, categIndex) => (
        <div key={categIndex} className="categ-seat flex flex-col gap-3 mb-4">
          <h3 className='content-center mt-5'>{categSeat.categPrice.categoryName}</h3>
          {categSeat.rowVsSeats.map((rowVsSeat, rowIndex) => (
            <div key={rowIndex} className="row-vs-seat flex flex-row gap-4 w-full text-center">
              <h4 className='w-16 items-center text-center content-center'>{rowVsSeat.row}</h4>
              {rowVsSeat.showSeats.map((showSeat, seatIndex) => (
                <div key={seatIndex} className={`p-2 w-12 border border-gray-400 rounded hover:bg-red-900 text-center   ${showSeat.booked ? 'bg-red-500' : 'bg-white'}`}>
                  <p>{showSeat.seatNumber.substring(1)}</p>
                  
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>





         <div className='w-full text-center py-2 bg-gray-800 text-white font-bold text-xl'> 
   SCREEN
</div>


      </div>
    </div>

  )
}

export default SeatLayout