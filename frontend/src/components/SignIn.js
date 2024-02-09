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
      clientId="632795198966-sk7i3qcssuhii2chv320serma1cfir0m.apps.googleusercontent.com"
      buttonText="Login with Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
    />
    </div>
   
  );
};

export default SignIn;
