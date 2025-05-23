import React, { useState } from 'react';
import Header from '../components/header';
import { Form, Input, Button, Select, Upload, notification } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';

const { Option } = Select;

function AddClinic() {
    const [image, setImage] = useState(null);
    const [location, setLocation] = useState('');
    const [clinicType, setClinicType] = useState('');

    const handleImageUpload = (file) => {
        setImage(file);
        return false; // Prevent auto upload behavior
    };

    const onFinish = () => {
        if (!image || !location || !clinicType) {
            notification.error({
                message: 'Form Error',
                description: 'Please fill in all the fields before submitting.',
            });
        } else {
            notification.success({
                message: 'Profile Updated',
                description: `Your profile has been updated successfully with image, location, and clinic type.`,
            });

            console.log('Image:', image);
            console.log('Location:', location);
            console.log('Clinic Type:', clinicType);
        }
    };

    return (
        <>
            <Header />
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, type: 'spring', stiffness: 100 }}
            >
                <div className="min-h-auto bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 flex justify-center items-center p-10">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-5">User Profile Form</h2>
                        <Form onFinish={onFinish} layout="vertical">
                            {/* Image Upload */}
                            <Form.Item label="Upload Profile Image" required>
                                <Upload
                                    beforeUpload={handleImageUpload}
                                    listType="picture"
                                    accept="image/*"
                                    showUploadList={false}
                                >
                                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                </Upload>
                            </Form.Item>

                            {/* Location */}
                            <Form.Item label="Location" required>
                                <Input
                                    placeholder="Enter your location"
                                    onChange={(e) => setLocation(e.target.value)}
                                    value={location}
                                    className="rounded-lg border-gray-300 focus:ring-yellow-500"
                                />
                            </Form.Item>

                            {/* Clinic Type */}
                            <Form.Item label="Select Clinic Type" required>
                                <Select
                                    value={clinicType}
                                    onChange={(value) => setClinicType(value)}
                                    placeholder="Select clinic type"
                                    className="w-full rounded-lg border-gray-300 focus:ring-yellow-500"
                                >
                                    <Option value="veterinary">Veterinary</Option>
                                    <Option value="dental">Dental</Option>
                                    <Option value="ophthalmology">Ophthalmology</Option>
                                    <Option value="general">General</Option>
                                </Select>
                            </Form.Item>

                            {/* Submit Button */}
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="w-full bg-yellow-500 text-white rounded-md py-3 hover:bg-yellow-400 transition-all"
                                >
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </motion.div>
            <Footer />
        </>
    );
}

export default AddClinic;
