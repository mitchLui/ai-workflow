import React from 'react';
import {Button, ToastNotification} from 'carbon-components-react';
import cookie from "json-cookie";
import bgvideo from './bg-video1.mp4'
import './_landing-page.scss';


const LandingPage = () => {
  console.log(cookie.get('googleObj'));
  return (
    <div className="background-container">
     {/* <video autoPlay loop muted>
      <source src={bgvideo} type="video/mp4"/>
     </video> */}
     {/* <img src={bgpicture} alt="logo" /> */}
      <div className={"background"}>
        <img src={"./login-background.png"} alt={"bg"}/>
      </div>
     <div className="content">
        <ToastNotification
            kind="warning-alt"
            title="This is a demo site."
            subtitle="
            The login functionality is disabled. You can still see how the site
            works by clicking on the 'Get Started' button.
            See https://mitchlui.dev/projects/ai-workflow for more information."
            className='landing-warning'
        />
        <h1 style={{fontWeight: "bold",fontSize:"50px"}}>
          IBM AI WORKFLOW
        </h1>
        <br/>
        <Button  onClick={()=>{
          // if (cookie.get("googleObj") === "") {
          //   window.location.assign("./profile");
          // } else {
            window.location.assign("./workflow");
          }}>
          GET STARTED
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;
