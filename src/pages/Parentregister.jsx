import React, { useState } from 'react';
import { Form, Input, Button, message, Select} from 'antd';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaDog, FaPaw } from 'react-icons/fa';
import { toast, ToastContainer, Zoom } from "react-toastify";
import Header from '../components/header';
import Footer from '../components/Footer';
import axios from 'axios';
import { motion } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';
import { useGoogleLogin } from "@react-oauth/google";
import { baseURL } from '../../config';


const { Item } = Form;

const ParentRegisterForm = () => {

  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await axios.post(`${baseURL}/api/auth/webRegister`, values);

      if (response.data.success) {
        message.success('Registration successful!');


        setTimeout(() => {
          toast('Registeration Successful!', {
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
        }, 400);


        setTimeout(() => {
          navigate('/PetOwnerLoginForm');
        }, 3000);
      }
    }


    catch (error) {
      message.error('Registration failed. Please try again.');

      setTimeout(() => {
        toast('Registeration Unsuccessful!', {
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
      }, 400);


      setTimeout(() => {
        navigate('/Parentregister');
      }, 3000);
    }
  };



  const handleAlreadyRegistered = () => {
    navigate('/petOwnerLoginForm');
    setTimeout(() => {
      toast("Welcome to Login Page", {
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

        await axios.post(`${baseURL}/api/auth/ParentGoogleRegister?code=${authResult.code}`)

          .then((res) => {
            const { email, username, image, _id } = res.data.user;
            const token = res.data.token;
            localStorage.setItem("Token",token)
            localStorage.setItem("UserName",username)
            localStorage.setItem("UserEmail",email)
            localStorage.setItem("Id",_id)
            const obj = { email, name, token, image };
            localStorage.setItem("user-info", JSON.stringify(obj));


            setTimeout(() => {
              toast('Registeration Successful!', {
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


          })
          .catch((err) => {
            console.log("yeh ha err", err);
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
        toast('Registeration Unsuccessful', {
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
        navigate('/PetOwnerLoginForm');
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
        className="flex justify-center items-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 min-h-screen py-8"
      >
        <div className="flex w-full max-w-screen-lg">
            {/* Left Side: Form */}
            <motion.div
              initial={{ x: -200 }}
              animate={{ x: 0 }}
              transition={{
                duration: 2.0,
                type: 'spring',
                stiffness: 100,
                damping: 30,
              }}
              
      className="w-full md:w-1/2 bg-zinc-50 p-4 rounded-lg shadow-xl space-y-6"
      >
        <div>
          <div>
            <h2 className="text-3xl font-bold text-center text-blue-950 mb-4">Parent Registration</h2>

            <Form
              name="register"
              onFinish={onFinish}
              form={form}
              layout="vertical"
              className="space-y-5"
            >
              {/* Full Name */}
              <Item
                name="username"
                label="Full Name"
                rules={[{ required: true, message: 'Please input your full name!' }]}>
                <div className="flex items-center border-b p-2 rounded-md border-blue-950">
                  <FaUser className="text-black-500 mr-2" />
                  <Input
                    className="p-2 w-full border-none focus:ring-2 focus:ring-gray-400"
                    placeholder="Enter your full name"
                  />
                </div>
              </Item>

              {/* Email */}
              <Item
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
                    className="p-2 w-full border-none focus:ring-2 focus:ring-gray-400"
                    placeholder="Enter your email"
                  />
                </div>
              </Item>

              {/* Password */}
              <Item
                name="password"
                label="Password"
                rules={[{ required: true, message: 'Please input your password!' }]}>
                <div className="flex items-center border-b p-2 rounded-md border-blue-950">
                  <FaLock className="text-black-500 mr-2" />
                  <Input.Password
                    className="p-2 w-full border-none focus:ring-2 focus:ring-gray-400"
                    placeholder="Enter your password"
                  />
                </div>
              </Item>

              {/* Confirm Password */}
              <Item
                name="confirmPassword"
                label="Confirm Password"
                dependencies={['password']}
                rules={[
                  { required: true, message: 'Please confirm your password!' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject('The two passwords do not match!');
                    },
                  }),
                ]}
              >
                <div className="flex items-center border-b p-2 rounded-md border-blue-950">
                  <FaLock className="text-black-500 mr-2" />
                  <Input.Password
                    className="p-2 w-full border-none focus:ring-2 focus:ring-gray-400"
                    placeholder="Confirm your password"
                  />
                </div>
              </Item>

              {/* Pet Name */}
              <Item
                name="petName"
                label="Pet Name"
                rules={[{ required: true, message: 'Please input your pet name!' }]}
              >
                <div className="flex items-center border-b p-2 rounded-md border-blue-950">
                  <FaPaw className="text-black-500 mr-2" />
                  <Input
                    className="p-2 w-full border-none focus:ring-2 focus:ring-gray-400"
                    placeholder="Enter your pet's name"
                  />
                </div>
              </Item>

              {/* Pet Type */}
              <Item
                name="petType"
                label="Pet Type"
                rules={[{ required: true, message: 'Please input your pet type!' }]}
              >
                <div className="flex items-center border-b p-2 rounded-md border-blue-950">
                  <FaDog className="text-black-500 mr-2" />
                  <Input
                    className="p-2 w-full border-none focus:ring-2 focus:ring-gray-400"
                    placeholder="Enter your pet's type (e.g., Dog, Cat)"
                  />
                </div>
              </Item>

              {/* Breed */}
              <Item
                name="breed"
                label="Breed"
                rules={[{ required: true, message: 'Please input your pet\'s breed!' }]}
              >
                <div className="flex items-center border-b p-2 rounded-md border-blue-950">
                  <FaPaw className="text-black-500 mr-2" />
                  <Input
                    className="p-2 w-full border-none focus:ring-2 focus:ring-gray-400"
                    placeholder="Enter your pet's breed"
                  />
                </div>
              </Item>

              <Item
                name="contact"
                label="Contact"
                rules={[{ required: false }]}
              >
                <div className="flex items-center border-b p-2 rounded-md border-blue-950">
                  <FaPaw className="text-black-500 mr-2" />
                  <Input 
                    className="p-2 w-full border-none focus:ring-2 focus:ring-gray-400"
                    placeholder="Enter your contact details" />
                </div>
              </Item>

              {/* Submit Button */}
              <Item>
                <button
                  type="default"
                  htmlType="submit"
                  className="w-full border-none bg-gray-800 text-white font-bold rounded-bl-xl rounded-tr-xl hover:bg-sky-500  hover:rounded-br-xl hover:rounded-tl-xl hover:rounded-tr-none hover:rounded-bl-none transition-all duration-800 py-2 px-5"
                >
                  Register
                </button>
              </Item>


              {/* Already Registered Button */}
              <Item>
                <Button
                  type="link"
                  className="text-gray-700 w-half text-center"
                  onClick={handleAlreadyRegistered}
                >
                  Already Registered? Login
                </Button>
                <Button
                  type="link"
                  className="text-gray-700 w-half text-center p-5 ml-8"
                  onClick={googleLogin}
                >
                  Sign up With Google
                </Button>
              </Item>

            </Form>
          </div>
        </div>
        
        </motion.div>
        
            {/* Right Side: Image Collage */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.2 }}
              className="w-full md:w-1/2 flex items-center justify-center"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 w-full max-w-md">
                {/* Row 1 - One image */}
                <div className="w-full">
                  <img
                    src="https://hips.hearstapps.com/hmg-prod/images/low-maintenance-pets-hamsters-in-hand-1643914343.jpg?fill=16:9"
                    alt="Pet 1"
                    className="rounded-2xl w-full h-[200px] object-cover"
                  />
                </div>
        
                {/* Row 2 - Two images */}
                <div className="flex w-full space-x-2">
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
        
                {/* Row 3 - One image */}
                <div className="w-full">
                  <img
                    src="https://pangovet.com/wp-content/uploads/2024/06/welsh-corgi-dogs-and-british-longhair-cat-on-sofa-at-home-LightField-Studios-Shutterstock-e1676569993632.jpg"
                    alt="Pet 4"
                    className="rounded-2xl w-full h-[200px] object-cover"
                  />
                </div>
        
                {/* Row 4 - One image */}
                <div className="w-full">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA0iW4Jzu1kQEK0aA-b5K4pSQcf5Ff_TyDkfFp4s297GruXApZjdkXMDfHGNW1m6lfhjY&usqp=CAU"
                    alt="Pet 5"
                    className="rounded-2xl w-full h-[200px] object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      <ToastContainer />
    </>
  );
};

export default ParentRegisterForm;
