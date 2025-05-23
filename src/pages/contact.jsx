import React from 'react';
import Header from '../components/header.jsx';
import Footer from '../components/Footer.jsx';
import { Form, Button, Input, Select } from 'antd';
import axios from 'axios';
import { baseURL } from '../../config.js';
import { toast, ToastContainer } from 'react-toastify';
import { motion } from 'framer-motion';

function Contact() {

    const onFinish = async (values) => {
        try {
            const response = await axios.post(`${baseURL}/api/auth/QueryFromcontactPage`, values);
            toast.success(response.data.message);
        } catch (error) {
            toast.error('Something went wrong. Please try again.');
        }
    };

    return (
        <>
            <Header />
            <main className="px-4 py-16 bg-gradient-to-r from-white via-yellow-100 to-white">
                <div className="max-w-6xl mx-auto text-center">
                    <motion.h1
                        className="text-5xl font-extrabold text-[#333] mb-6"
                        initial={{ opacity: 0, y: -40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        Contact Us
                    </motion.h1>

                    <motion.p
                        className="text-lg text-gray-700 mb-12"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        We’d love to hear from you! If you have any questions or need assistance regarding our clinic services,
                        please don’t hesitate to reach out. We are here to help you and your pets!
                    </motion.p>

                    <div className="flex flex-col md:flex-row justify-evenly items-start gap-12">
                        {/* Contact Information */}
                        <motion.div
                            className="bg-white p-8 rounded-lg shadow-lg w-full md:w-1/2 border border-yellow-200"
                            whileHover={{ scale: 1.03 }}
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
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

                        {/* Contact Form */}
                        <motion.div
                            className="bg-white p-8 rounded-lg shadow-lg w-full md:w-1/2 border border-yellow-200"
                            whileHover={{ scale: 1.03 }}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-3xl font-semibold text-[#333] mb-6">Send Us a Message</h2>
                            <Form
                                name="contact-form"
                                layout="vertical"
                                onFinish={onFinish}
                                className="space-y-6"
                            >
                                <Form.Item
                                    label={<span className="text-lg text-[#ffcc00]">Email</span>}
                                    name="email"
                                    rules={[{ required: true, type: 'email', message: 'Please enter a valid email.' }]}
                                >
                                    <Input
                                        placeholder="email@example.com"
                                        className="px-4 py-2 text-lg border-2 border-[#ffcc00] rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffcc00]"
                                    />
                                </Form.Item>

                                <Form.Item
                                    label={<span className="text-lg text-[#ffcc00]">Your Status</span>}
                                    name="yourStatus"
                                    rules={[{ required: true }]}
                                >
                                    <Select>
                                        <Select.Option value="Pet Parent">Pet Parent</Select.Option>
                                        <Select.Option value="Clinic">Clinic</Select.Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    label={<span className="text-lg text-[#ffcc00]">Your Query</span>}
                                    name="enquiry"
                                    rules={[{ required: true, message: 'Please enter your query.' }]}
                                >
                                    <Input
                                        placeholder="Your query goes here"
                                        className="px-4 py-2 text-lg border-2 border-[#ffcc00] rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffcc00]"
                                    />
                                </Form.Item>

                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
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
            </main>
            <Footer />
            <ToastContainer />
        </>
    );
}

export default Contact;
