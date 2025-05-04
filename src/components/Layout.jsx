import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

/**
 * Layout component that wraps all pages with common header and footer
 * Uses Outlet from react-router-dom to render the child routes
 */
const Layout = () => {
  return (
    <div className="app">
      {/* Accessibility widget - this could be replaced with a more robust solution */}
      <div id="accessibility-widget" className="fixed right-4 bottom-4 z-50">
        <button 
          aria-label="Open Accessibility Menu"
          className="bg-[#1a2b21] text-white p-3 rounded-full shadow-lg hover:bg-opacity-90 transition-all"
          onClick={() => alert('Accessibility features would open here')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0" />
          </svg>
        </button>
      </div>
      
      <Header />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
