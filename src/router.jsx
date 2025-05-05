import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Services from './pages/Services';
import Layout from './components/Layout';
import ErrorPage from './pages/ErrorPage';

// Create router with routes
// Note: In React Router v7, the previous future flags are now the default behavior
const router = createBrowserRouter([
  {
    // Root path redirects to the landing page
    path: '/',
    element: <LandingPageRedirect />,
  },
  {
    // Main application moved to /home path
    path: '/home',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  // Standalone routes for Services and Contact
  {
    path: '/services',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Services />,
      }
    ],
  },
  {
    path: '/contact',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Contact />,
      }
    ],
  },
  // Keep landing page route for direct access via menu
  {
    path: '/landing',
    element: <LandingPageRedirect />,
  },
]);

// Simple component to redirect to the standalone landing.html page
function LandingPageRedirect() {
  React.useEffect(() => {
    window.location.href = '/landing.html';
  }, []);
  
  return <div className="loading">Redirecting to landing page...</div>;
}

// Router provider component
const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
