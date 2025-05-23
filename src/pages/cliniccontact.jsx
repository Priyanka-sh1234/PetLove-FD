import React, { useEffect, useState } from 'react';
import ClinicHeader from '../components/ClinicNav.jsx';
import Footer from '../components/Footer.jsx';
import { Form, Button, Input } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import { baseURL } from '../../config.js';
import instance from '../../axios.instance.js';
import { motion } from 'framer-motion';

function ClinicContact() {

    const onFinish = async (values) => {
        try {
            const response = await instance.post(`${baseURL}/api/auth/QueryFromUser`, values);
            toast(response.data.message);
        } catch (error) {
            toast.error(error?.response?.data?.message || "Submission failed.");
        }
    };

    return (
        <>
            <ClinicHeader />
            <motion.main
                className="px-4 py-16 bg-gradient-to-r from-white-100 via-yellow-100 to-white-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <div className="max-w-6xl mx-auto text-center">
                    <motion.h1
                        className="text-5xl font-extrabold text-[#333] mb-6"
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Contact Us
                    </motion.h1>

                    <motion.p
                        className="text-lg text-gray-700 mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        We’d love to hear from you! If you have any questions or need assistance regarding our clinic services,
                        please don’t hesitate to reach out. We are here to help you and your pets!
                    </motion.p>

                    <div className="flex flex-col md:flex-row justify-evenly items-start gap-12">
                        {/* Contact Information Section */}
                        <motion.div
                            className="bg-white p-8 rounded-lg shadow-lg w-full md:w-1/2"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            whileHover={{ scale: 1.03 }}
                        >
                            <h2 className="text-3xl font-semibold text-[#333] mb-6">Contact Information</h2>
                            <p className="text-lg text-gray-700 mb-4">
                                Email: <a href="mailto:PetLovecare@gmail.com" className="text-[#ffcc00] hover:underline">PetLovecare@gmail.com</a>
                            </p>
                            <p className="text-lg text-gray-700 mb-4">
                                Phone: <a href="tel:+1234567890" className="text-[#ffcc00] hover:underline">789 876 5432</a>
                            </p>
                            <p className="text-lg text-gray-700">
                                WhatsApp: <a href="https://wa.me/1234567890" className="text-[#ffcc00] hover:underline">Click Here</a>
                            </p>
                        </motion.div>

                        {/* Contact Form Section */}
                        <motion.div
                            className="bg-white p-8 rounded-lg shadow-lg w-full md:w-1/2"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            whileHover={{ scale: 1.03 }}
                        >
                            <h2 className="text-3xl font-semibold text-[#333] mb-6">Send Us a Message</h2>

                            <Form
                                name="contact-form"
                                layout="vertical"
                                onFinish={onFinish}
                                className="space-y-8"
                                initialValues={{ yourStatus: "Clinic" }}
                            >
                                <Form.Item
                                    label={<span className="text-lg text-[#ffcc00]">Email</span>}
                                    name="email"
                                    rules={[{ required: true, type: 'email', message: 'Please enter a valid email.' }]}
                                >
                                    <Input
                                        placeholder='Enter your email'
                                        className="px-4 py-2 text-lg border-2 border-[#ffcc00] rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffcc00]"
                                    />
                                </Form.Item>

                                <Form.Item
                                    label={<span className="text-lg text-[#ffcc00]">Your Status</span>}
                                    name="yourStatus"
                                    rules={[{ required: true }]}
                                >
                                    <Input
                                        className="px-4 py-2 text-lg border-2 border-[#ffcc00] rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffcc00]"
                                        readOnly
                                    />
                                </Form.Item>

                                <Form.Item
                                    label={<span className="text-lg text-[#ffcc00]">Your Query</span>}
                                    name="enquiry"
                                    rules={[
                                        { required: true, message: 'Please enter your query.' },
                                        { min: 15, message: 'Query must be at least 15 characters.' }
                                    ]}
                                >
                                    <Input
                                        placeholder="Your query goes here"
                                        className="px-4 py-2 text-lg border-2 border-[#ffcc00] rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffcc00]"
                                    />
                                </Form.Item>

                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button
                                        htmlType="submit"
                                        className="w-full py-3 text-lg text-black border-2 border-[#ffcc00] font-semibold rounded-md hover:bg-[#ffcc00] hover:text-white transition duration-300"
                                    >
                                        Send Message
                                    </Button>
                                </motion.div>
                            </Form>
                        </motion.div>
                    </div>
                </div>
            </motion.main>
            <Footer />
            <ToastContainer />
        </>
    );
}

export default ClinicContact;
