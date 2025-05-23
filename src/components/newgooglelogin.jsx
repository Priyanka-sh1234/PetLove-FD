import { useGoogleLogin } from "@react-oauth/google";
import React from "react";
import axios from "axios"; // Import axios to send the token to backend



export const GoogleLogin = () => {
  const login = useGoogleLogin({
    onSuccess: async (response) => {
      console.log("Google Login Success:", response);
      
      // Send token to the backend
      try {
        const res = await axios.post("http://localhost:5000/api/auth/google-login", {
          token: response.access_token,
        });

        console.log("Server Response:", res.data);
      } 
      
      catch (error) {
        console.error("Google Login Error:", error);
      }
    },
    onError: (error) => console.error("Google Login Failed", error),
  });

  return (
    <div>
      <button type="submit" onClick={() => login()}>
        Signup with Google
      </button>
    </div>
  );
};