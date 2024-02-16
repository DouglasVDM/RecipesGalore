import React from 'react';
import { GoogleLogin } from 'react-google-login';

const SignIn = ({ onSuccess, onFailure }) => {
  const responseGoogle = (response) => {
    if (response.tokenId) {
      onSuccess(response);
    } else {
      onFailure(response);
    }
  };

  return (
    <div  className="signin-container">
       <GoogleLogin
      clientId="36320771247-k67hqh9n2l1fkonfp2up04urh17h91ij.apps.googleusercontent.com"
      buttonText="Login with Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
    />
    </div>
   
  );
};

export default SignIn;
