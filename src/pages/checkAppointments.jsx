import { useEffect, useState } from 'react';
import ClinicHeader from '../components/ClinicNav';
import Footer from '../components/Footer';
import { FaCalendarCheck } from 'react-icons/fa';
import { Table } from 'antd';
import { toast } from 'react-toastify';
import { baseURL } from '../../config';
import instance from '../../axios.instance';
import { motion } from 'framer-motion';

function CheckAppointments() {
    const clinicEmail = localStorage.getItem("ClinicEmail");
    const id = localStorage.getItem("ID");

    const [TodayAppointments, setTodayAppointments] = useState([]);
    const [AllAppoints, setAllAppoints] = useState([]);
    const today = new Date().toISOString().split('T')[0];

    useEffect(() => {
        fetchTodayAppointments();
        fetchAllAppointments();
    }, [clinicEmail]);

    const fetchTodayAppointments = async () => {
        try {
            const response = await instance.get(`${baseURL}/api/auth/getAppointmentByDateandclinicEmail`, {
                params: { clinicEmail, date: today },
            });
            setTodayAppointments(response.data.data || []);
        } catch (error) {
            toast.error("Failed to fetch today's appointments.");
        }
    };

    const fetchAllAppointments = async () => {
        try {
            const response = await instance.get(`${baseURL}/api/auth/getAllAppointForClinic`, {
                params: { clinicEmail, id },
            });
            setAllAppoints(response.data.data || []);
        } catch (error) {
            toast.error("Failed to fetch all appointments.");
        }
    };

    const handleAccept = async (appointmentId) => {
        try {
            await instance.patch(`${baseURL}/api/auth/updateAppointmentStatus/${appointmentId}`, {
                status: "Confirmed",
            });
            toast.success("Appointment accepted!");
            fetchTodayAppointments();
            fetchAllAppointments();
        } catch (error) {
            toast.error("Failed to accept appointment.");
        }
    };

    const handleReject = async (appointmentId) => {
        try {
            await instance.patch(`${baseURL}/api/auth/updateAppointmentStatus/${appointmentId}`, {
                status: "Rejected",
            });
            toast.success("Appointment rejected!");
            fetchTodayAppointments();
            fetchAllAppointments();
        } catch (error) {
            toast.error("Failed to reject appointment.");
        }
    };

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
            title: 'Contact Info',
            dataIndex: 'parentContact',
            key: 'parentContact',
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
        // {
        //     title: 'Action',
        //     key: 'action',
        //     render: (_, record) =>
        //         record.appointmentStatus !== 'Confirmed' ? (
        //             <div className="flex gap-2">
        //                 <motion.button
        //                     whileTap={{ scale: 0.95 }}
        //                     whileHover={{ scale: 1.05 }}
        //                     onClick={() => handleAccept(record._id)}
        //                     className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
        //                 >
        //                     Accept
        //                 </motion.button>
        //                 <motion.button
        //                     whileTap={{ scale: 0.95 }}
        //                     whileHover={{ scale: 1.05 }}
        //                     onClick={() => handleReject(record._id)}
        //                     className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
        //                 >
        //                     Reject
        //                 </motion.button>
        //             </div>
        //         ) : (
        //             <span className="text-green-700 font-medium">Accepted</span>
        //         ),
        // },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => {
                if (record.appointmentStatus === 'Confirmed') {
                    return <span className="text-green-700 font-medium">Accepted</span>;
                }
        
                if (record.appointmentStatus === 'Rejected') {
                    // If the appointment is rejected, don't show any buttons
                    return <span className="text-red-700 font-medium">Rejected</span>;
                }
        
                return (
                    <div className="flex gap-2">
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            whileHover={{ scale: 1.05 }}
                            onClick={() => handleAccept(record._id)}
                            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                        >
                            Accept
                        </motion.button>
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            whileHover={{ scale: 1.05 }}
                            onClick={() => handleReject(record._id)}
                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                        >
                            Reject
                        </motion.button>
                    </div>
                );
            },
        }
        
    ];

    return (
        <>
            <ClinicHeader />
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-r from-yellow-100 via-gray-100 to-yellow-200 py-12 min-h-screen px-6 md:px-20"
            >
                <motion.div
                    initial={{ y: -30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-center mb-10"
                >
                    <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-yellow-500 px-5 py-3">
                        Your Scheduled Appointments
                    </h2>
                    <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-950 to-yellow-700 px-5 py-2">
                        Stay updated with your clinic's bookings.
                    </p>
                </motion.div>

                <div className='flex flex-col items-center'>
                    {/* Today's Appointments */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white shadow-2xl p-8 md:p-10 m-5 border-t-2 border-b-2 rounded-4xl border-gray-800 w-full max-w-6xl"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <FaCalendarCheck className="text-3xl text-gray-800" />
                            <h3 className="text-2xl font-bold text-gray-800">
                                Today's Appointments
                            </h3>
                        </div>
                        {TodayAppointments.length > 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="overflow-x-auto rounded-xl shadow-2xl p-6"
                            >
                                <Table
                                    columns={columns}
                                    dataSource={[...(TodayAppointments || [])].reverse()}
                                    rowKey="_id"
                                    pagination={{ pageSize: 4 }}
                                    bordered
                                />
                            </motion.div>
                        ) : (
                            <p className="text-lg font-semibold text-blue-800 mt-4">
                                No appointments scheduled for today.
                            </p>
                        )}
                    </motion.div>

                    {/* All Appointments */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="bg-white shadow-2xl p-8 md:p-10 m-5 border-t-2 border-b-2 rounded-4xl border-gray-800 w-full max-w-6xl"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <FaCalendarCheck className="text-3xl text-gray-800" />
                            <h3 className="text-2xl font-bold text-gray-800">
                                All Appointments
                            </h3>
                        </div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="overflow-x-auto rounded-xl shadow-2xl p-6"
                        >
                            <Table
                                columns={columns}
                                dataSource={[...(AllAppoints || [])].reverse()}
                                rowKey="_id"
                                pagination={{ pageSize: 4 }}
                                bordered
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </motion.section>
            <Footer />
        </>
    );
}

export default CheckAppointments;
