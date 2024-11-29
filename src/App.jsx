import { useState } from 'react';
import Home from './Component/Home/Home';
import About from './Component/About/About';
import Register from './Component/Register/Register';
import Login from './Component/Login/Login';
import Companies from './Component/Companies/Companies';
import JobsPage from './Component/JobsPage/JobsPage';
import NotFound from './Component/NotFound/NotFound';
import Layout from './Component/Layout/Layout';
import SignUpApplicant from './Component/SignUpApplicant/SignUpApplicant';
import SignUpCompany1 from './Component/SignUpCompany1/SignUpCompany1';
import SignUpCompany2 from './Component/SignUpCompany2/SignUpCompany2';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {
  const Routers = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: 'About', element: <About /> },
        { path: 'Companies', element: <Companies /> },
        { path: 'JobsPage', element: <JobsPage /> },
        { path: 'Login', element: <Login /> },
        { path: 'Register', element: <Register />},
        { path: 'SignUpApplicant', element: <SignUpApplicant /> },
        { path: 'SignUpCompany1', element: <SignUpCompany1 /> },
        { path: 'SignUpCompany2', element: <SignUpCompany2 /> },
        { path: '*', element: <NotFound /> },
      ],
    },
  ]);

  return (
    <RouterProvider router={Routers} />
  );
}

export default App;
