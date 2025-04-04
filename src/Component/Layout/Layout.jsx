import React, { useContext, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { UserContext } from '../../Context/UserContext';

export default function Layout() {
  const location = useLocation();
  const hideNavbarRoutes = ['/Register' , "/ForgotPassword" , '/VerifyEmail','/login' , '/Login' , '/SignUpCompany1' , '/SignUpCompany2' , '/SignUpApplicant','/ProfileSettings'];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);
 let {setUserData}  = useContext(UserContext)
 let navigate = useNavigate()
 useEffect(()=>{
  if(localStorage.getItem("userToken")){
    setUserData(localStorage.getItem("userToken"))
  }
  else{
    navigate('/')
  }
 },[])
  return (
    <div>
      {!shouldHideNavbar && <Navbar />}
      <Outlet />
    </div>
  );
}
