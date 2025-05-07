import React, { useState, useEffect, createContext, useContext } from 'react';

// Create a context to manage wallet state globally
export const WalletContext = createContext();

export const useWallet = () => useContext(WalletContext);

export const WalletProvider = ({ children }) => {
  const [wallet, setWallet] = useState({
    connected: false,
    address: null,
    balance: null,
    connecting: false,
    error: null
  });

  // Check if wallet was previously connected
  useEffect(() => {
    const savedWallet = localStorage.getItem('connectedWallet');
    if (savedWallet) {
      try {
        const walletData = JSON.parse(savedWallet);
        if (walletData.connected && walletData.address) {
          // Attempt to reconnect
          connectWallet(true);
        }
      } catch (error) {
        console.error('Error parsing saved wallet data', error);
        localStorage.removeItem('connectedWallet');
      }
    }
  }, []);

  // Save wallet connection to localStorage when it changes
  useEffect(() => {
    if (wallet.connected && wallet.address) {
      localStorage.setItem('connectedWallet', JSON.stringify({
        connected: true,
        address: wallet.address
      }));
    } else if (!wallet.connected && !wallet.connecting) {
      localStorage.removeItem('connectedWallet');
    }
  }, [wallet.connected, wallet.address, wallet.connecting]);

  const connectWallet = async (isAutoConnect = false) => {
    setWallet(prev => ({ ...prev, connecting: true, error: null }));
    
    try {
      // Check if Phantom wallet exists
      const { solana } = window;
      
      if (!solana?.isPhantom) {
        if (!isAutoConnect) {
          // Only show error when user explicitly tries to connect
          setWallet(prev => ({
            ...prev,
            error: 'Phantom wallet not found. Please install Phantom wallet extension.',
            connecting: false
          }));
        } else {
          // Just reset the connecting state for auto-connect
          setWallet(prev => ({ ...prev, connecting: false }));
        }
        return;
      }

      // Connect to wallet
      const response = await solana.connect();
      const address = response.publicKey.toString();
      
      // Get balance (this would need to be implemented with actual Solana web3 library)
      const balance = 'Loading...'; // Placeholder for actual balance
      
      setWallet({
        connected: true,
        address,
        balance,
        connecting: false,
        error: null
      });
      
    } catch (error) {
      console.error('Error connecting wallet:', error);
      setWallet(prev => ({
        ...prev,
        connected: false,
        address: null,
        balance: null,
        connecting: false,
        error: isAutoConnect ? null : 'Failed to connect wallet. Please try again.'
      }));
    }
  };

  const disconnectWallet = async () => {
    try {
      const { solana } = window;
      if (solana?.isPhantom) {
        await solana.disconnect();
      }
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
    } finally {
      setWallet({
        connected: false,
        address: null,
        balance: null,
        connecting: false,
        error: null
      });
      localStorage.removeItem('connectedWallet');
    }
  };

  return (
    <WalletContext.Provider value={{ wallet, connectWallet, disconnectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

// The actual button component
const WalletConnect = ({ className = '', variant = 'primary', size = 'md' }) => {
  const { wallet, connectWallet, disconnectWallet } = useWallet();
  
  // Define button styles based on variant and size
  const getButtonClasses = () => {
    const baseClasses = 'font-medium rounded transition-all duration-200 flex items-center justify-center';
    
    // Size classes
    const sizeClasses = {
      sm: 'px-3 py-1 text-sm',
      md: 'px-4 py-2',
      lg: 'px-6 py-3 text-lg'
    };
    
    // Variant classes
    const variantClasses = {
      primary: 'bg-yuca-green text-yuca-cream hover:bg-yuca-green-light focus:ring-2 focus:ring-yuca-green-light focus:ring-opacity-50',
      secondary: 'bg-yuca-cream text-yuca-green border border-yuca-green hover:bg-yuca-cream-dark focus:ring-2 focus:ring-yuca-cream-dark focus:ring-opacity-50',
      transparent: 'bg-transparent text-yuca-green hover:text-yuca-green-light focus:ring-2 focus:ring-yuca-green focus:ring-opacity-50'
    };
    
    return `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;
  };

  // Format address for display
  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.substring(0, 4)}...${address.substring(address.length - 4)}`;
  };

  return (
    <div>
      {wallet.error && (
        <div className="text-red-500 text-sm mb-2">{wallet.error}</div>
      )}
      
      {wallet.connected ? (
        <div className="flex items-center space-x-2">
          <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
          <span className="font-mono text-sm mr-2">{formatAddress(wallet.address)}</span>
          <button
            onClick={disconnectWallet}
            className={getButtonClasses()}
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          onClick={() => connectWallet()}
          disabled={wallet.connecting}
          className={getButtonClasses()}
        >
          {wallet.connecting ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Connecting...
            </span>
          ) : (
            'Connect Wallet'
          )}
        </button>
      )}
    </div>
  );
};

export default WalletConnect;
