import './App.css';
import ParentHeader from '../components/parentNav.jsx';
import Footer from '../components/Footer.jsx';
import React, { useState } from 'react';
import { Card, Rate, Input, Space, Drawer, Button } from 'antd';
import { FaPaw, FaHospital, FaHeart, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import axios from 'axios';
import { baseURL } from '../../config.js';
const { Meta } = Card;


function ParentFindClinics() {
    const navigate = useNavigate();

    const [allClinics, setAllClinics] = useState('')
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedClinic, setSelectedClinic] = useState(null);



    const handleSearch = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };


    useEffect(() => {
        const FetchData = async () => {
            try {
                const response = await axios.get(`${baseURL}/api/auth/FetchClinics`);
                setAllClinics(response.data.data)
            }
            catch (error) {
                console.log(error);
                console.error('Failed to fetch clinic data.');
            }
        };
        FetchData();
    }, []);

    const handleBooking = (clinic) => {
        navigate('/ParentBookClinic', { state: { clinic } });
    };


    const featuredClinics = Array.isArray(allClinics)
        ? [...allClinics].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 3)
        : [];



    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const showLoading = () => {
        setOpen(true);
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };

    return (
        <>
            <ParentHeader />

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
            

            <section className="py-16 bg-gradient-to-r from-yellow-100 via-gray-100 to-yellow-200">
                    <div className="text-center mb-12">
                        <h2 className="text-5xl font-extrabold text-blue-900 leading-tight mb-4">
                            Book a Trusted Clinic for Your Pet
                        </h2>
                        <p className="text-xl text-gray-700">
                            Easily browse through a wide variety of veterinary clinics. Search by clinic name or location and schedule an appointment for your furry friend with ease.
                        </p>
                    </div>


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


                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 px-6 mt-12">
    {Array.isArray(allClinics) && allClinics

                            .filter(clinic =>
                                clinic.username?.toLowerCase().includes(searchQuery) ||
                                clinic.location?.toLowerCase().includes(searchQuery)
                            )
                            .map((clinic, index) => (
                                
                                <Card
                                    key={index}
                                    className="bg-white/60 backdrop-blur-md rounded-3xl border border-gray-200 shadow-lg hover:shadow-yellow-400 transition-transform duration-300 ease-in-out transform hover:-translate-y-2 overflow-hidden"
                                >
                                    <div className="relative">
                                        <img
                                            alt={clinic.username}
                                            src={clinic.clinicImage || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfxQTzcaRKmoU03jHXFnP6E_rHP_951XxDDQ&s"}
                                            className="w-full h-48 object-cover rounded-t-3xl"
                                            onClick={() => {
                                                setSelectedClinic(clinic);
                                                showLoading();
                                            }}

                                        />


                                        <Drawer
                                            title={selectedClinic?.username}
                                            placement="right"
                                            width={500}
                                            onClose={() => setOpen(false)}
                                            open={open}
                                            destroyOnClose
                                        >
                                            {loading ? (
                                                <div className="text-center py-20 font-semibold text-gray-700">Loading...</div>
                                            ) : (
                                                selectedClinic && (
                                                    <div className="space-y-4">
                                                        <img
                                                            src={selectedClinic.clinicImage || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfxQTzcaRKmoU03jHXFnP6E_rHP_951XxDDQ&s"}
                                                            alt={selectedClinic.username}
                                                            className="w-full h-60 object-cover rounded-lg"
                                                        />
                                                        <p><strong>Location:</strong> {selectedClinic.location || "Not specified"}</p>
                                                        <p><strong>Contact:</strong> {selectedClinic.email || "Not specified"}</p>
                                                        <p><strong>Service Type:</strong> {selectedClinic.serviceType || "General"}</p>
                                                        <p><strong>Rating:</strong> ⭐ {selectedClinic.rating || 4}/5</p>
                                                        <Button
                                                            type="primary"
                                                            onClick={() => handleBooking(selectedClinic)}
                                                            block
                                                            className="bg-yellow-500 hover:bg-yellow-600 font-semibold"
                                                        >
                                                            Book Now
                                                        </Button>
                                                    </div>
                                                )
                                            )}
                                        </Drawer>

                                    </div>

                                    <div className="p-5 space-y-4">
                                        <Meta
                                            title={
                                                <span className="text-xl font-semibold text-blue-950">{clinic.username}</span>
                                            }
                                            description={
                                                <span className="text-sm text-gray-600">📍 {clinic.location || "Unknown"}</span>
                                            }
                                        />

                                        <div className="flex items-center gap-2 mt-2 text-sm text-gray-700">
                                            <FaPaw className="text-green-500" />
                                            <span>{clinic.serviceType || "General Care"}</span>
                                        </div>

                                        <div className="flex items-center gap-2 mt-2 text-sm text-gray-700">
                                            <FaPaw className="text-pink-500" />
                                            {clinic.email ? (
                                                <a href={`mailto:${clinic.email}`} className="hover:underline">
                                                    {clinic.email}
                                                </a>
                                            ) : (
                                                <span>No Contact</span>
                                            )}
                                        </div>


                                        <Rate allowHalf defaultValue={clinic.rating || 4} className=" text-yellow-500" />


                                        <button
                                            onClick={() => handleBooking(clinic)}
                                            className="mt-4 w-full bg-gray-800 text-white hover:rounded-bl-3xl hover:rounded-tr-3xl hover:rounded-tl-none hover:rounded-br-none focus:ring-4 focus:ring-yellow-300 transition-all rounded-lg py-3 flex items-center justify-center space-x-2 hover:shadow-lg"
                                        >
                                            <span>Book Now</span>
                                            <FaArrowRight className="ml-2" />
                                        </button>
                                    </div>
                                </Card>

                            ))
                        }


                        {Array.isArray(allClinics) && allClinics.filter(clinic =>
                            clinic.username?.toLowerCase().includes(searchQuery) ||
                            clinic.location?.toLowerCase().includes(searchQuery)
                        ).length === 0 && (
                                <div className="col-span-full text-center mt-10 text-gray-600 text-lg">
                                    No clinics found for "<strong>{searchQuery}</strong>"
                                </div>
                            )}
                    </div>
            </section>



            <section className="py-10 bg-gradient-to-r from-yellow-100 via-gray-100 to-yellow-200 ">
                <h2 className="text-5xl font-bold text-blue-950 flex items-center justify-center ">
                    Featured Clinics
                </h2>

                {/* Flex container to align clinics in one row */}
                <div className="flex justify-center gap-8 mt-10">
                    {Array.isArray(allClinics) && allClinics
                        .sort((a, b) => (b.rating || 0) - (a.rating || 0)) // Sort by rating (descending)
                        .slice(0, 3) // Get the top 3 clinics
                        .map((clinic, index) => (
                            <Card key={index} className="w-80 shadow-xl rounded-xl overflow-hidden border-2 border-gray-300 hover:scale-105 hover:shadow-xl hover:shadow-yellow-500 transition-all duration-300 ease-in-out">
                                <img
                                    alt={clinic.username}
                                    src={clinic.clinicImage || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfxQTzcaRKmoU03jHXFnP6E_rHP_951XxDDQ&s"}
                                    className="w-full h-64 object-cover rounded-t-xl"
                                />
                                <div className="p-4">
                                    <Meta
                                        title={clinic.username}
                                        description={`Location: ${clinic.location || "Unknown"}`}
                                    />
                                    <Rate className="mt-2" allowHalf defaultValue={clinic.rating || 4} />
                                    <div className="flex items-center space-x-2 mt-4">
                                        <FaPaw className="text-green-500" />
                                        <span className="text-gray-700">{clinic.serviceType || "General Care"}</span>
                                    </div>
                                    <button
                                        onClick={() => handleBooking(clinic)}
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


            <section className="py-10 bg-gradient-to-r from-yellow-100 via-gray-100 to-yellow-200 ">
                <h2 className="text-5xl font-bold text-blue-950 flex items-center justify-center ">
                    Featured clinic
                </h2>

                {/* Flex container to align clinics in one row */}
                <div className="flex justify-center gap-8 mt-10">
                    {featuredClinics.map((clinic, index) => (
                        <Card key={index} className="w-80 shadow-xl rounded-2xl overflow-hidden border-2 border-gray-300 hover:scale-105 hover:shadow-xl hover:shadow-yellow-500 transition-all duration-300 ease-in-out">
                            <img
                                alt={clinic.username}
                                src={clinic.clinicImage || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfxQTzcaRKmoU03jHXFnP6E_rHP_951XxDDQ&s"}
                                className="w-full h-64 object-cover rounded-t-xl"
                            />
                            <div className="p-4">
                                <Meta
                                    title={clinic.username}
                                    description={`Location: ${clinic.location || "Unknown"}`}
                                />
                                <Rate className="mt-2" allowHalf defaultValue={clinic.rating || 4} />
                                <div className="flex items-center space-x-2 mt-4">
                                    <FaPaw className="text-green-500" />
                                    <span className="text-gray-700">{clinic.serviceType || "General Care"}</span>
                                </div>
                                <button
                                    onClick={() => handleBooking(clinic)}
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



            <Footer />
        </>
    );
}

export default ParentFindClinics;
