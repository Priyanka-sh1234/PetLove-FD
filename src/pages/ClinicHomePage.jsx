import ClinicHeader from '../components/ClinicNav';
import Footer from '../components/Footer';
import React, { useEffect, useState } from 'react';
import {
    FaCalendarAlt,
    FaCommentAlt,
    FaStar,
    FaPaw,
    FaPlusCircle,
    FaCalendarCheck,
    FaUserMd
} from 'react-icons/fa';
import { Table } from 'antd';
import { toast } from 'react-toastify';
import axios from 'axios';
import { baseURL } from '../../config';
import { useNavigate } from 'react-router';
import instance from '../../axios.instance';
import { motion } from 'framer-motion';

function StatCard({ icon, title, value }) {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4 transition-all duration-300"
        >
            <div className="text-blue-900 text-3xl">{icon}</div>
            <div>
                <p className="text-sm text-gray-500">{title}</p>
                <p className="text-xl font-semibold text-blue-900">{value}</p>
            </div>
        </motion.div>
    );
}

function ClinicHomePage() {
    const clinicEmail = localStorage.getItem("ClinicEmail");
    const clinicName = localStorage.getItem("ClinicName");
    const [Count, setCount] = useState('');
    const [todaycount, settodaycount] = useState('');
    const [AllAppoints, setAllAppoints] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const getAllAppointForClinic = async () => {
            try {
                const response = await instance.get(`${baseURL}/api/auth/getAllAppointForClinic`, {
                    params: { clinicEmail }
                });
                setAllAppoints(response?.data?.data);
                setCount(response?.data?.count);
                settodaycount(response?.data?.todayCount);
            } catch (error) {
                console.error("Error fetching appointments:", error);
                toast.error(error.response?.data?.message || "Failed to fetch appointments");
            }
        };
        getAllAppointForClinic();
    }, [clinicEmail]);

    const columns = [
        {
            title: 'Pet Name',
            dataIndex: 'petName',
            key: 'petName',
        },
        {
            title: 'Parent Name',
            dataIndex: 'parentName',
            key: 'parentName',
        },
        {
            title: 'Parent Email',
            dataIndex: 'parentEmail',
            key: 'parentEmail',
        },
        {
            title: 'Date',
            dataIndex: 'appointmentDate',
            key: 'appointmentDate',
            render: (date) => new Date(date).toLocaleDateString(),
        },
        {
            title: 'Time',
            dataIndex: 'appointmentTime',
            key: 'appointmentTime',
        },
        {
            title: 'Status',
            dataIndex: 'appointmentStatus',
            key: 'appointmentStatus',
            render: (status) => (
                <span className={`font-semibold ${status === 'Confirmed' ? 'text-green-600' : status === 'Pending' ? 'text-yellow-600' : 'text-red-600'}`}>
                    {status}
                </span>
            ),
        },
    ];

    return (
        <>
            <ClinicHeader />

            <motion.section
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-r from-yellow-100 via-gray-100 to-yellow-200 py-12 px-6 md:px-16 min-h-screen"
            >
                <div className="text-center">
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl md:text-5xl font-bold text-gray-800 mb-2"
                    >
                        Welcome back, <span className="text-yellow-500">{clinicName}!</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-gray-700 text-lg"
                    >
                        Here's a quick overview of your clinic.
                    </motion.p>
                </div>



                {/* Stat Cards */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 mt-12"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        visible: {
                            transition: {
                                staggerChildren: 0.1
                            }
                        }
                    }}
                >
                    <StatCard icon={<FaCommentAlt />} title="New Reviews" value="3" />
                    <StatCard
                        icon={<FaPaw />}
                        title="Next Appointment"
                        value={
                            <span
                                className="text-blue-600 cursor-pointer font-medium"
                                onClick={() => navigate('/checkAppointments')}
                            >
                                Click here to check
                            </span>
                        }
                    />
                    <StatCard icon={<FaCalendarAlt />} title="Appointments Today" value={todaycount} />
                    <StatCard icon={<FaPlusCircle />} title="Total Appointments" value={Count} />
                    <StatCard icon={<FaStar />} title="Total Ratings" value="4" />
                </motion.div>




                {/* Appointment Table */}
                <div className="mt-20">
                    <h2 className="text-3xl font-bold text-blue-900 mb-6 flex items-center gap-2">
                        <FaCalendarCheck className="text-blue-700" />
                        All Appointments
                    </h2>
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="overflow-x-auto rounded-xl shadow-2xl bg-white p-6"
                    >
                        <Table
                            columns={columns}
                            dataSource={AllAppoints}
                            rowKey="_id"
                            pagination={{ pageSize: 4 }}
                            bordered
                        />
                    </motion.div>
                </div>

                        {/* Clinic Overview Section */}
                <div className="mt-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-4xl mx-auto"
                    >
                        <h2 className="text-2xl font-bold text-blue-900 mb-4">Clinic Motto</h2>
                        <p className="text-gray-600">
                            “Compassionate care for your furry family members. We heal with heart.”
                        </p>
                    </motion.div>
                </div>

                {/* Call to Action */}
                {/* <div className="mt-20 text-center">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-yellow-300 p-6 rounded-xl inline-block shadow-md cursor-pointer"
                        onClick={() => navigate('/manageDoctors')}
                    >
                        <div className="flex items-center gap-3 justify-center text-blue-900 font-semibold">
                            <FaUserMd className="text-2xl" />
                            <span>Manage Clinic Staff & Services</span>
                        </div>
                    </motion.div>
                </div> */}

                {/* Testimonial Section */}
                <div className="mt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-blue-50 p-6 rounded-2xl shadow-lg max-w-5xl mx-auto"
                    >
                        <h2 className="text-xl font-bold text-blue-900 mb-4 text-center">What Pet Parents Say</h2>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <div className="bg-white p-4 rounded-xl shadow-md w-full sm:w-1/3">
                                <p className="text-sm text-gray-600 italic">"Such a loving staff! My dog Max was treated like royalty."</p>
                                <p className="mt-2 font-semibold text-blue-900">– Priya R.</p>
                            </div>
                            <div className="bg-white p-4 rounded-xl shadow-md w-full sm:w-1/3">
                                <p className="text-sm text-gray-600 italic">"Quick service and very knowledgeable vet. Highly recommended!"</p>
                                <p className="mt-2 font-semibold text-blue-900">– Arjun M.</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.section>


            <Footer />
        </>
    );
}

export default ClinicHomePage;
