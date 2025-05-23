import ClinicHeader from '../components/ClinicNav';
import Footer from '../components/Footer';
import { Button, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { FaCalendarCheck } from 'react-icons/fa';
import { baseURL } from '../../config';
import { toast, ToastContainer } from 'react-toastify';
import { Form, Input, Table } from 'antd';
import instance from '../../axios.instance';
import { motion, AnimatePresence } from 'framer-motion';

const { TextArea } = Input;

const AddReports = () => {
    const clinicEmail = localStorage.getItem("ClinicEmail");
    const clinicName = localStorage.getItem("ClinicName");
    const [AllAppoints, setAllAppoints] = useState("");
    const [loadingAppointments, setLoadingAppointments] = useState(true);
    const [file, setFile] = useState(null);
    const [form] = Form.useForm();
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const showModal = (record) => {
        setSelectedAppointment(record);
        setIsModalOpen(true);

        setTimeout(() => {
            form.setFieldsValue({
                parentName: record.parentName,
                parentEmail: record.parentEmail,
                date: new Date(record.appointmentDate).toLocaleDateString(),
                Timings: record.appointmentTime,
                reportText: '',
            });
        }, 0);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const getAllAppointForClinic = async () => {
        try {
            const response = await instance.get(`${baseURL}/api/auth/getAllAppointForClinic`, {
                params: { clinicEmail }
            });
            setAllAppoints(response?.data?.data);
            setLoadingAppointments(false);
        } catch (error) {
            console.error("Error fetching appointments:", error);
            toast.error("Failed to fetch appointments");
            setLoadingAppointments(false);
        }
    };

    useEffect(() => {
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
                <span
                    className={`font-semibold ${status === 'Confirmed'
                        ? 'text-green-600'
                        : status === 'Pending'
                            ? 'text-yellow-600'
                            : 'text-red-600'
                        }`}
                >
                    {status}
                </span>
            ),
        },
        // {
        //     title: 'Actions',
        //     key: 'actions',
        //     render: (_, record) => (
        //         <button
        //             className={`font-semibold ${record.appointmentStatus === 'Rejected' ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:underline'}`}
        //             onClick={() => {
        //                 if (record.appointmentStatus !== 'Rejected') {
        //                     showModal(record);
        //                 }
        //             }}
        //             disabled={record.appointmentStatus === 'Rejected'}
        //         >
        //             Add Report
        //         </button>
        //     ),
        // }
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <button
                    className={`font-semibold ${record.appointmentStatus === 'Confirmed' ? 'text-blue-600 hover:underline' : 'text-gray-400 cursor-not-allowed'}`}
                    onClick={() => {
                        if (record.appointmentStatus === 'Confirmed') {
                            showModal(record);  // Open the modal to add a report
                        }
                    }}
                    disabled={record.appointmentStatus !== 'Confirmed'}  // Disable button if status is not 'Confirmed'
                >
                    Add Report
                </button>
            ),
        }
        
    ];

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('parentName', values.parentName);
            formData.append('parentEmail', values.parentEmail);
            formData.append('date', values.date);
            formData.append('Timings', values.Timings);
            formData.append('reportText', values.reportText);
            formData.append('clinicName', clinicName);
            formData.append('clinicEmail', clinicEmail);
            if (file) formData.append('reportFile', file);

            const response = await instance.post(`${baseURL}/api/auth/AddReportsByClinic`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            toast.success(response.data.message);
            setIsModalOpen(false);
            getAllAppointForClinic();
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to submit report");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <ClinicHeader />
            <motion.div
                className='py-10 bg-gradient-to-r from-yellow-100 via-gray-100 to-yellow-200 flex flex-col justify-center items-center'
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <motion.h2
                    className="text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-gray-950 to-yellow-700 px-5 py-5 drop-shadow-xl"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    Add Reports
                </motion.h2>

                <motion.div
                    className="p-6 bg-white shadow-2xl rounded-xl md:p-10 transition-all duration-300 m-5 w-full max-w-5xl"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <div className="flex flex-wrap items-center gap-3 mb-5">
                        <FaCalendarCheck className="text-3xl text-gray-800" />
                        <h3 className="text-2xl font-bold text-gray-800">
                            Manage Appointments
                        </h3>
                    </div>

                    {loadingAppointments ? (
                        <div>Loading appointments...</div>
                    ) : (
                        <Table
                            columns={columns}
                            dataSource={[...(AllAppoints || [])].reverse()}
                            rowKey="_id"
                            pagination={{ pageSize: 4 }}
                            components={{
                                body: {
                                    row: ({ children, ...restProps }) => (
                                        <motion.tr
                                            {...restProps}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {children}
                                        </motion.tr>
                                    )
                                }
                            }}
                        />
                    )}

                    <Modal
                        className='overflow-x-auto'
                        title={`Add Report for ${selectedAppointment?.petName || ''}`}
                        open={isModalOpen}
                        onCancel={handleCancel}
                        footer={false}
                    >
                        <motion.div
                            className="space-y-4"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <p><strong>Clinic Name:</strong> {clinicName}</p>
                            <p><strong>Clinic Email:</strong> {clinicEmail}</p>
                            <Form
                                form={form}
                                layout='vertical'
                                onFinish={onFinish}
                            >
                                <Form.Item
                                    label="Parent Name"
                                    name="parentName"
                                    rules={[{ required: true }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Parent Email"
                                    name="parentEmail"
                                    rules={[{ required: true }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Date"
                                    name="date"
                                    rules={[{ required: true }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Timings"
                                    name="Timings"
                                    rules={[{ required: true }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Add Report"
                                    name="reportText"
                                    rules={[{ required: true }]}
                                >
                                    <TextArea rows={4} placeholder={`Add a report for ${selectedAppointment?.petName}`} />
                                </Form.Item>

                                <Form.Item
                                    label="Upload Report File (PDF/Image)"
                                    name="reportFile"
                                >
                                    <Input type="file" onChange={(e) => setFile(e.target.files[0])} />
                                </Form.Item>

                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button
                                        htmlType="submit"
                                        loading={loading}
                                        disabled={loading}
                                    >
                                        Submit Report
                                    </Button>
                                </motion.div>
                            </Form>
                        </motion.div>
                    </Modal>
                </motion.div>
            </motion.div>
            <Footer />
            <ToastContainer />
        </>
    );
};

export default AddReports;
