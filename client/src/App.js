import React, { Component } from 'react';
import './app.scss';
import { Content } from 'carbon-components-react';
import AIWorkflowHeader from './components/Header';
import {
  Route,
  Routes 
} from 'react-router-dom';
import LandingPage from './content/LandingPage';
import WorkflowPage from './content/WorkflowPage';

class App extends Component {
  render() {
    return (
      <div>
        <AIWorkflowHeader />
        <Content>
          <Routes basename="/">
            <Route exact path="/" element={<LandingPage/>}/>
            <Route path="/workflow" element={<WorkflowPage/>}/>
          </Routes>
        </Content>
        {/* No more cookies since this is the static version */}
        {/* <CookieConsent location="bottom" cookieName="ibm-aiworkflow-accept-cookies" expires={999} overlay>
            This website uses cookies to store login information. If you would like not to use cookies, don't login.
        </CookieConsent> */}
      </div>
    );
  }
}

export default App;
