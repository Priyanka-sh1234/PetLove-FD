import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, Row, Col, message, Modal} from 'antd';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import { toast, ToastContainer, Zoom } from "react-toastify";
import Header from '../components/header';
import Footer from '../components/Footer';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { useGoogleLogin } from '@react-oauth/google';
import { motion } from 'framer-motion';
import { baseURL } from '../../config';
import instance from '../../axios.instance';

function PetOwnerLoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Loading states
  const [isSendingOTP, setIsSendingOTP] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  // Modal control
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSendOTP = async () => {
    if (!email) {
      toast.error("Please enter your email first", { position: "top-right" });
      return;
    }
    setIsSendingOTP(true);
    try {
      const res = await axios.post(`${baseURL}/api/auth/send-Parent-otp`, { email });
      if (res.data.success !== false) {
        toast.success('OTP sent to your email!', { position: 'top-right' });
        setOtpSent(true);
      } else {
        toast.error(res.data.message, { position: 'top-right' });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error sending OTP', { position: 'top-right' });
    } finally {
      setIsSendingOTP(false);
    }
  };

  const handleResetPassword = async () => {
    if (!otp || !newPassword) {
      toast.error("Please enter OTP and new password", { position: "top-right" });
      return;
    }
    setIsResetting(true);
    try {
      const res = await axios.post(`${baseURL}/api/auth/reset-Parent-password`, {
        email,
        otp,
        newPassword,
      });

      if (res.data.success) {
        toast.success('Password reset successful!', { position: 'top-right' });
        handleModalClose();
      } else {
        toast.error(res.data.message, { position: 'top-right' });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error resetting password', { position: 'top-right' });
    } finally {
      setIsResetting(false);
    }
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setOtpSent(false);
    setEmail('');
    setOtp('');
    setNewPassword('');
  };

  const onFinish = async (values) => {
    try {

      const response = await axios.post(`${baseURL}/api/auth/PetOwnersLogin`, values);

      if (response.data.success) {
        localStorage.setItem("Token", response.data.data.token);
        localStorage.setItem("UserEmail", response.data.data.email);
        localStorage.setItem("UserName", response.data.data.username);
        localStorage.setItem("Id", response.data.data.Id)

        setTimeout(() => {
          toast.success('Login Successful!!', {
            position: "top-center",
            autoClose: 2000,
            theme: "light",
            transition: Zoom,
          });
        }, 200)

        setTimeout(() => {
          navigate('/ParentHomePage');
        }, 2000);
      }


      else {
        toast.error(response.data.message, { position: "top-right" });
      }
    }

    catch (error) {
      message.error('Login Error: ' + error.response.data.message);
      toast.error(error.response?.data?.message || "Something went wrong. Please try again.", { position: "top-right" });
    }

  };

  const onFinishFailed = (errorInfo) => {
    console.log('Form Submission Failed:', errorInfo);
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  const handleRegister = () => {
    navigate('/Parentregister');
    setTimeout(() => {
      toast("Welcome to Register Page", {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
        transition: Zoom,
      });
    }, 700);
  };


  const responseGoogle = async (authResult) => {
    console.log("yeh tha code frontend sa", authResult);

    try {
      if (authResult.code) {

        await axios.post(`${baseURL}/api/auth/parentGoogleLogin?code=${authResult.code}`)

          .then((res) => {
            console.log("yeh ha res from backend", res);
            const { email, name, image } = res.data.user;
            const token = res.data.token;
            const obj = { email, name, token, image };
            localStorage.setItem("user-info", JSON.stringify(obj));
            localStorage.setItem("Token", token);
            localStorage.setItem("UserEmail", email);
            localStorage.setItem("UserName", name);
            setTimeout(() => {
              toast('Login Successful!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Zoom,
              });
            }, 200);

          })


          // const { email, username, token } = res.data;

          // localStorage.setItem("Token", token);
          // localStorage.setItem("UserEmail", email);
          // localStorage.setItem("UserName", username);

          // toast.success('Login Successful via Google! Redirecting...', {
          //   position: "top-center",
          //   autoClose: 2000,
          //   theme: "light",
          //   transition: Zoom,
          // });

          // navigate('/ParentHomePage'); 

          .catch((err) => {
            console.log("yeh ha err", err);
            setTimeout(() => {
              toast('Login Unsuccessful', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Zoom,
              });
            }, 200);


            setTimeout(() => {
              navigate('/petOwnerLoginForm');
            }, 4000);
          });

      }

      else {
        console.log(authResult);
        throw new Error(authResult);
      }
    }

    catch (e) {
      console.log("Error while Google Login...", e);
      setTimeout(() => {
        toast('Login Unsuccessful', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Zoom,
        });
      }, 200);


      setTimeout(() => {
        navigate('/ParentHomePage');
      }, 4000);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });


  return (
    <>
      <Header />
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
        <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 flex items-center justify-center">
          <div className="flex w-full max-w-screen-xl">

            {/* Left side: Image Section with Motion */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.2 }}
              className="hidden md:flex md:w-1/2 items-center justify-center p-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 w-full">
                {/* Row 1 */}
                <div>
                  <img
                    src="https://hips.hearstapps.com/hmg-prod/images/low-maintenance-pets-hamsters-in-hand-1643914343.jpg?fill=16:9"
                    alt="Pet 1"
                    className="rounded-2xl w-full h-[200px] object-cover"
                  />
                </div>

                {/* Row 2 */}
                <div className="flex space-x-2">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVM9JDORHZVBlcKCQCNPC-QU1r8xx_FmRzDg&s"
                    alt="Pet 2"
                    className="rounded-2xl w-1/2 h-[180px] object-cover"
                  />
                  <img
                    src="https://www.qatarairways.com/content/dam/images/renditions/horizontal-3/miscellaneous/animal/h3-cat-pet-container.jpg"
                    alt="Pet 3"
                    className="rounded-2xl w-1/2 h-[180px] object-cover"
                  />
                </div>

                {/* Row 3 */}
                <div>
                  <img
                    src="https://pangovet.com/wp-content/uploads/2024/06/welsh-corgi-dogs-and-british-longhair-cat-on-sofa-at-home-LightField-Studios-Shutterstock-e1676569993632.jpg"
                    alt="Pet 4"
                    className="rounded-2xl w-full h-[200px] object-cover"
                  />
                </div>
              </div>
            </motion.div>

            {/* Right side: Form Section */}
            <div className="w-full md:w-1/2 bg-zinc-50 p-4 rounded-2xl shadow-xl flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-center text-blue-950 mb-5">Parent Login</h2>

              <Form
                name="login"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                initialValues={{ remember: true }}
                layout="vertical"
                className="space-y-5"
              >
                {/* Username */}
                <Form.Item
                  name="username"
                  label="Username"
                  rules={[{ required: true, message: 'Please input your username!' }]}
                >
                  <div className="flex items-center border-b p-2 rounded-md border-blue-950">
                    <FaUser className="text-black-500 mr-2" />
                    <Input
                      className="p-2 w-full border-none focus:ring-2 focus:ring-yellow-400"
                      placeholder="Enter your username"
                    />
                  </div>
                </Form.Item>

                {/* Email */}
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: 'Please input your email!' },
                    { type: 'email', message: 'Please enter a valid email!' },
                  ]}
                >
                  <div className="flex items-center border-b p-2 rounded-md border-blue-950">
                    <FaEnvelope className="text-black-500 mr-2" />
                    <Input
                      className="p-2 w-full border-none focus:ring-2 focus:ring-yellow-400"
                      placeholder="Enter your email"
                    />
                  </div>
                </Form.Item>

                {/* Password */}
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <div className="flex items-center border-b p-2 rounded-md border-blue-950">
                    <FaLock className="text-black-500 mr-2" />
                    <Input.Password
                      className="p-2 w-full border-none focus:ring-2 focus:ring-yellow-400"
                      placeholder="Enter your password"
                    />
                  </div>
                </Form.Item>

                {/* Remember Me */}
                <Form.Item name="remember" valuePropName="checked">
                  <Checkbox className="text-sm text-black-600">Remember me</Checkbox>
                </Form.Item>

                {/* Buttons */}
                <Form.Item>
                  <Row gutter={[16, 16]}>
                    <Col span={24}>
                      <Button
                        className="w-full bg-yellow-500 text-white p-4 rounded-md hover:bg-yellow-400 transition duration-300"
                        htmlType="submit"
                      >
                        Login
                      </Button>
                    </Col>
                    <Col span={24}>
                      <Button
                        type="link"
                        onClick={handleModalOpen}
                        className="text-blue-700 underline hover:text-blue-900"
                      >
                        Forgot Password?
                      </Button>
                    </Col>
                  </Row>
                </Form.Item>

                {/* Register + Google */}
                <Form.Item>
                  <div className="flex flex-col justify-center items-center space-y-4">
                    <Button
                      type="link"
                      className="text-yellow-500 hover:text-yellow-400 w-full text-center"
                      onClick={handleRegister}
                    >
                      Don't have an account? Register here
                    </Button>
                    <Button
                      type="link"
                      className="text-gray-600 mt-2"
                      onClick={googleLogin}
                    >
                      Sign in with Google
                    </Button>
                  </div>
                </Form.Item>
              </Form>

              {/* Forgot Password Modal */}
              <Modal
                title="Reset Password"
                open={isModalOpen}
                onOk={handleResetPassword}
                onCancel={handleModalClose}
                okText="Reset Password"
                cancelText="Cancel"
                confirmLoading={isResetting}
                okButtonProps={{ disabled: !otp || !newPassword }}
              >
                <Form layout="vertical">
                  <Form.Item
                    label="Parent Email"
                    required
                    tooltip="Enter the Parent email to receive OTP"
                  >
                    <Input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your registered email"
                    />
                  </Form.Item>

                  {!otpSent && (
                    <Button
                      type="primary"
                      className="w-full bg-yellow-500"
                      onClick={handleSendOTP}
                      loading={isSendingOTP}
                    >
                      Send OTP
                    </Button>
                  )}

                  {otpSent && (
                    <>
                      <Form.Item
                        label="Enter OTP"
                        required
                        tooltip="Check your mail for the OTP"
                      >
                        <Input
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          placeholder="Enter OTP"
                        />
                      </Form.Item>

                      <Form.Item
                        label="New Password"
                        required
                        tooltip="Enter your new password"
                      >
                        <Input.Password
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="New Password"
                        />
                      </Form.Item>
                    </>
                  )}
                </Form>
              </Modal>
            </div>

          </div>
        </div>
      </motion.div>
      <ToastContainer />
    </>
  );

}

export default PetOwnerLoginForm;

