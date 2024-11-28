import { useState } from 'react'
import Home from './Component/Home/Home'
import About from './Component/About/About'
import Register from './Component/Register/Register'
import Login from './Component/Login/Login'
import Companies from './Component/Companies/Companies'
import JobsPage from './Component/JobsPage/JobsPage'
import NotFound from './Component/NotFound/NotFound'
import Layout from './Component/Layout/Layout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';





function App() {
  const Routers = createBrowserRouter([
    {
      path: '/',
      element: <Layout/>,
      children: [
        { index: true, element: <Home /> },
        { path: 'About', element: <About /> },
        { path: 'Companies', element: <Companies /> },
        { path: 'JobsPage', element: <JobsPage /> },
        { path: 'Login', element: <Login/> },
        { path: 'Register', element: <Register /> },
        { path: '*', element: <NotFound /> },
      ],
    },
  ])
  return (
    <>
      <RouterProvider router={Routers}></RouterProvider>
    </>
  )
}

export default App
