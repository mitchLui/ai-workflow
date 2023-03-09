import { React, useEffect, useState} from "react";
import { Navigate } from 'react-router-dom';
import { useRete } from "./rete";
import {Button, ToastNotification}  from 'carbon-components-react';
import { CORS, API_DOMAIN } from '../../settings';
import "./_workflow-page.scss";

import cookie from "json-cookie";

function onLoad(){
  console.log("fetching workflow from backend");
  const userId = cookie.get("googleObj").id
  const params = {
      user_id: userId,
  },
  url = new URL(API_DOMAIN()+'/workflow/get');
  url.search = new URLSearchParams(params).toString();
  fetch(url, {
      method: 'GET',
      mode: CORS,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + cookie.get('googleObj').code
      }
    }).then((async (response) => {
      const data = await response.json();
      if (data.success){
        if (data.data.workflows.length !== 0){
          const workflow = data.data.workflows[data.data.workflows.length-1];
          delete workflow._id;
          delete workflow.user_id;
          delete workflow.created;
          console.log("workflows loaded");
          sessionStorage.setItem("workflowObj", JSON.stringify(workflow));
        } else {
          console.log("no workflows found");
          console.log(sessionStorage.getItem("workflowObj"));
        }
      }
    }))
}

function Editor() {
  const [setContainer] = useRete();

  return (
    <div
      className="workflow-editor-container"
      ref={(ref) => ref && setContainer(ref)}
    />
  );
}
    
function WorkflowPage() {
  const [runEnabled, setRunEnabled] = useState(false);
  const [saveEnabled, setSaveEnabled] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  // useEffect (()=>{
  //   onLoad();
  // }, []);
    
  

  function runWorkflow(){
    setRunEnabled(true);
    alert("the workflow is running, you will get a notification when it is complete.");
    console.log(JSON.parse(sessionStorage.getItem("workflowObj")));
    const workflowObj = JSON.parse(sessionStorage.getItem("workflowObj"))
    const userId = cookie.get("googleObj").id
    fetch(API_DOMAIN()+'/workflow/run', {
      method: 'POST',
      mode: CORS,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + cookie.get('googleObj').code
      },
      body: JSON.stringify({'user_id': userId, 'workflow': workflowObj})
    }).then((async (response) => {
      const data = await response.json();
      if (data.success === false){
        alert("an error has occurred. Please contact the administrator")
      } else {
        alert("the workflow has finished running -- check your Google Drive.");
      }
      setRunEnabled(false);
    })
    )
  }

  async function saveWorkflow(){
    setSaveEnabled(true);
    console.log(JSON.parse(sessionStorage.getItem("workflowObj")));
    const workflowObj = JSON.parse(sessionStorage.getItem("workflowObj"))
    const userId = cookie.get("googleObj").id
    fetch(API_DOMAIN()+'/workflow/save', {
      method: 'POST',
      mode: CORS,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + cookie.get('googleObj').code
      },
      body: JSON.stringify({'user_id': userId, 'workflow': workflowObj})
    }).then((async (response) => {
      const data = await response.json();
      console.log(data);
      setSaveEnabled(false);
    })
    )
  } 
 
  // if (cookie.get("googleObj") === "") {
  //   return <Navigate to='/profile' replace={true}/>
  // } else {
    return (
        <div className="workflow-page" >
          <div className={"desc"}>
            <b>Workflow Editor</b>
          </div>
          {
            showWarning ? (
                <ToastNotification
                  className='warning'
                  kind="warning-alt"
                  title="Warning"
                  subtitle="This website is no longer functional. 
                  See https://mitchlui.dev/projects/ai-workflow for more information."
                  iconDescription="Close"
                  onClose={() => {setShowWarning(false)}}
                />
              ) : (<></>)
          }
          <Button disabled={showWarning} onClick={() => {setShowWarning(true)}} className="save-workflow-button">Save workflow</Button>
          <Button disabled={showWarning} onClick={() => {setShowWarning(true)}} className="run-workflow-button" >Run workflow</Button>
          <div className={showWarning ? "warning-bg": "" }>
          <Editor />
          </div>
        </div>
      );
   //}
}

export default WorkflowPage;