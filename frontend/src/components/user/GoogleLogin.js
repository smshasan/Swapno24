import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';

import axios from 'axios';

const GoogleAuth = () => {
  
    const handleSuccess = async (response) => {
    console.log('Google Sign-In response:', response);

    const { credential} = response;

    // Check if the credential is defined
    if (!credential) {
      console.error('Google Sign-In failed: No credential received');
      return;
    }


   
    
    // Example usage
   

    // Extract user information from the credential (you may need to adjust this based on the library's documentation)
    // const { profile } = credential;

    // // Check if the profile is defined
    // if (!profile) {
    //   console.error('Google Sign-In failed: No profile received');
    //   return;
    // }

    // const { googleId, name, email } = profile;

    // Send user data to the backend
    // try {
    //   const response = await axios.post('http://localhost:4990/api/v1/google/login', {})
        

    //   const result = await response.json();

    //   if (result.success) {
    //     // Handle successful user creation or retrieval
    //     console.log('User data from server:', result.user);
    //   } else {
    //     // Handle server-side error
    //     console.error('Server error:', result.error);
    //   }
    // } catch (error) {
    //   console.error('Error communicating with the server:', error);
    // }
  };

  const handleFailure = (error) => {
    // Handle Google Sign-In failure
    console.error('Google Sign-In failed:', error);
  };


  return (
    
    <GoogleLogin
      clientId="YOUR_GOOGLE_CLIENT_ID"
      onSuccess={handleSuccess}
      onFailure={handleFailure}
    >
      <button>Sign in with Google</button>
    </GoogleLogin>
    
  );
};

export default GoogleAuth;