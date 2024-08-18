import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import ticketPageImage from './ticketPageImage.jpg';
const initialFormData = {

    "bookingId": "",
    "movie": "",
    "theatre": "",
    "screen": "",
    "seats": [],
    "startTime": "",

}

const Ticket = () => {
    const location = useLocation();
    const prevPageData = location.state?.ticket;
    const [bookingDetails, setBookingDetails] = useState(initialFormData);

    useEffect(() => {
        setBookingDetails(prevPageData)
        console.log(bookingDetails)
    }, [])

    useEffect(() => {
        if (bookingDetails) {
            console.log(bookingDetails)
        }
    }, [bookingDetails])

    const handlePrint = () => {
        window.print();
    };




      const customStyles = {
        border: '50px solid #faf5f4',  // Customize the border width and color
        backgroundColor: '#faf5f4',    // Customize the background color
        borderRadius: '20px'
      };

    return (
        <div className='flex flex-col justify-center items-center min-h-screen' style={{
            backgroundImage: `url(${ticketPageImage})`, // Use the imported image here
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            
        }}>
            <div className="flex items-center flex-col w-1/5 h-1/4" style={customStyles}>
                <p className="mb-4 text-lg font-medium">Your Ticket has been successfully booked.</p>
                <div className="bg-red-300 p-6 rounded-lg shadow-lg w-80">
                    <div className="text-left text-gray-700 mb-6">
                        <p><strong>Booking ID:</strong> {bookingDetails.bookingId}</p>
                        <p><strong>Movie:</strong> {bookingDetails.movieName}</p>
                        <p><strong>Theatre:</strong> {bookingDetails.theatreName}</p>
                        <p><strong>Screen:</strong> {bookingDetails.screenName}</p>
                        <p><strong>Seats: </strong>
                        {bookingDetails.bookedSeats && bookingDetails.bookedSeats.map((seat, seatIndex) => (
                            <span key={seatIndex}>
                                {seat.seatNumber}
                                {seatIndex < bookingDetails.bookedSeats.length - 1 && ', '}
                            </span>

                        ))} </p>
                        <p><strong>Start Time:</strong> {bookingDetails.startTime}</p>
                    </div>
                    <div className="flex items-center justify-center bg-slate-500 rounded-lg p-6 shadow-inner">
                        <p className="text-4xl font-bold text-gray-800">QR</p>

                    </div>


                </div>

                {/* Print Ticket Button */}
                <button
                    onClick={handlePrint}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 no-print"
                >
                    Print Ticket
                </button>
            </div>
        </div>
    )
}

export default Ticket