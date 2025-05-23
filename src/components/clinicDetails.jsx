import React, { useState } from 'react';
import { Form, Input, Button, Modal, message, Checkbox } from 'antd';
import { baseURL } from '../../config';
import instance from '../../axios.instance';
import { toast } from 'react-toastify';

const ClinicDetailsForm = ({ clinicId, setClinicDetails,clinicEmail  }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);


    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    const onFinish = async (values) => {

        const clinicEmail= localStorage.getItem("ClinicEmail")
        setLoading(true);

        try {

            const response = await instance.post(`${baseURL}/api/auth/addClinicMoreDetails`, {
                clinicId,
                clinicEmail ,
                ...values,
            });

            if (response.data.success) {
                toast.success('Clinic details updated successfully!');
                setClinicDetails(response.data.details); 
                setIsModalOpen(false);
            } else {
                toast.error('Failed to update clinic details');
            }
        } catch (error) {
            toast.error('Error saving details. Please try again.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='m-5 flex flex-col flex-wrap justify-center items-center'>
            <button
                onClick={showModal}
                className="bg-blue-600 text-white px-8 py-3 rounded-full text-xl font-semibold hover:bg-blue-500 transition duration-300 ease-in-out transform hover:-translate-y-1">
                Add/Edit Clinic Details
            </button>
            <Modal
                title="Add/Update Clinic Details"
                visible={isModalOpen}
                onCancel={handleCancel}
                footer={null}
                width={600}
            >
                <Form
                    name="clinicDetails"
                    onFinish={onFinish}
                    layout="vertical"
                >
                    
                    <Form.Item
                        label="Open Timings"
                        name="openTime"
                        rules={[{ required: true, message: 'Please enter clinic open timings' }]}
                    >
                        <Input placeholder="e.g., 9:00 AM - 6:00 PM" />
                    </Form.Item>

                    <Form.Item
                        label="Closed Timings"
                        name="closeTime"
                        rules={[{ required: true, message: 'Please enter clinic closed timings' }]}
                    >
                        <Input placeholder="e.g., Closed on Sundays" />
                    </Form.Item>

                    <Form.Item
                        label="About Clinic"
                        name="about"
                        rules={[{ required: true, message: 'Please provide information about your clinic' }]}
                    >
                        <Input.TextArea rows={4} placeholder="Tell us more about your clinic" />
                    </Form.Item>

                    <Form.Item
                        label="Services Offered"
                        name="services"
                    >
                        <Input.TextArea rows={4} placeholder="List the services your clinic offers" />
                    </Form.Item>

                    <Form.Item
                        label="Emergency Contact Info"
                        name="contactNumber"
                    >
                        <Input placeholder="Emergency contact details" />
                    </Form.Item>

                    <Form.Item
                        label="Emergency Available"
                        name="emergencyAvailable"
                        valuePropName="checked"
                    >
                        <Checkbox>Available</Checkbox>
                    </Form.Item>

                    <Form.Item
                        label="Additional Notes"
                        name="additionalNotes"
                    >
                        <Input.TextArea rows={4} placeholder="Any additional information?" />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                        >
                            Save Details
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ClinicDetailsForm;
