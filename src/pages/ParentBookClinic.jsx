import ParentHeader from '../components/parentNav';
import Footer from '../components/Footer';
import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { DatePicker, Input, Button, Form, Select, notification, InputNumber } from 'antd';
import { motion } from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import axios from 'axios';
import { baseURL } from '../../config';
import { toast } from 'react-toastify';
import instance from '../../axios.instance';

function ParentBookClinic() {
    const location = useLocation();
    const clinic = location.state?.clinic;

    const [message, setmessage] = useState('');

    const onFinish = async (values) => {
        try {
            const response = await instance.post(`${baseURL}/api/auth/addappointment`, values);
            if (response.data.success) {
                toast.success(response.data.message);
            }
            setmessage(`Your appointment with ${clinic?.username} has been booked successfully.`);
        }
        catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    };

    const onFinishFailed = () => {
        notification.error({
            message: 'Booking successful!!',
            description: `Your appointment with ${clinic?.username} is unsuccessful.`,
        });
    }

    return (
        <>
            <ParentHeader />
            <div className='flex flex-col md:flex-row justify-center items-center'>
                <div className="md:w-1/6 w-full flex justify-center py-4">
                    {/* Lottie Animation */}
                    <DotLottieReact
                        src="https://lottie.host/67e73774-661c-4bcd-a7c1-4b7811f7ef24/3z2dHD9pCt.lottie"
                        loop
                        autoplay
                        className='h-50 w-80'
                    />
                </div>

                <div className="md:w-1/2 w-full px-4 md:px-0">
                    <div className="text-center py-10">
                        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-950 to-yellow-700 px-5 py-5 drop-shadow-xl">
                            Book Your Appointment
                        </h2>
                        <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-950 to-yellow-700 drop-shadow-xl m-4 clinic-name">
                            Booking for: {clinic?.username}
                        </h1>
                        <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-950 to-yellow-700 drop-shadow-xl m-4 clinic-type">
                            Clinic Speciality: {clinic?.petSpeciality}
                        </p>
                    </div>

                    <motion.div
                        className="max-w-lg mx-auto p-4 bg-white rounded-xl shadow-xl border-2 border-gray-300 space-y-6 mb-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <Form
                            layout="vertical"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            initialValues={{
                                clinicName: clinic?.username,
                                location: clinic?.location,
                                clinicEmail: clinic?.email,
                                parentName: localStorage.getItem("UserName"),
                                parentEmail: localStorage.getItem("UserEmail"),
                                appointmentTime: "morning",
                            }}
                        >
                            <Form.Item name="clinicName" label="Clinic Name" rules={[{ required: true }]}>
                                <Input
                                    className="rounded-lg border-gray-300 focus:ring-yellow-500"
                                    value={clinic?.username}
                                    readOnly
                                />
                            </Form.Item>

                            <Form.Item name="clinicEmail" label="Clinic Email" rules={[{ required: true }]}>
                                <Input
                                    className="rounded-lg border-gray-300 focus:ring-yellow-500"
                                    value={clinic?.email}
                                    readOnly
                                />
                            </Form.Item>

                            <Form.Item name="location" label="Location" rules={[{ required: true }]}>
                                <Input
                                    className="rounded-lg border-gray-300 focus:ring-yellow-500"
                                    value={clinic?.location}
                                    readOnly
                                />
                            </Form.Item>

                            <Form.Item
                                name="petName"
                                label="Your Pet's Name"
                                rules={[{ required: true, message: "Please Enter the pet Name" }]}
                            >
                                <Input
                                    placeholder="Enter your pet's name"
                                    className="rounded-lg border-gray-300 focus:ring-yellow-500"
                                />
                            </Form.Item>

                            <Form.Item name="parentName" label="Your Name" rules={[{ required: true }]}>
                                <Input
                                    className="rounded-lg border-gray-300 focus:ring-yellow-500"
                                    value={localStorage.getItem("UserName")}
                                    readOnly
                                />
                            </Form.Item>

                            <Form.Item name="parentEmail" label="Your Email" rules={[{ required: true }]}>
                                <Input
                                    className="rounded-lg border-gray-300 focus:ring-yellow-500"
                                    value={localStorage.getItem("UserEmail")}
                                    readOnly
                                />
                            </Form.Item>

                            <Form.Item name="parentContact" label="Your Contact" rules={[{ required: true }]}>
                                <InputNumber
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>

                            <Form.Item name="appointmentDate" label="Appointment Date" rules={[{ required: true }]}>
                                <DatePicker
                                    format="YYYY-MM-DD"
                                    className="w-full rounded-lg border-gray-300 focus:ring-yellow-500"
                                />
                            </Form.Item>

                            <Form.Item
                                name="appointmentTime"
                                label="Preferred Time"
                                rules={[{ required: true, message: 'Please select a preferred time' }]}
                            >
                                <Select className="w-full rounded-lg border-gray-300 focus:ring-yellow-500">
                                    <Select.Option value="morning">Morning</Select.Option>
                                    <Select.Option value="afternoon">Afternoon</Select.Option>
                                    <Select.Option value="evening">Evening</Select.Option>
                                </Select>
                            </Form.Item>

                            <div className="flex justify-center">
                                <Button
                                    htmlType="submit"
                                    className="w-full bg-yellow-500 text-white hover:bg-yellow-600 transition-all rounded-lg py-3"
                                >
                                    Book Now
                                </Button>
                            </div>
                        </Form>
                    </motion.div>
                </div>
            </div>

            {message && (
                <div className="mx-auto max-w-xl my-4 bg-green-100 border border-green-400 text-green-800 px-6 py-4 rounded-lg shadow-md text-center transition-all duration-300">
                    <strong className="block text-lg font-semibold mb-1">Success!</strong>
                    <p>{message}</p>
                </div>
            )}

            <Footer />
        </>
    );
}

export default ParentBookClinic;
