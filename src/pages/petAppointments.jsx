import React, { useEffect, useState } from 'react';
import ParentHeader from '../components/parentNav';
import Footer from '../components/Footer';
import axios from 'axios';
import { baseURL } from '../../config';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

function PetParentAppointments() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    const parentEmail = localStorage.getItem('UserEmail');

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get(`${baseURL}/api/auth/getAppointmentsByEmail`, {
                    params: { parentEmail },
                });
                setAppointments(response.data.data);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            } finally {
                setLoading(false);
            }
        };

        if (parentEmail) {
            fetchAppointments();
        }
    }, [parentEmail]);

    const getStatusColor = (status) => {
        switch (status) {
            case "Accepted":
                return "bg-green-100 text-green-700";
            case "Pending":
                return "bg-yellow-100 text-yellow-700";
            case "Rejected":
                return "bg-red-100 text-red-700";
            default:
                return "bg-gray-100 text-gray-600";
        }
    };

    return (
        <>
            <ParentHeader />

            <section className="py-10 bg-gradient-to-r from-yellow-100 via-white to-yellow-200 min-h-screen">
            <h2 className="text-4xl font-bold text-blue-950 text-center mb-10 drop-shadow-lg">
    Your Booked Appointments
</h2>


                {loading ? (
                    <p className="text-center text-lg text-gray-600">Loading...</p>
                ) : appointments.length === 0 ? (
                    <p className="text-center text-xl text-gray-700">You have no appointments yet.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6">
                        {appointments.map((appoint, index) => {
                            const statusClasses = getStatusColor(appoint.appointmentStatus);

                            return (
                                <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="bg-white p-6 rounded-3xl shadow-2xl border border-blue-900 hover:shadow-gray-400 hover:scale-[1.03] transition-all duration-300"
                            >
                                <div className="flex justify-between items-center">
                                    <span className={`text-sm font-semibold px-3 py-1 rounded-full ${statusClasses}`}>
                                        {appoint.appointmentStatus}
                                    </span>
                                </div>
                            
                                <h3 className="text-2xl font-bold text-blue-900 mt-3 drop-shadow-md">
                                    {appoint.clinicName}
                                </h3>
                            
                                <p className="text-gray-700 flex items-center mt-2 text-base drop-shadow-sm">
                                    <FaMapMarkerAlt className="mr-2 text-fuchsia-600" />
                                    {appoint.location}
                                </p>
                            
                                <p className="text-gray-800 mt-2 text-base drop-shadow-sm">
                                    <strong className="text-blue-800">Pet:</strong> {appoint.petName}
                                </p>
                            
                                <p className="text-gray-800 mt-1 text-base drop-shadow-sm">
                                    <strong className="text-blue-800">Date:</strong>{" "}
                                    {new Date(appoint.appointmentDate).toLocaleDateString()}
                                </p>
                            
                                <p className="text-gray-800 flex items-center mt-1 text-base drop-shadow-sm">
                                    <FaClock className="mr-2 text-fuchsia-600" />
                                    {appoint.appointmentTime}
                                </p>
                            </motion.div>
                            
                            );
                        })}
                    </div>
                )}
            </section>

            <Footer />
        </>
    );
}

export default PetParentAppointments;
