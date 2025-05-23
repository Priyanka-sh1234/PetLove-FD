import React from 'react';
import ParentHeader from '../components/parentNav.jsx';
import Footer from '../components/Footer.jsx';
import { toast, ToastContainer } from 'react-toastify';
import { Form, Button, Input } from 'antd';
import instance from '../../axios.instance.js';
import { baseURL } from '../../config.js';
import { motion } from 'framer-motion';

function ParentContact() {
    const onFinish = async (values) => {
        try {
            await instance.post(`${baseURL}/api/auth/QueryFromUser`, values)
                .then((res) => {
                    toast.success(res.data.message);
                });
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        }
    };

    return (
        <>
            <ParentHeader />

            <motion.main
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="px-4 py-16 bg-gradient-to-r from-white-100 via-yellow-100 to-white-100"
            >
                <div className="max-w-6xl mx-auto text-center">
                    <motion.h1
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="text-5xl font-extrabold text-[#333] mb-6"
                    >
                        Contact Us
                    </motion.h1>
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="text-lg text-gray-700 mb-12"
                    >
                        We’d love to hear from you! If you have any questions or need assistance regarding our clinic services,
                        please don’t hesitate to reach out. We are here to help you and your pets!
                    </motion.p>

                    <div className="flex flex-col md:flex-row justify-evenly items-start gap-12">
                        {/* Contact Information Section */}
                        <motion.div
                            initial={{ x: -100, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-lg shadow-lg w-full md:w-1/2 transform transition-all hover:scale-105 duration-300"
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
                            initial={{ x: 100, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-lg shadow-lg w-full md:w-1/2 transform transition-all hover:scale-105 duration-300"
                        >
                            <h2 className="text-3xl font-semibold text-[#333] mb-6">Send Us a Message</h2>

                            <Form
                                name="contact-form"
                                layout="vertical"
                                onFinish={onFinish}
                                className="space-y-8"
                                initialValues={{ yourStatus: "Parent" }}
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
                                        readOnly
                                        defaultValue={"Parent"}
                                        className="px-4 py-2 text-lg border-2 border-[#ffcc00] rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffcc00]"
                                    />
                                </Form.Item>

                                <Form.Item
                                    label={<span className="text-lg text-[#ffcc00]">Your Query</span>}
                                    name="enquiry"
                                    rules={[
                                        { required: true, message: 'Please enter your query.' },
                                        { min: 15, message: 'Query should be at least 15 characters.' }
                                    ]}
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
            </motion.main>

            <Footer />
            <ToastContainer />
        </>
    );
}

export default ParentContact;
