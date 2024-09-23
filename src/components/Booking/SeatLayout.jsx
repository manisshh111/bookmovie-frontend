import React, { useEffect, useState } from 'react'
import { json, useLocation, useNavigate } from 'react-router-dom';
import { getData, postData } from '../../api-integration/api';

const initialFormData = {
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
              "booked": false,
              "locked": false
            }
          ]
        }
      ]
    }
  ]
}

const initialFormData2 = {
  "showId": null,
  "movieName": "",
  "screenName": "",
  "theatreName": "",
  "cityName": "",
  "startTime": "",
  "selectedSeats": [],
  "totalPrice": "",
  "sessionId":""
}

const SeatLayout = () => {
  const location = useLocation();
  const showId = (location.state?.show).showId;

  const [formData, setFormdata] = useState(initialFormData);

  useEffect(() => {
    fetchSeatLayoutData();
  }, []);


  useEffect(() => {
    console.log("formData : ->" + JSON.stringify(formData))
  }, [formData]);



  const fetchSeatLayoutData = async () => {
    try {
      const result = await getData('booking/seatlayout/' + showId);
      console.log("Response : --->" + JSON.stringify(result));
      setFormdata(result);
      console.log("formData : ->" + JSON.stringify(formData))
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

  //Handling seat Selects
  const [selectedSeats, setSelectedSeats] = useState([]);
  const handleSeatClick = (seat) => {
    const isSelected = selectedSeats.find((s) => s.id === seat.id);

    if (isSelected) {
      setSelectedSeats(selectedSeats.filter((s) => s.id !== seat.id));
    } else if (selectedSeats.length < 10) {
      setSelectedSeats([...selectedSeats, seat]);
    } else {
      alert('You can only select up to 10 seats.');
    }
  };


  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    console.log(JSON.stringify(selectedSeats));

    let p = 0;

    selectedSeats.forEach(function (showSeat) {
      let x = showSeat.price;
      p = p + x;
    });

    setTotalPrice(p);
    console.log("Price: " + totalPrice)

  }, [selectedSeats]);
  const [formdataTransfer, setFormdataTransfer] = useState(initialFormData2);
  const [sessionId1, setSessionId1] = useState('');

  useEffect(() => {
    setFormdataTransfer(prevData => ({
      ...prevData,
      showId: formData.showId,
      movieName: formData.movieName,
      screenName: formData.screenName,
      theatreName: formData.theatreName,
      cityName: formData.cityName,
      startTime: formData.startTime,
      sessionId: sessionId1,
      selectedSeats: selectedSeats.map(seat => ({
        id: seat.id,
        seatNumber: seat.seatNumber,
        category: {
          id: seat.category.id,
          categoryName: seat.category.categoryName
        },
        price: seat.price
      })),
      totalPrice: totalPrice,
      
    }));
  }, [formData, selectedSeats, totalPrice, sessionId1]);

  const navigate = useNavigate();
  const handleProceedClick = async () => {
    try {
      navigate(`/home/movie/payment`, { state: { formdataTransfer} });
    } catch (error) {
      console.error('Error during proceed:', error);
    }
  };





  return (
    <div className='flex justify-center min-h-screen'>
      <div className="flex items-center flex-col w-full min-h-screen bg-white">
        <div className='flex flex-col gap-1 bg-[#A04747] w-full text-white items-center justify-center text-lg'>
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
        <div className='overflow-x-auto'>
          {formData.categSeatsList.map((categSeat, categIndex) => (
            <div key={categIndex} className="categ-seat flex flex-col gap-3 mb-4">
              <h3 className='content-center mt-5'>Rs. {categSeat.categPrice.price} {categSeat.categPrice.categoryName}</h3>
              {categSeat.rowVsSeats.map((rowVsSeat, rowIndex) => (
                <div key={rowIndex} className="row-vs-seat flex flex-row gap-2 w-full text-center">
                  <h4 className='w-16 items-center text-center content-center'>{rowVsSeat.row}</h4>
                  {rowVsSeat.showSeats.map((showSeat, seatIndex) => {
                    const isDisabled = showSeat.booked || showSeat.locked;
                    const seatClass = `p-0.5 w-8 border border-gray-400 rounded text-center cursor-pointer 
              ${isDisabled ? 'bg-gray-700 text-white opacity-30 cursor-not-allowed'
                        : selectedSeats.find((s) => s.id === showSeat.id) ? 'bg-blue-300' : 'bg-white'}`;

                    return (
                      <div
                        key={seatIndex}
                        className={seatClass}
                        onClick={!isDisabled ? () => handleSeatClick(showSeat) : undefined}
                      >
                        <p>{showSeat.seatNumber.substring(1)}</p>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          ))}
        </div>






        <div className='w-full text-center py-2 bg-gray-800 text-white font-bold text-xl mb-28'>
          SCREEN
        </div>

        <div className="flex flex-row gap-4 items-center justify-center fixed bottom-0 left-0 w-full bg-gray-800 text-white p-4">
          <div className='text-xl font-bold'>Pay Rs. {totalPrice}</div>
          <button
            type="submit"
            onClick={handleProceedClick}
            className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${selectedSeats.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={selectedSeats.length === 0}
          >
            Proceed
          </button>
        </div>


      </div>
    </div>

  )
}

export default SeatLayout