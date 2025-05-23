import React from 'react';
import { useLocation } from 'react-router-dom';

function BookClinic() {
    // Access the clinic details passed from the Clinics page
    const location = useLocation();
    const clinic = location.state?.clinic;

    if (!clinic) {
        return <div>No clinic selected.</div>;
    }

    return (
        <div className="py-16 px-8">
            <h1 className="text-4xl font-bold text-center">Booking Appointment</h1>

            {/* Clinic Details */}
            <div className="mt-10">
                <h2 className="text-2xl font-semibold">{clinic.name}</h2>
                <p className="text-lg">Location: {clinic.location}</p>
                <p className="text-lg">Type: {clinic.type}</p>
                <p className="text-lg">Rating: {clinic.rating} / 5</p>
                <img src={clinic.image} alt={clinic.name} className="w-full h-64 object-cover rounded-xl mt-4" />

                <div className="mt-8">
                    <h3 className="text-2xl">Complete Your Booking</h3>
                    {/* You can add your booking form here */}
                    <form>
                        <div className="mt-4">
                            <label className="text-lg">Select Date and Time</label>
                            <input type="datetime-local" className="mt-2 p-2 border-2 border-gray-300 rounded-lg w-full" />
                        </div>

                        <div className="mt-4">
                            <label className="text-lg">Your Name</label>
                            <input type="text" className="mt-2 p-2 border-2 border-gray-300 rounded-lg w-full" />
                        </div>

                        <div className="mt-4">
                            <label className="text-lg">Your Contact Number</label>
                            <input type="text" className="mt-2 p-2 border-2 border-gray-300 rounded-lg w-full" />
                        </div>

                        <button
                            type="submit"
                            className="mt-8 bg-blue-600 text-white p-3 rounded-lg w-full">
                            Confirm Booking
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default BookClinic;
