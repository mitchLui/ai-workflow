import React from 'react';
import { useGoogleLogin } from 'react-google-login';
import { CLIENT_ID, CORS, API_DOMAIN } from '../../settings';
import { Button } from "carbon-components-react";
import cookie from 'json-cookie';

const clientId = CLIENT_ID;


function Login() {
  const onSuccess = (res) => {
    console.log("code: " + res.code);
    try{
      fetch(API_DOMAIN()+'/user/login', {
        method: 'POST',
        mode: CORS,
        headers: {
          'Access-Control-Allow-Origin':'*',
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify({'code': String.raw`${res.code}`.replace("\\", "\\\\")})
      }).then(async (response) => { 
        const data = await response.json();
        const googleObj = data.data.google_object;
        console.log("googleObj: " + googleObj);
        cookie.set('googleObj', googleObj);
        console.log(cookie.get('googleObj'))
        window.location.assign("./workflow");
      })
    } catch (error) {
      console.log(error);
      alert("An error occurred while logging in. Please try again.");
    }
  }

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: false,
    scope: "email profile https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/presentations",
    prompt: "consent",
    responseType: "code",
    accessType: "offline",
  });

  return (
    <Button onClick={signIn} className="button">
      <img src="icons/google.svg" alt="google login" className="icon"></img>
      <span className="buttonText">Sign in with Google</span>
    </Button>
  );
}

export default Login;