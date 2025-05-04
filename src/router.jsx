import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Services from './pages/Services';
import Layout from './components/Layout';
import ErrorPage from './pages/ErrorPage';

// Define routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'services',
        element: <Services />,
      },
    ],
  },
]);

// Router provider component
const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
