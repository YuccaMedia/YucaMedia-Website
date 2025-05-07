import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Services from './pages/Services';
import Layout from './components/Layout';
import ErrorPage from './pages/ErrorPage';
import StudioHome from './yuca-studios/pages/StudioHome';
import CreatorDashboard from './yuca-studios/pages/CreatorDashboard';

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
  // Yuca Studios routes
  {
    path: '/studios-landing',
    element: <StudioLandingRedirect />,
  },
  {
    path: '/yuca-studios',
    element: <StudioLandingRedirect />,
  },
  {
    path: '/studios',
    element: <StudioHome />,
  },
  {
    path: '/studios/dashboard',
    element: <CreatorDashboard />,
  },
]);

// Redirect components for standalone HTML pages
function LandingPageRedirect() {
  React.useEffect(() => {
    window.location.href = '/landing.html';
  }, []);
  
  return <div className="loading">Redirecting to landing page...</div>;
}

function StudioLandingRedirect() {
  React.useEffect(() => {
    window.location.href = '/yuca-studios/landing.html';
  }, []);
  
  return <div className="loading">Redirecting to Yuca Studios landing page...</div>;
}

// Router provider component
const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
