import './App.css';
import Header from '../components/header.jsx';
import Footer from '../components/Footer.jsx';
import React, { useState, useEffect } from 'react';
import { Card, Rate, Input } from 'antd';
import { FaPaw, FaHospital, FaHeart, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { baseURL } from '../../config.js';
import { motion } from 'framer-motion';

const { Meta } = Card;

function Clinics() {
    const [allClinics, setAllClinics] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    // Fetch clinic data from backend
    useEffect(() => {
        const FetchData = async () => {
            try {
                const response = await axios.get(`${baseURL}/api/auth/FetchClinics`);
                setAllClinics(response.data.data);
            } catch (error) {
                console.error('Failed to fetch clinic data.', error);
            }
        };
        FetchData();
    }, []);

    const handleBooking = () => {
        navigate('/PetOwnerLoginForm');
    };

    // Handle search input change
    const handleSearch = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    return (
        <>
            <Header />

            <section className="py-10 bg-gradient-to-r from-yellow-100 via-gray-100 to-yellow-200">
                <h2 className="text-5xl font-bold text-blue-950 flex items-center justify-center">
                    About Our Clinics
                </h2>
                <div className="flex justify-between items-center mt-10 px-6 sm:px-12 flex-col sm:flex-row gap-8 sm:gap-0">
                    {/* Content Section */}
                    <div className="w-full sm:w-1/2 bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-md text-center sm:text-left">
                        <p className="text-xl text-gray-800 leading-relaxed">
                            Our clinics are certified, experienced, and fully equipped to provide your pets with the highest quality care.
                            Whether you need general checkups, emergency care, or specialty services, we ensure your pet receives the best treatment.
                        </p>
                    </div>

                    {/* Image Collage - now narrower */}
                    <div className="w-full sm:w-[35%]">
                        <div className="grid grid-cols-2 grid-rows-3 gap-2">
                            <motion.img
                                src="https://t3.ftcdn.net/jpg/04/40/15/70/360_F_440157013_kIXrsaMEkR9mKawzYYr6NftpDT52d5kE.jpg"
                                alt="Pets"
                                className="w-full h-28 object-cover rounded-lg shadow"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            />
                            <motion.img
                                src="https://thumbs.dreamstime.com/b/banner-pets-dog-cat-smiling-happy-expression-closed-eyes-isolated-blue-colored-background-367009053.jpg"
                                alt="Pets"
                                className="w-full h-28 object-cover rounded-lg shadow"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            />
                            <motion.img
                                src="https://www.rosevillecaliforniajoys.com/wp-content/uploads/2015/08/Whatever-your-pets-there-should-be-pet-hospitals-veterinarians-services-and-supplies-near-you-in-Roseville-CA-via-Kaye-Swain.jpg"
                                alt="Pets"
                                className="w-full h-28 object-cover rounded-lg shadow"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            />
                            <motion.img
                                src="https://www.atozvet.com/wp-content/uploads/2017/07/Prevention-and-Treatment-For-Pet-Disease-Midland-TX-scaled.jpg"
                                alt="Pets"
                                className="w-full h-28 object-cover rounded-lg shadow"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            />
                            <motion.img
                                src="https://images.unsplash.com/photo-1592194996308-7b43878e84a6"
                                alt="Pets"
                                className="w-full h-28 object-cover rounded-lg shadow col-span-2"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            />
                        </div>
                    </div>
                </div>
            </section>



            <section className="py-10 mt-none bg-gradient-to-r from-yellow-100 via-gray-100 to-yellow-200">
                <h2 className="text-5xl font-bold text-blue-950 flex items-center justify-center">
                    Book Your Clinic for Your Pet
                </h2>

                {/* Search Bar */}
                <div className="flex justify-center mt-8">
                    <Input.Search
                        placeholder="Search clinics by name or location..."
                        enterButton="Search"
                        allowClear
                        onChange={handleSearch}
                        style={{ width: '70%', maxWidth: '600px' }}
                        className="shadow-md rounded-lg"
                    />
                </div>

                {/* Clinic Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10 px-4">
                    {Array.isArray(allClinics) && allClinics
                        .filter(clinic =>
                            clinic.name?.toLowerCase().includes(searchQuery) ||
                            clinic.location?.toLowerCase().includes(searchQuery)
                        )
                        .map((clinic, index) => (
                            <Card
                                key={index}
                                className="shadow-xl rounded-xl overflow-hidden border-2 border-gray-300 hover:scale-105 hover:shadow-xl hover:shadow-yellow-500 transition-all duration-300 ease-in-out"
                            >
                                <img
                                    alt={clinic.name}
                                    src={clinic.clinicImage}
                                    className="w-full h-48 object-cover rounded-t-xl"
                                />
                                <div className="p-4">
                                    <Meta
                                        title={clinic.name}
                                        description={`Location: ${clinic.location || "Unknown"}`}
                                    />
                                    <Rate className="mt-2" allowHalf defaultValue={clinic.rating || 4} />
                                    <div className="flex items-center space-x-2 mt-4">
                                        <FaPaw className="text-green-500" />
                                        <span className="text-gray-700">{clinic.serviceType || "General Care"}</span>
                                    </div>
                                    <button
                                        onClick={handleBooking}
                                        className="mt-4 w-full bg-gray-800 text-white hover:rounded-bl-3xl hover:rounded-tr-3xl hover:rounded-tl-none hover:rounded-br-none focus:ring-4 focus:ring-yellow-300 transition-all rounded-lg py-3 flex items-center justify-center space-x-2 hover:shadow-lg"
                                    >
                                        <span>Book Now</span>
                                        <FaArrowRight className="ml-2" />
                                    </button>
                                </div>
                            </Card>
                        ))}
                </div>
            </section>

            <section className="py-10 bg-gradient-to-r from-yellow-100 via-gray-100 to-yellow-200">
                <h2 className="text-5xl font-bold text-blue-950 flex items-center justify-center">
                    Why Choose Us?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10 px-4">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <FaHospital className="text-yellow-500 text-4xl mb-4" />
                        <h3 className="text-2xl font-semibold mb-2">Expert Care</h3>
                        <p className="text-gray-700">
                            Our veterinarians are experienced in a variety of pet health needs, from routine checkups to emergency services.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <FaHeart className="text-pink-500 text-4xl mb-4" />
                        <h3 className="text-2xl font-semibold mb-2">Compassionate Service</h3>
                        <p className="text-gray-700">
                            We treat your pets like family, providing a warm, caring environment for every visit.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <FaPaw className="text-green-500 text-4xl mb-4" />
                        <h3 className="text-2xl font-semibold mb-2">Comprehensive Treatments</h3>
                        <p className="text-gray-700">
                            From vaccinations to specialized treatments, we offer a full range of services to keep your pet healthy.
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}

export default Clinics;
