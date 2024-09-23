import React, { useEffect, useState } from 'react'
import { json, useLocation } from 'react-router-dom';
import { getData } from '../../api-integration/api';


const initialFormData =
{
  "showId": null,
  "movieName": "",
  "screenName": "",
  "theatreName": "",
  "cityName": "",
  "startTime": "",
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



const SelectSeat = () => {
  const location = useLocation();
  const showId = (location.state?.show).showId;

  const [formData, setFormdata] = useState(initialFormData);
  const [sortedSeats, setSortedSeats] = useState([]);



  function sortSeatsByNumber(seats) {
    return seats.sort((a, b) => {
      const [rowA, numberA] = [a.seatNumber.charAt(0), parseInt(a.seatNumber.slice(1))];
      const [rowB, numberB] = [b.seatNumber.charAt(0), parseInt(b.seatNumber.slice(1))];

      if (rowA < rowB) return -1;
      if (rowA > rowB) return 1;
      return numberA - numberB;
    });
  }




  useEffect(() => {
    fetchSelectSeatFormData();
  }, []);

  useEffect(() => {
    const sortedData1 = sortSeatsByNumber(formData.showSeats);
    console.log("Sorted Data : " + JSON.stringify(sortedData1));
    setSortedSeats(sortedData1);
  }, [formData]);

  const fetchSelectSeatFormData = async () => {
    try {
      const result = await getData('booking/seats/' + showId);
      setFormdata(result);
      console.log("Response : --->" + JSON.stringify(result));
    } catch (error) {
      console.error('Error fetching Seat form data:', error);
    }
  };

  const dateTimeString = formData.startTime;
  const [date, time] = dateTimeString.split('T');

  // Group seats by row
  const rows = sortedSeats.reduce((acc, seat) => {
    const row = seat.seatNumber.charAt(0);
    if (!acc[row]) {
      acc[row] = [];
    }
    acc[row].push(seat);
    return acc;
  }, {});

  const handleSeatClick=(seat)=>{
    
    console.log("Seat Selected"+  JSON.stringify(seat))
  }


  return (
    <div className='flex justify-center min-h-screen'>
      <div className="flex items-center flex-col w-3/4 min-h-screen bg-red-800">
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



        <div className="p-4 flex flex-col">
          {Object.keys(rows).map((row) => (
            <div key={row} className="flex flex-row gap-2 mb-4">
              {rows[row].map((seat) => (
                <div
                  key={seat.id}
                  className={`p-2 w-12 border border-gray-400 rounded hover:bg-red-900 text-center   ${seat.booked ? 'bg-red-500' : 'bg-white'}`}
                  value={seat}
                  onClick={() => handleSeatClick(seat)}
                >
                  x
                 <p>{seat.seatNumber}</p> 
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

export default SelectSeat