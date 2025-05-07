

import React, { useState } from 'react';
import '../../styles/globals.css';

const CreatorDashboard = () => {
  // Set document title when component mounts
  React.useEffect(() => {
    document.title = "Yuca Studios - Creator Dashboard";
  }, []);
  const [activeTab, setActiveTab] = useState('projects');
  
  // Sample data for demonstration
  const projects = [
    { id: 1, title: 'Independent Film Production', status: 'Funding', progress: 65, votes: 128 },
    { id: 2, title: 'Music Video Collaboration', status: 'Production', progress: 80, votes: 94 },
    { id: 3, title: 'Documentary Series', status: 'Concept', progress: 25, votes: 46 },
  ];
  
  const lotteryData = {
    currentPrize: '250,000 SOL',
    ticketsSold: '12,456',
    drawDate: 'May 15, 2025',
    previousWinners: [
      { address: '7xKX...j4fZ', prize: '125,000 SOL', date: 'April 30, 2025' },
      { address: '3mRp...t8Yq', prize: '100,000 SOL', date: 'April 15, 2025' },
    ]
  };

  return (
    <div className="studio-creator-dashboard bg-[#F5F0E1] min-h-screen text-[#1A4D2E]">
      <header className="py-6 border-b border-[#1A4D2E] border-opacity-30">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src="/src/yuca-studios/assets/yuca-studios-logo-small.svg" 
              alt="Yuca Studios" 
              className="h-12 w-12"
            />
            <h1 className="text-2xl font-bold ml-3 text-[#1A4D2E]">YUCA STUDIOS</h1>
          </div>
          
          <nav>
            <ul className="flex gap-8">
              <li><a href="/studios#about" className="hover:text-[#1A4D2E] hover:font-bold transition-all">About</a></li>
              <li><a href="/studios#productions" className="hover:text-[#1A4D2E] hover:font-bold transition-all">Productions</a></li>
              <li><a href="/studios#team" className="hover:text-[#1A4D2E] hover:font-bold transition-all">Team</a></li>
              <li><a href="/studios#contact" className="hover:text-[#1A4D2E] hover:font-bold transition-all">Contact</a></li>
              <li><a href="/studios/dashboard" className="font-bold text-[#1A4D2E]">Creator Dashboard</a></li>
              <li><a href="/studios" className="hover:text-[#1A4D2E] hover:font-bold transition-all">Back to Studios</a></li>
            </ul>
          </nav>
        </div>
      </header>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#1A4D2E] mb-8 text-center">Creator Dashboard</h2>
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Dashboard Navigation */}
            <div className="flex border-b border-gray-200" role="tablist" aria-label="Dashboard Sections">
              <button
                className={`flex-1 py-4 px-6 text-center font-medium ${activeTab === 'projects' ? 'bg-[#1A4D2E] text-white' : 'text-[#1A4D2E] hover:bg-[#F5F0E1]'}`}
                onClick={() => setActiveTab('projects')}
                role="tab"
                aria-selected={activeTab === 'projects'}
                aria-controls="projects-panel"
              >
                Yuca Studios Projects
              </button>
              <button
                className={`flex-1 py-4 px-6 text-center font-medium ${activeTab === 'lottery' ? 'bg-[#1A4D2E] text-white' : 'text-[#1A4D2E] hover:bg-[#F5F0E1]'}`}
                onClick={() => setActiveTab('lottery')}
                role="tab"
                aria-selected={activeTab === 'lottery'}
                aria-controls="lottery-panel"
              >
                CryptoLottery
              </button>
              <button
                className={`flex-1 py-4 px-6 text-center font-medium ${activeTab === 'wallet' ? 'bg-[#1A4D2E] text-white' : 'text-[#1A4D2E] hover:bg-[#F5F0E1]'}`}
                onClick={() => setActiveTab('wallet')}
                role="tab"
                aria-selected={activeTab === 'wallet'}
                aria-controls="wallet-panel"
              >
                Wallet & Earnings
              </button>
            </div>
            
            {/* Projects Tab Panel */}
            <div 
              id="projects-panel" 
              role="tabpanel" 
              aria-labelledby="projects-tab"
              className={`p-6 ${activeTab !== 'projects' ? 'hidden' : ''}`}
            >
              <div className="mb-6 flex justify-between items-center">
                <h3 className="text-xl font-semibold text-[#1A4D2E]">Current Projects</h3>
                <button 
                  className="bg-[#1A4D2E] text-[#F5F0E1] px-4 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-all"
                  aria-label="Submit New Project"
                >
                  Submit New Project
                </button>
              </div>
              
              <div className="space-y-4">
                {projects.map(project => (
                  <div key={project.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-lg">{project.title}</h4>
                      <span className={`px-3 py-1 rounded-full text-sm ${project.status === 'Funding' ? 'bg-blue-100 text-blue-800' : project.status === 'Production' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {project.status}
                      </span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                      <div 
                        className="bg-[#1A4D2E] h-2.5 rounded-full" 
                        style={{ width: `${project.progress}%` }}
                        aria-valuenow={project.progress} 
                        aria-valuemin="0" 
                        aria-valuemax="100"
                        role="progressbar"
                        aria-label={`${project.title} progress: ${project.progress}%`}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{project.progress}% Complete</span>
                      <span>{project.votes} Community Votes</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Lottery Tab Panel */}
            <div 
              id="lottery-panel" 
              role="tabpanel" 
              aria-labelledby="lottery-tab"
              className={`p-6 ${activeTab !== 'lottery' ? 'hidden' : ''}`}
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-[#1A4D2E] mb-2">Current Jackpot</h3>
                <p className="text-4xl font-bold text-green-600">{lotteryData.currentPrize}</p>
                <div className="mt-4 flex justify-center space-x-8">
                  <div>
                    <p className="text-gray-600">Tickets Sold</p>
                    <p className="text-xl font-semibold">{lotteryData.ticketsSold}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Next Draw</p>
                    <p className="text-xl font-semibold">{lotteryData.drawDate}</p>
                  </div>
                </div>
                <button 
                  className="mt-6 bg-[#1A4D2E] text-white px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all"
                  aria-label="Purchase Lottery Tickets"
                >
                  Purchase Tickets
                </button>
              </div>
              
              <h4 className="font-semibold text-lg mb-4">Previous Winners</h4>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-[#F5F0E1]">
                      <th className="px-4 py-2 text-left text-[#1A4D2E]">Wallet Address</th>
                      <th className="px-4 py-2 text-left text-[#1A4D2E]">Prize Amount</th>
                      <th className="px-4 py-2 text-left text-[#1A4D2E]">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lotteryData.previousWinners.map((winner, index) => (
                      <tr key={index} className="border-t border-gray-200">
                        <td className="px-4 py-3 font-mono text-sm">{winner.address}</td>
                        <td className="px-4 py-3 font-semibold">{winner.prize}</td>
                        <td className="px-4 py-3">{winner.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Wallet Tab Panel */}
            <div 
              id="wallet-panel" 
              role="tabpanel" 
              aria-labelledby="wallet-tab"
              className={`p-6 ${activeTab !== 'wallet' ? 'hidden' : ''}`}
            >
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-[#1A4D2E] mb-1">Your Wallet</h3>
                <p className="text-gray-600">Connect your Solana wallet to view your earnings and investments</p>
                <button 
                  className="mt-4 bg-[#1A4D2E] text-white px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all"
                  aria-label="Connect Solana Wallet"
                >
                  Connect Wallet
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#1A4D2E] text-[#F5F0E1] py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h4 className="text-[#F5F0E1] font-bold text-xl mb-2">Yuca Studios</h4>
              <p className="text-[#F5F0E1] text-opacity-60">Rooted in Story. Grown by Artists.</p>
            </div>
            
            <div className="flex gap-6">
              <a href="#" className="text-[#F5F0E1] hover:text-white">Terms</a>
              <a href="#" className="text-[#F5F0E1] hover:text-white">Privacy</a>
              <a href="#" className="text-[#F5F0E1] hover:text-white">Contact</a>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-[#F5F0E1] border-opacity-30 text-center text-[#F5F0E1] text-opacity-60">
            <p>&copy; {new Date().getFullYear()} Yuca Studios. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CreatorDashboard;
