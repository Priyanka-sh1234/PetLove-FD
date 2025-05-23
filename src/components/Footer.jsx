import React from 'react';
import { Form, Input, Select } from 'antd';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import axios from 'axios';
import { baseURL } from '../../config';
import { toast, ToastContainer } from 'react-toastify';

const Footer = () => {
  const onFinish = async (values) => {
    try {
      await axios.post(`${baseURL}/api/auth/feedback`, values);
      toast.success('Thank you for your feedback!');
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <footer className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white pt-12 pb-6">
        <div className="max-w-screen-xl mx-auto px-6">
          {/* Top Section */}
          <div className="flex flex-col md:flex-row justify-between gap-12">
            
            {/* Social Links */}
            <div className="md:w-1/3">
              <h4 className="text-3xl font-bold mb-6 text-yellow-400">Follow Us</h4>
              <div className="flex space-x-6">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                  <FaFacebook size={30} className="hover:text-yellow-300 transition duration-300" />
                </a>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                  <FaTwitter size={30} className="hover:text-yellow-300 transition duration-300" />
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                  <FaInstagram size={30} className="hover:text-yellow-300 transition duration-300" />
                </a>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin size={30} className="hover:text-yellow-300 transition duration-300" />
                </a>
              </div>
            </div>

            {/* Contact Info */}
            <div className="md:w-1/3">
              <h4 className="text-3xl font-bold mb-6 text-yellow-400">Contact Us</h4>
              <p className="font-medium text-lg">📞 Phone:</p>
              <p className="mb-4">789 876 5432<br />898 287 4683</p>
              <p className="font-medium text-lg">📧 Email:</p>
              <p>
                <a href="mailto:PetLove@gmail.com" className="hover:text-yellow-300 block">PetLove@gmail.com</a>
                <a href="mailto:PetLoveCare@gmail.com" className="hover:text-yellow-300 block">PetLoveCare@gmail.com</a>
              </p>
            </div>

            {/* Feedback Form */}
            <div className="md:w-1/3">
              <h4 className="text-3xl font-bold mb-6 text-yellow-400">Leave Feedback</h4>
              <Form
                name="feedbackForm"
                onFinish={onFinish}
                layout="vertical"
                className="space-y-4"
              >
                <Form.Item
                  name="username"
                  label={<span className="text-white">Name</span>}
                  rules={[{ required: true, message: 'Please enter your name' }]}
                >
                  <Input placeholder="Your name" />
                </Form.Item>

                <Form.Item
                  name="email"
                  label={<span className="text-white">Email</span>}
                  rules={[{ required: true, message: 'Please enter your email' }]}
                >
                  <Input placeholder="Your email" />
                </Form.Item>

                <Form.Item
                  name="feedbackAs"
                  label={<span className="text-white">You are a</span>}
                  rules={[{ required: true, message: 'Please select one' }]}
                >
                  <Select placeholder="Select type">
                    <Select.Option value="Pet Parent">Pet Parent</Select.Option>
                    <Select.Option value="Clinic">Clinic</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="feedback"
                  label={<span className="text-white">Feedback</span>}
                  rules={[
                    { required: true, message: 'Please write your feedback' },
                    { min: 15, message: 'Feedback must be at least 15 characters' }
                  ]}
                >
                  <Input.TextArea placeholder="Write your feedback..." rows={3} />
                </Form.Item>

                <Form.Item className="text-center">
                  <button
                    type="submit"
                    className="w-full bg-yellow-500 text-white font-bold py-2 rounded-lg transition duration-300 hover:bg-sky-500 hover:shadow-lg"
                  >
                    Submit Feedback
                  </button>
                </Form.Item>
              </Form>
            </div>
          </div>

          {/* Bottom */}
          <div className="text-center mt-12 border-t border-gray-600 pt-4">
            <p className="text-gray-300 text-sm">
              &copy; {new Date().getFullYear()} All Rights Reserved | Built with ❤️ by <span className="text-yellow-400 hover:text-blue-400">PetLove</span>
            </p>
          </div>
        </div>
      </footer>

      <ToastContainer />
    </>
  );
};

export default Footer;
