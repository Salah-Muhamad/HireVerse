import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

export default function Layout() {
  const location = useLocation();
  const hideNavbarRoutes = ['/Register' , "/ForgotPassword" , '/VerifyEmail','/login' , '/Login' , '/SignUpCompany1' , '/SignUpCompany2' , '/SignUpApplicant'];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <div>
      {!shouldHideNavbar && <Navbar />}
      <Outlet />
    </div>
  );
}
