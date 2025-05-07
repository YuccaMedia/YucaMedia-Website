// Import GSAP config first to ensure plugins are registered before any component imports
// This is critical for ensuring ScrollTrigger works globally
import './lib/gsap.js';
// Initialize Animation Manager at app startup to ensure it's available globally
import AnimationManager from './services/AnimationManager';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './router';
import ErrorBoundary from './components/ErrorBoundary';
import { WalletProvider } from './components/WalletConnect';
import './styles/globals.css';
import './styles/services.css';
import './styles/responsive-utilities.css';

// Initialize the Animation Manager as early as possible
AnimationManager.init();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <WalletProvider>
        <Router />
      </WalletProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
