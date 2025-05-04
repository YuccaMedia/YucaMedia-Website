import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import './styles/globals.css';

function App() {
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
      <main>
        <Hero />
        <Dashboard />
        
        {/* Additional sections would go here */}
        <section id="about" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-[#1a2b21] mb-8 text-center">About Yuca Media</h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg mb-6">
                Yuca Media was established in 2025 to address the severe shortage of work opportunities in the entertainment community, particularly for independent artists, filmmakers, and crew members.
              </p>
              <p className="text-lg mb-6">
                Our mission is to bridge the gap between traditional entertainment and Web3 technology, creating new paths for creators to fund, produce, and distribute their work.
              </p>
              <p className="text-lg mb-6">
                Through our blockchain-driven platforms, we empower artists to take control of their creative careers while building sustainable funding models that benefit the entire creative ecosystem.
              </p>
            </div>
          </div>
        </section>
        
        <section id="services" className="py-20 bg-[#f5f8f6]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-[#1a2b21] mb-8 text-center">Our Services</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-[#1a2b21] mb-4">Web3 Development</h3>
                <p className="text-gray-700 mb-4">
                  Custom blockchain solutions for creative industries, built on Solana for speed and efficiency.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-[#1a2b21] mb-4">CryptoLottery Platform</h3>
                <p className="text-gray-700 mb-4">
                  A transparent, blockchain-based lottery system that generates sustainable funding.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-[#1a2b21] mb-4">Yuca Studios</h3>
                <p className="text-gray-700 mb-4">
                  Community-driven production studio for film, music videos, and creative content.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section id="contact" className="py-20 bg-[#1a2b21] text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Contact Us</h2>
            <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-sm p-8 rounded-lg">
              <p className="text-center mb-6">
                Interested in learning more about Yuca Media or getting involved with our projects?
              </p>
              <div className="text-center">
                <button 
                  className="bg-[#c2c8c4] text-[#1a2b21] px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all text-lg"
                  aria-label="Contact Our Team"
                >
                  Contact Our Team
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-[#1a2b21] text-[#c2c8c4] py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-2">Yuca Media</h3>
              <p className="text-sm">Empowering creators through blockchain technology</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-white transition-colors" aria-label="Twitter">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="#" className="hover:text-white transition-colors" aria-label="Discord">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"></path>
                </svg>
              </a>
              <a href="#" className="hover:text-white transition-colors" aria-label="GitHub">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path>
                </svg>
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-[#c2c8c4] border-opacity-20 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} Yuca Media. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
