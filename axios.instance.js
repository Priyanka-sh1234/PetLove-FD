import axios from 'axios'

const instance = axios.create(
    {
        baseURL:'https://petlove-bd.onrender.com',
        timeout:1000,
    }
);

instance.interceptors.request.use(
    async(config)=>{
        try{
            const accessToken= localStorage.getItem("Token");
            config.headers.authorization= `Bearer ${accessToken}`;
            return config;
        }
        catch(error){
            console.error("error setting authoriation header", error);
            return Promise.reject(error);
        }
    },

    (error)=>{
        console.error("request error:", error);
        return Promise.reject(error);
    }

    
);

//Response Interceptor
instance.interceptors.response.use(
    (response)=>{
        // console.log("Response Data:",  response.data)
        console.log("Instance Called")
        // localStorage.setItem("ID",response.data.data._id)
        return response;
    },
    (error)=>{
        console.error("Response Error", error);
        if(error.response.status===401){
            console.log("unauthorized error, redirecing to login...")
        }
        return Promise.reject(error);
    }
);

export default instance;