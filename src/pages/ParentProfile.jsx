import React, { useEffect, useState } from 'react';
import instance from '../../axios.instance';
import ParentHeader from '../components/parentNav';
import Footer from '../components/Footer';
import { message, Button, Form, Input, Modal } from 'antd';
import { baseURL } from '../../config';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router';


const ParentProfile = () => {

    const navigate = useNavigate();

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchProfile = async () => {
        try {
            const response = await instance.get(`${baseURL}/api/auth/parentProfile`);
            setProfile(response.data.data);
        } catch (error) {
            console.error("Error fetching profile:", error);
            message.error("Failed to load profile data.");
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchProfile();
    }, []);


    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async (values) => {
        try {
            const id = localStorage.getItem("Id");

            const response = await instance.post(
                `${baseURL}/api/auth/UpdateParentProfile?id=${id}`,
                values
            );

            if (response.data.success) {
                toast.success("Kindly log in again with your updated credentials.");
                setTimeout(() => {
                    navigate('/PetOwnerLoginForm')
                }, 3000);
            }
            else {
                toast.error(response.data.message);
            }

        }
        catch (error) {
            // const errorMsg = error.response?.data?.message || "Something went wrong. Please try again.";
            // toast.error(errorMsg);
            console.error("Update error:", error.response || error);
        }

    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    const handleDeleteAccount = async () => {
        const ParentId = localStorage.getItem("ID");
    
        if (!ParentId) {
            toast.error("Parent Id is not available. Please log in again.");
            return;
        }
    
        const confirmDelete = window.confirm("Are you sure you want to delete your account?");
        if (!confirmDelete) return;
    
        try {
            const response = await instance.delete(`/api/auth/ParentDeleteAccount/${ParentId}`);
    
            console.log("Delete response:", response);
            if (response?.data?.success) {
                toast.success(response.data.message, {
                    position: "top-right",
                    autoClose: 2000,
                });
                localStorage.clear();
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            }
        } catch (error) {
            console.error("Delete error:", error);
    
            if (error?.response) {
                toast.error(error.response.data.message || "Failed to delete account", {
                    position: "top-right",
                    autoClose: 3000,
                });
            } else {
                toast.error("An unexpected error occurred while deleting the account", {
                    position: "top-right",
                    autoClose: 3000,
                });
            }
        }
    };
    



    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <ParentHeader />
            <motion.div
                initial={{ opacity: 0.5, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 1.2,
                    type: 'spring',
                    stiffness: 100,
                    damping: 30,
                }}
            >
                <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 mt-10">
                    <div className="text-center mb-8">
                        <h2 className="text-4xl font-extrabold text-blue-900 mb-4">Welcome, {profile?.username}</h2>
                        <p className="text-lg text-gray-500">Here’s a summary of your details and your pet’s details.</p>
                    </div>

                    {/* Parent Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Parent Name</h3>
                            <p className="text-gray-600 text-lg">{profile?.username}</p>
                        </div>

                        <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Parent Email</h3>
                            <p className="text-gray-600 text-lg">{profile?.email}</p>
                        </div>

                        <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Parent Contact</h3>
                            <p className="text-gray-600 text-lg">{profile?.contact}</p>
                        </div>

                    </div>

                    {/* Pet Information */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Pet Name</h3>
                            <p className="text-gray-600 text-lg">{profile?.petName}</p>
                        </div>

                        <div className="bg-gradient-to-r from-orange-100 to-yellow-100 p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Pet Type</h3>
                            <p className="text-gray-600 text-lg">{profile?.petType}</p>
                        </div>

                        <div className="bg-gradient-to-r from-teal-100 to-green-100 p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Breed</h3>
                            <p className="text-gray-600 text-lg">{profile?.breed}</p>
                        </div>
                    </div>

                    {/* Edit Profile Button */}
                    <div className="mt-8 text-center">
                        <button
                            onClick={showModal}
                            className="bg-blue-600 text-white px-8 py-3 rounded-full text-xl font-semibold hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105">
                            Edit Profile
                        </button>

                        <button
                            onClick={handleDeleteAccount}
                            className="ml-6 bg-red-600 text-white px-8 py-3 rounded-full text-xl font-semibold hover:bg-red-700 transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            Delete Account
                        </button>

                        <Modal title="Basic Modal" open={isModalOpen}
                            footer={false}
                            onCancel={handleCancel}>
                            <Form
                                onFinish={handleOk}
                                name="Edit Profile"
                                layout="vertical"
                                initialValues={{
                                    username: profile?.username,
                                    email: profile?.email,
                                    petName: profile?.petName,
                                    petType: profile?.petType,
                                    breed: profile?.breed,
                                }}
                            >
                                <Form.Item
                                    label="Name"
                                    name="username"
                                    rules={[{ required: true, message: 'Please enter your name' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[
                                        { required: true, message: 'Please enter your email' },
                                        { type: 'email', message: 'Please enter a valid email address' },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Contact"
                                    name="contact"
                                    rules={[{ required: true, message: 'Please enter your contact number' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Pet Name"
                                    name="petName"
                                    rules={[{ required: true, message: 'Please enter your pet’s name' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Pet Type"
                                    name="petType"
                                    rules={[{ required: true, message: 'Please enter your pet’s type' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Breed"
                                    name="breed"
                                    rules={[{ required: true, message: 'Please enter your pet’s breed' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Button
                                    htmlType="submit"
                                    className="bg-blue-600 text-white px-8 py-3 rounded-full text-xl font-semibold hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
                                >
                                    Update Profile
                                </Button>
                            </Form>

                        </Modal>
                    </div>
                </div>
            </motion.div>
            <Footer />
            <ToastContainer
                position="top-right"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={true}
                pauseOnHover
                draggable
                theme="colored"
            />
        </>
    );
};

export default ParentProfile;



