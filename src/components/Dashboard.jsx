import React, { useState } from 'react';
import '../styles/globals.css';

const Dashboard = () => {
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
    <section id="dashboard" className="py-16 bg-[#f5f8f6]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#1a2b21] mb-8 text-center">Creator Dashboard</h2>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Dashboard Navigation */}
          <div className="flex border-b border-gray-200" role="tablist" aria-label="Dashboard Sections">
            <button
              className={`flex-1 py-4 px-6 text-center font-medium ${activeTab === 'projects' ? 'bg-[#1a2b21] text-white' : 'text-gray-600 hover:bg-gray-50'}`}
              onClick={() => setActiveTab('projects')}
              role="tab"
              aria-selected={activeTab === 'projects'}
              aria-controls="projects-panel"
            >
              Yuca Studios Projects
            </button>
            <button
              className={`flex-1 py-4 px-6 text-center font-medium ${activeTab === 'lottery' ? 'bg-[#1a2b21] text-white' : 'text-gray-600 hover:bg-gray-50'}`}
              onClick={() => setActiveTab('lottery')}
              role="tab"
              aria-selected={activeTab === 'lottery'}
              aria-controls="lottery-panel"
            >
              CryptoLottery
            </button>
            <button
              className={`flex-1 py-4 px-6 text-center font-medium ${activeTab === 'wallet' ? 'bg-[#1a2b21] text-white' : 'text-gray-600 hover:bg-gray-50'}`}
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
              <h3 className="text-xl font-semibold text-[#1a2b21]">Current Projects</h3>
              <button 
                className="bg-[#c2c8c4] text-[#1a2b21] px-4 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-all"
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
                      className="bg-[#1a2b21] h-2.5 rounded-full" 
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
              <h3 className="text-2xl font-bold text-[#1a2b21] mb-2">Current Jackpot</h3>
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
                className="mt-6 bg-[#1a2b21] text-white px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all"
                aria-label="Purchase Lottery Tickets"
              >
                Purchase Tickets
              </button>
            </div>
            
            <h4 className="font-semibold text-lg mb-4">Previous Winners</h4>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left text-gray-600">Wallet Address</th>
                    <th className="px-4 py-2 text-left text-gray-600">Prize Amount</th>
                    <th className="px-4 py-2 text-left text-gray-600">Date</th>
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
              <h3 className="text-xl font-semibold text-[#1a2b21] mb-1">Your Wallet</h3>
              <p className="text-gray-600">Connect your Solana wallet to view your earnings and investments</p>
              <button 
                className="mt-4 bg-[#1a2b21] text-white px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all"
                aria-label="Connect Solana Wallet"
              >
                Connect Wallet
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
