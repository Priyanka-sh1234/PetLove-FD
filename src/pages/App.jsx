// import React, { useState } from 'react';
// import { Form, Input, Button, message } from 'antd';
// import axios from 'axios';
// import {toast} from 'react-toastify'
// import { useNavigate } from 'react-router-dom'; 
// import { baseURL } from '../../config'

// const App = () => {
//   const [resData, setResData] = useState(''); 
//   const navigate = useNavigate(); 

//   const onFinish = async (values) => {
//     try {
//       const response = await axios.post(`${baseURL}/api/auth/register', values);

//       if (response.data.success) {
//         message.success('Registration successful!');
//         console.log(response.data);
//         setResData(response.data.message);
      
//         toast("Registration successful!!!")
//         navigate('/home'); 
//       }
//     } 
    
//     catch (error) {
//       message.error('Registration failed. Please try again.');
//       toast("Error")
//     }
//   };

//   return (
//     <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
//       <h2>Register</h2>
//       <Form
//         name="register"
//         onFinish={onFinish}
//         initialValues={{
//           remember: true,
//         }}
//         layout="vertical"
//       >
//         <Form.Item
//           label="Username"
//           name="username"
//           rules={[
//             {
//               required: true,
//               message: 'Please input your username!',
//             },
//           ]}
//         >
//           <Input />
//         </Form.Item>

//         <Form.Item
//           label="Email"
//           name="email"
//           rules={[
//             {
//               required: true,
//               message: 'Please input your email!',
//               type: 'email',
//             },
//           ]}
//         >
//           <Input />
//         </Form.Item>

//         <Form.Item
//           label="Password"
//           name="password"
//           rules={[
//             {
//               required: true,
//               message: 'Please input your password!',
//             },
//           ]}
//         >
//           <Input.Password />
//         </Form.Item>

//         <Form.Item>
//           <Button type="primary" htmlType="submit">
//             Register
//           </Button>
//         </Form.Item>
//       </Form>

//       <div>{resData}</div>
//     </div>
//   );
// };

// export default App;



import './App.css'
import React from 'react'
const App = () => {  
  return (
    <>
        <div className='visible xs:hidden'>hii</div>
    </>

  )
}
export default App