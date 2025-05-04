import React from 'react';
import { useRouteError, Link } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f8f6]">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-[#1a2b21] mb-4">Oops!</h1>
        <p className="mb-4 text-gray-600">Sorry, an unexpected error has occurred.</p>
        <p className="mb-6 text-gray-500 italic">
          {error.statusText || error.message}
        </p>
        <div className="bg-[#2a9d8f] text-white p-4 rounded-lg mb-6">
          <p>
            It looks like the page you're looking for doesn't exist or another error occurred.
          </p>
        </div>
        <Link 
          to="/" 
          className="inline-block bg-[#1a2b21] text-white px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
