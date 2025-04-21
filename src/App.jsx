import JobDetails from "./Component/JobDetails/JobDetails";
import { useState } from "react";
import Home from "./Component/Home/Home";
import UserContextProvider from "./Context/UserContext.jsx";
import CompanyContextProvider from "./Context/CompanyContext.jsx";
import CompanyDetails from "./Component/CompanyDetails/CompanyDetails";
import About from "./Component/About/About";
import Register from "./Component/Register/Register";
import Login from "./Component/Login/Login";
import Companies from "./Component/Companies/Companies";
import JobsPage from "./Component/JobsPage/JobsPage";
import NotFound from "./Component/NotFound/NotFound";
import Layout from "./Component/Layout/Layout";
import SignUpApplicant from "./Component/SignUpApplicant/SignUpApplicant";
import SignUpCompany1 from "./Component/SignUpCompany1/SignUpCompany1";
import SignUpCompany2 from "./Component/SignUpCompany2/SignUpCompany2";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ForgotPassword from "./Component/ForgotPassword/ForgotPassword";
import VerifyEmail from "./Component/VerifyEmail/VerifyEmail";
import ApplicantJobs from "./Component/ApplicantJobs/ApplicantJobs";
import ApplyJob from "./Component/ApplyJob/ApplyJob";
import ProfileSettings from "./Component/ProfileSettings/ProfileSettings";
import UpdatePassword from "./Component/UpdatePassword/UpdatePassword";
import DeleteAccount from "./Component/DeleteAccount/DeleteAccount";
import CompanyLogin from "./Component/CompanyLogin/CompanyLogin";
import PreLogin from "./Component/PreLogin/PreLogin";
import { Toaster } from "react-hot-toast";
import CreateJob1 from "./Component/CreteJob1/CreateJob1.jsx";
import CreateJob2 from "./Component/CreateJob2/CreateJob2.jsx";
import CreteJob3 from "./Component/CreateJob3/CreteJob3.jsx";
import CompanyProfile from "./Component/CompanyProfile/CompanyProfile.jsx";
import DeleteCompanyAccount from "./Component/DeleteCompanyAccount/DeleteCompanyAccount.jsx";
import ChangeCompanyPassword from "./Component/ChangeCompanyPassword/ChangeCompanyPassword.jsx";
import CompanyDashboard from "./Component/CompanyDashboard/CompanyDashboard.jsx";
import { PostJobProvider } from "./Context/PostJobContext";  // تأكد من الباث والاسم الصحيح
import ProJsx from "./Component/Pro/Pro.jsx";

import ShowCv from "./Component/ShowCv/ShowCv.jsx";






function App() {
  const Routers = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "About", element: <About /> },
        { path: "Companies", element: <Companies /> },
        { path: "JobsPage", element: <JobsPage /> },
        { path: "ApplicantJobs", element: <ApplicantJobs /> },
        { path: "DeleteAccount", element: <DeleteAccount /> },
        { path: "DeleteCompanyAccount", element: <DeleteCompanyAccount /> },
        { path: "UpdatePassword", element: <UpdatePassword /> },
        { path: "CompanyDetails/:id", element: <CompanyDetails /> },
        {
          path: "JobDetails/:id",
          element: <JobDetails />,
          children: [{ path: "ApplyJob", element: <ApplyJob /> }],
        },
        { path: "Login", element: <Login /> },
        { path: "CompanyLogin", element: <CompanyLogin /> },
        { path: "Register", element: <Register /> },
        { path: "PreLogin", element: <PreLogin /> },
        { path: "VerifyEmail", element: <VerifyEmail /> },
        { path: "SignUpApplicant", element: <SignUpApplicant /> },
        { path: "SignUpCompany1", element: <SignUpCompany1 /> },
        { path: "SignUpCompany2", element: <SignUpCompany2 /> },
        { path: "ForgotPassword", element: <ForgotPassword /> },
        { path: "*", element: <NotFound /> },
        { path: 'About', element: <About /> },
        { path: 'Companies', element: <Companies /> },
        { path: 'ApplyJob', element: <ApplyJob /> },
        { path: 'JobsPage', element: <JobsPage /> },
        { path: 'ApplicantJobs', element: <ApplicantJobs /> },
        { path: 'CompanyDetails/:id', element:<CompanyDetails/> },
        { path: 'JobDetails/:id', element: <JobDetails /> },
        { path: 'Login', element: <Login /> },
        { path: 'Register', element: <Register />},
        { path: 'VerifyEmail', element: <VerifyEmail />},
        { path: 'SignUpApplicant', element: <SignUpApplicant /> },
        { path: 'SignUpCompany1', element: <SignUpCompany1 /> },
        { path: 'SignUpCompany2', element: <SignUpCompany2 /> },
        { path: 'ForgotPassword', element: <ForgotPassword /> },
        { path: '*', element: <NotFound /> },
        {path:'ProfileSettings',element:<ProfileSettings/>},
        {path:'CompanyProfile',element:<CompanyProfile/>},
        {path:'ChangeCompanyPassword',element:<ChangeCompanyPassword/>},
        {
          path:'CompanyDashboard/:jobId',element:<CompanyDashboard/> ,
          children:[
            {path:':AppId',element:<ShowCv/>}
          ]
        },
        // {path:'CompanyDashboard/:jobId/:ش',element:<CompanyDashboard/>},
        {path:'CreateJob1',element:<CreateJob1/>},
        {path:'CreateJob2',element:<CreateJob2/>},
        {path:'CreateJob3',element:<CreteJob3/>},

        {path:'pro',element:<ProJsx/>}

        

      ],
    },
  ]);

  return (
    <>
    <CompanyContextProvider>
      <UserContextProvider>
        <RouterProvider router={Routers} />
      </UserContextProvider>
      </CompanyContextProvider>
      <Toaster position="top-center"/>
    </>
  );
}

export default App;
