import React from 'react';
import { Button, Checkbox, Form, Input, Row, Col, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import Header from '../components/header';
import Footer from '../components/Footer';
import axios from 'axios';
import { toast } from 'react-toastify';

function LoginForm() {
  const navigate = useNavigate();

  const loginyourself = () => {
    navigate('/');
  };

  const onFinish = async (values) => {
    try {
      const result = await axios.post("https:4000/login", values)
      console.log(result)

      const { username, email, password } = result


      if (result.data.success) {
        setTimeout(() => {
          toast("login successfull!!")
        }, 500)

        setTimeout(() => {
          navigate('/')
        }, 4000);
      }


      if (!result.data.success) {
        setTimeout(() => {
          toast("login unsuccessfull!!")
        }, 4000)

        setTimeout(() => {
          navigate('/login')
        }, 4000);
      }
    }
    catch (error) {
      console.log(error)
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <>
      <Header />
      <div className="min-h-auto bg-gradient-to-r from-white-100 via-yellow-100 to-white-300 flex justify-center items-center ">
        <div className="bg-yellow-100 w-full max-w-md p-4 rounded-lg shadow-xl mt-10 mb-5 space-y-5">
          <h2 className="text-3xl font-bold text-center text-yellow-900">Login</h2>

          <Form
            name="login"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            initialValues={{ remember: true }}
            layout="vertical"
            className="space-y-5"
          >
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


            <Form.Item name="remember" valuePropName="checked" label={null}>
              <Checkbox className="text-sm text-black-600">Remember me</Checkbox>
            </Form.Item>


            <Form.Item label={null}>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Button
                    onClick={loginyourself}
                    className="w-full bg-yellow-500 text-white p-4 rounded-md hover:bg-yellow-400 transition duration-300"
                    htmlType="submit"
                  >
                    Submit
                  </Button>
                </Col>
                <Col span={24}>
                  <Button
                    className="w-full text-yellow-500 hover:text-yellow-400"
                    onClick={handleForgotPassword}
                  >
                    Forgot Password?
                  </Button>
                </Col>
              </Row>
            </Form.Item>



            <Form.Item label={null}>
              <Row>
                <Button
                  type="link"
                  className="text-yellow-500 hover:text-yellow-400 w-full"
                  onClick={handleRegister}
                >
                  Don’t have an account? Register here
                </Button>
              </Row>
            </Form.Item>
          </Form>

        </div>
      </div>

      <Footer />
    </>
  );
}

export default LoginForm;
