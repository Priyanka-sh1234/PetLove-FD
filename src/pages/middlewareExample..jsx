import React, { useRef, useState } from 'react'
import {Form,Input,Button} from 'antd'


function ControlledForm(){

    const inputRef =useRef()

    const [name, setName] = useState('')
    const [email, setEmail]= useState('')
    const handlesubmit =(e)=>{
        e.prevent.default();
        alert(inputRef.current.value)
        // console.log(name, email)
    }

    const HandleFinish =(values)=>{
        console.log(values);
        alert(`Values Submitted: ${values}`)
    }
return(
<>
<form onSubmit={handlesubmit}>
    <label>Username</label>
    <input type='text' onChange={(e)=>{setName(e.target.value)}} className='border-2 ml-4 rounded-2xl mb-4' ></input> <br></br>

    <label>Email</label>
    <input type='email' onChange={(e)=>{setName(e.target.value)}} className='mb-4 border-2 ml-4 rounded-2xl' ></input> <br></br>

    <button type='submit'>Submit</button>
</form>

<Form
name='login'
onFinish={HandleFinish}>
    <Form.Item
    label='username'
    name='username'
    >
        <Input/>
    </Form.Item>

    <Form.Item
    name='password'
    label='password'
    >
        <Input.Password/>
    </Form.Item>
    <Button
    color='yellow'
    variant='solid'
    htmlType='submit'
    >Submit</Button>
</Form>


<form
onSubmit={handlesubmit}
>
    <label>Username</label>
    <input 
    type='text'
    ref={inputRef}
    ></input>
<button type='submit'>Submit</button>
</form>
</>
)
}

export default ControlledForm