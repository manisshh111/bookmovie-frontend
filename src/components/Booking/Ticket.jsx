import React, { useState } from 'react'
const initialFormData = {

    "bookingId": "",
    "movie": "",
    "theatre": "",
    "screen": "",
    "seats": [],
    "seartTime": "",

}

const Ticket = () => {

    const [bookingDetails, setBookingDetails] = useState(initialFormData);


    const handlePrint = () => {
        window.print();
    };


    return (
        <div className='flex flex-col justify-center items-center min-h-screen'>
            <div className="flex items-center flex-col w-3/4 min-h-screen bg-slate-200">
                <p className="mb-4 text-lg font-medium">Your Ticket has been successfully booked.</p>
                <div className="bg-red-300 p-6 rounded-lg shadow-lg w-80">
                    <div className="text-left text-gray-700 mb-6">
                        <p><strong>Booking ID:</strong> {bookingDetails.bookingId}</p>
                        <p><strong>Movie:</strong> {bookingDetails.movie}</p>
                        <p><strong>Theatre:</strong> {bookingDetails.theatre}</p>
                        <p><strong>Screen:</strong> {bookingDetails.screen}</p>
                        <p><strong>Seats:</strong> {bookingDetails.seats.join(', ')}</p>
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