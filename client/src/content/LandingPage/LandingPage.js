import React from 'react';
import {Button} from 'carbon-components-react';
import cookie from "json-cookie";
import bgvideo from './bg-video1.mp4'
import './LandingPage.css';


const LandingPage = () => {
  console.log(cookie.get('googleObj'));
  return (
    <div className="background-container">
     <video autoPlay loop muted>
      <source src={bgvideo} type="video/mp4"/>
     </video>
     {/* <img src={bgpicture} alt="logo" /> */}
     <div className="caption">
        <h1 style={{fontWeight: "bold",fontSize:"50px"}}>
          IBM AI WORKFLOW
        </h1>
        <br/>
        
        <Button  onClick={()=>{
          if (cookie.get("googleObj") === "") {
            window.location.assign("./profile");
          } else {
            window.location.assign("./workflow");
          }}}>
          GET STARTED
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;
