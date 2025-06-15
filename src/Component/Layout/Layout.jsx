import React, { useContext, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { UserContext } from "../../Context/UserContext";
import { CompanyContext } from "../../Context/CompanyContext";
import Footer from "../Footer/Footer";

export default function Layout() {
  const location = useLocation();
  const hideNavbarRoutes = [
    "/CreateJob2",
    "/CreateJob3",
    "/CreateJob1",
    "/Register",
    "/DeleteAccount",
    "/PreLogin",
    "/CompanyLogin",
    "/ForgotPassword",
    "/UpdatePassword",
    "/ChangeCompanyPassword",
    "/VerifyEmail",
    "/login",
    "/Login",
    "/SignUpCompany1",
    "/SignUpCompany2",
    "/SignUpApplicant",
    "/ProfileSettings",
    "/CompanyProfile",
    "/DeleteCompanyAccount",
    "/Instructions" ,
    "/instructions" ,
    "/Interview",
    "interview"
  ];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);
  let { setUserData } = useContext(UserContext);
  let { setCompanyData } = useContext(CompanyContext);
  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setUserData(localStorage.getItem("userToken"));
    } else if (localStorage.getItem("companyToken")) {
      setCompanyData(localStorage.getItem("companyToken"));
    } else {
      navigate("/");
    }
  }, []);
  return (
    <div>
      {!shouldHideNavbar && <Navbar />}
      <Outlet />
      {!shouldHideNavbar && <Footer />  }
    </div>
  );
}
