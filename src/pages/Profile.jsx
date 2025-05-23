import './App.css';
import Header from '../components/header.jsx';
import Footer from '../components/Footer.jsx';
import { useState } from 'react';
import { motion } from 'framer-motion';

function Clinics() {
    const [isModalOpen, setModalOpen] = useState(false);

    // Function to show the modal
    const showModal = () => setModalOpen(true);

    // Function to hide the modal
    const hideModal = () => setModalOpen(false);

    return (
        <>
            <Header />
            <div className="h-auto p-20 flex justify-center items-center bg-gradient-to-r from-yellow-100 via-gray-100 to-yellow-200">
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, type: 'spring', stiffness: 100 }}
                    className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full text-center space-y-6"
                >
                    <h2 className="text-3xl font-bold text-blue-900">Access Your Profile</h2>
                    <p className="text-lg text-gray-700">
                        You need to be logged in to view your profile. Please login or register first.
                    </p>
                    <div className="flex justify-center space-x-4">
                        <button
                            className="bg-blue-600 text-white rounded-lg hover:bg-blue-400 transition duration-300 px-7 py-2"
                            onClick={showModal} // Show the modal when the user clicks login
                        >
                            Login
                        </button>
                        <button
                            className="bg-blue-600 text-white px-7 py-2 rounded-lg hover:bg-blue-400 transition duration-300"
                            onClick={showModal} // Show the modal when the user clicks register
                        >
                            Register
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Custom Modal for Alert */}
            {isModalOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 flex justify-center items-center bg-gradient-to-r from-yellow-200 via-sky-200 to-yellow-200 bg-opacity-50 z-50"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="bg-white rounded-xl p-8 max-w-md w-full text-center shadow-xl"
                    >
                        <h3 className="text-2xl font-bold text-blue-900 mb-4">Login Required</h3>
                        <p className="text-lg text-gray-700 mb-6">
                            Please login or register to access your profile.
                        </p>
                        <div className="flex justify-center space-x-4">
                            <button
                                className="bg-yellow-500 text-white p-4 rounded-lg hover:bg-yellow-400 transition duration-300"
                                onClick={hideModal} // Close modal when clicked
                            >
                                Close
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}

            <Footer />
        </>
    );
}

export default Clinics;
