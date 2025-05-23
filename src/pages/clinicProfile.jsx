import React, { useEffect, useState } from 'react';
import instance from '../../axios.instance';
import ClinicHeader from '../components/ClinicNav';
import ClinicDetailsForm from '../components/clinicDetails';
import Footer from '../components/Footer';
import { message } from 'antd';
import { motion } from 'framer-motion';
import { baseURL } from '../../config';
import { Form, Modal, Button, Input, Avatar } from 'antd';
import {
    MailOutlined,
    EnvironmentOutlined,
    CameraOutlined,
    HeartOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const ClinicProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [clinicDetails, setClinicDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const clinicId = localStorage.getItem('Id');

    useEffect(() => {
        const fetchClinicDetails = async () => {
            try {
                const response = await instance.get(
                    `${baseURL}/api/auth/getClinicDetails/${clinicId}`
                );
                setClinicDetails(response.data.details);
            } catch (error) {
                console.error('Error fetching clinic details:', error);
                toast.error('Error fetching clinic details.');
            } finally {
                setLoading(false);
            }
        };

        if (clinicId) {
            fetchClinicDetails();
        }
    }, [clinicId]);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await instance.get(`${baseURL}/api/auth/ClinicProfile`);
                setProfile(response.data.data);
            } catch (error) {
                console.error('Error fetching profile:', error);
                message.error('Failed to load profile data.');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const showModal = () => setIsModalOpen(true);
    const handleCancel = () => setIsModalOpen(false);

    const handleOk = async (values) => {
        try {
            const response = await instance.post(
                `${baseURL}/api/auth/UpdateClinicProfile?id=${clinicId}`,
                values
            );

            if (response.data.success) {
                toast.success('Kindly log in again with your updated credentials.');
                setTimeout(() => navigate('/ClinicLoginForm'), 3000);
            } else {
                toast.error(response.data.message || 'Update failed.');
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Something went wrong.';
            toast.error(errorMsg);
        }
        setIsModalOpen(false);
    };

    const handleDeleteAccount = async () => {
        if (!clinicId) {
            toast.error('Clinic ID is not available. Please log in again.');
            return;
        }

        if (!window.confirm('Are you sure you want to delete your account?')) return;

        try {
            const response = await axios.delete(
                `${baseURL}/api/auth/ClinicDeleteAccount/${clinicId}`
            );

            if (response?.data?.success) {
                toast.success(response.data.message);
                localStorage.clear();
                setTimeout(() => navigate('/'), 2000);
            }
        } catch (error) {
            const errMsg = error.response?.data?.message || 'Failed to delete account';
            toast.error(errMsg);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <>
            <ClinicHeader />
            <motion.div
                initial={{ opacity: 0.5, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, type: 'spring', stiffness: 100, damping: 30 }}
            >
                <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8 mt-10">
                    {/* Section 1: Basic Profile Info */}
                    <section className="mb-12">
                        <div className="text-center mb-8">
                            <h2 className="text-4xl font-extrabold text-gray-800 mb-2">
                                Welcome, {profile?.username}
                            </h2>
                            <p className="text-lg text-gray-500">
                                Here’s a summary of your profile details.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="bg-blue-100 p-6 rounded-lg shadow hover:shadow-md">
                                <h3 className="text-xl font-semibold mb-1">Clinic Name</h3>
                                <p>{profile?.username}</p>
                            </div>

                            <div className="bg-yellow-100 p-6 rounded-lg shadow hover:shadow-md">
                                <h3 className="text-xl font-semibold mb-1">Clinic Email</h3>
                                <p>{profile?.email}</p>
                            </div>

                            <div className="bg-green-100 p-6 rounded-lg shadow hover:shadow-md flex flex-col items-center">
                                <h3 className="text-xl font-semibold mb-1">Clinic Photo</h3>
                                <img
                                    src={profile?.clinicImage}
                                    alt="Clinic"
                                    className="w-24 h-24 object-cover rounded-full mt-2"
                                />
                            </div>

                            <div className="bg-indigo-100 p-6 rounded-lg shadow hover:shadow-md">
                                <h3 className="text-xl font-semibold mb-1">Pet Speciality</h3>
                                <p>{profile?.petSpeciality}</p>
                            </div>

                            <div className="bg-orange-100 p-6 rounded-lg shadow hover:shadow-md">
                                <h3 className="text-xl font-semibold mb-1">Location</h3>
                                <p>{profile?.location}</p>
                            </div>
                        </div>

                        <div className="mt-10 text-center space-x-4">
                            <Button onClick={showModal}
                                variant='solid'
                                color='blue'
                                className="bg-blue-600 text-white px-6 py-2 rounded">
                                Edit Profile
                            </Button>
                            <Button
                                variant='solid'
                                color='red'
                                onClick={handleDeleteAccount}
                                className="bg-red-500 text-white px-6 py-2 rounded"
                            >
                                Delete Account
                            </Button>
                        </div>
                    </section>

                    {/* Section 2: Additional Clinic Details */}
                    <section className="mb-12">
                        <h3 className="text-2xl font-bold text-center mb-6">Additional Clinic Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Detail label="Open Timings" value={clinicDetails?.openTime} />
                            <Detail label="Close Timings" value={clinicDetails?.closeTime} />
                            <Detail label="About Clinic" value={clinicDetails?.about} />
                            <Detail
                                label="Services Offered"
                                value={clinicDetails?.services?.join(', ') || 'N/A'}
                            />
                            <Detail
                                label="Emergency Available"
                                value={clinicDetails?.emergencyAvailable ? 'Yes' : 'No'}
                            />
                            <Detail label="Contact Number" value={clinicDetails?.contactNumber} />
                            <Detail label="Additional Notes" value={clinicDetails?.additionalNotes} />
                        </div>
                    </section>

                    {/* Section 3: Edit Clinic Details */}
                    <section className="mt-8">
                        <ClinicDetailsForm clinicId={clinicId} setClinicDetails={setClinicDetails} />
                    </section>
                </div>
            </motion.div>

            {/* Modal for profile update */}
            <Modal
                title={<h2 className="text-2xl font-bold text-blue-700">Update Clinic Profile</h2>}
                open={isModalOpen}
                footer={null}
                onCancel={handleCancel}
            >
                <Form
                    onFinish={handleOk}
                    layout="vertical"
                    initialValues={{
                        username: profile?.username,
                        email: profile?.email,
                        image: profile?.clinicImage,
                        petSpeciality: profile?.petSpeciality,
                        location: profile?.location,
                    }}
                >
                    <Form.Item
                        label={<span className="flex items-center gap-2"><CameraOutlined />Clinic Image URL</span>}
                        name="image"
                        rules={[{ required: true, message: 'Please provide an image URL' }]}
                    >
                        <Input placeholder="https://example.com/image.jpg" />
                    </Form.Item>

                    <div className="flex justify-center mb-4">
                        <Avatar size={96} src={profile?.clinicImage} className="border-2 border-blue-400" />
                    </div>

                    <Form.Item
                        label={<span className="flex items-center gap-2"><MailOutlined />Clinic Email</span>}
                        name="email"
                        rules={[{ required: true, type: 'email', message: 'Enter a valid email' }]}
                    >
                        <Input placeholder="clinic@email.com" />
                    </Form.Item>

                    <Form.Item
                        label={<span className="flex items-center gap-2"><HeartOutlined />Pet Speciality</span>}
                        name="petSpeciality"
                        rules={[{ required: true, message: 'Enter your pet speciality' }]}
                    >
                        <Input placeholder="e.g., Dogs, Cats, Birds" />
                    </Form.Item>

                    <Form.Item
                        label={<span className="flex items-center gap-2"><EnvironmentOutlined />Clinic Location</span>}
                        name="location"
                        rules={[{ required: true, message: 'Enter your location' }]}
                    >
                        <Input placeholder="e.g., Downtown" />
                    </Form.Item>

                    <Form.Item className="text-center mt-6">
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="bg-blue-600 text-white px-8 py-2 rounded hover:bg-blue-700"
                        >
                            Save Changes
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            <Footer />
            <ToastContainer />
        </>
    );
};

const Detail = ({ label, value }) => (
    <div className="bg-gray-100 p-4 rounded-lg shadow">
        <p className="text-gray-700">
            <strong>{label}:</strong> <span className="ml-1 text-gray-800">{value || 'N/A'}</span>
        </p>
    </div>
);

export default ClinicProfilePage;
