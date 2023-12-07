import axios from 'axios';
import React from 'react'

const GoogleLoginButton = () => {

    const handleGoogleLogin = () => {
      window.open(
        `${process.env.REACT_APP_API_URL}/api/v1/auth/google/callback`,
         '_self'
      )
    }

    

  return (
    <div><button onClick={handleGoogleLogin}>Login with Google</button></div>
  )
}

export default GoogleLoginButton 