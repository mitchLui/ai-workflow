import React, { useState } from 'react';
import {
  Header,
  HeaderContainer,
  HeaderName,
  HeaderNavigation,
  HeaderMenuButton,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SkipToContent,
  SideNav,
  SideNavItems,
  HeaderSideNavItems,
  HeaderPanel,
  ToastNotification,
} from 'carbon-components-react';
import {
  Notification20,
  UserAvatar20,
} from '@carbon/icons-react';
import { Link } from 'react-router-dom';
import Logout from '../../components/Logout/Logout';

const AIWorkflowHeader = () => {
  const [showProfile, setShowProfile] = useState(false);
  return (
  <HeaderContainer
    render={({ isSideNavExpanded, onClickSideNavExpand }) => (
      <Header aria-label="AI Workflow">
        <SkipToContent />
        <HeaderMenuButton
          aria-label="Open menu"
          onClick={onClickSideNavExpand}
          isActive={isSideNavExpanded}
        />
        <HeaderName element={Link} to="/" prefix="IBM">
          AI Workflow
        </HeaderName>
        
        <HeaderNavigation aria-label="AI Workflow">
          <HeaderMenuItem element={Link} to="/workflow">
            Workflow
          </HeaderMenuItem>
        </HeaderNavigation>
        
        <SideNav
          aria-label="Side navigation"
          expanded={isSideNavExpanded}
          isPersistent={false}>
          <SideNavItems>
            <HeaderSideNavItems>
              
              <HeaderMenuItem element={Link} to="/workflow">
                Workflow 
              </HeaderMenuItem>
            </HeaderSideNavItems>
          </SideNavItems>
        </SideNav>
        <HeaderGlobalBar>
          <HeaderGlobalAction aria-label="Notifications">
            <Notification20 />
          </HeaderGlobalAction>
          <HeaderGlobalAction aria-label="Profile" onClick={()=>{setShowProfile(!showProfile)}} tooltipAlignment="end">
            <UserAvatar20  />
          </HeaderGlobalAction>
        </HeaderGlobalBar>
        <HeaderPanel aria-label="Header Panel" expanded={showProfile}>
          <div className="profile-container">
            <img className={"profile-pic"} src="https://mitchlui.dev/logo.svg" alt="logo" />
            <p className={"bold"}>Name:</p><p>mitchLui</p>
            <p className={"bold"}>Email:</p><p>mitch@mitchlui.dev</p>
            <Logout/>
          </div>
        </HeaderPanel>
      </Header>
    )}
  />
  );
};

export default AIWorkflowHeader;
