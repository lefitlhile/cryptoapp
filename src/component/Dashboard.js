import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import logo from './img/Logo.png';
import WindowIcon from '@mui/icons-material/Window';
import PriceGraph from './PriceGraph'; 
import etherum from './img/Group 334.png';
import cardano from './img/Group 335.png';
import litecoin from './img/Group 336.png';
import bitcoin from './img/Group 333.png';
import walleticon from './img/wallet-2.png';
import charticon from './img/graph.png';
import settings from './img/setting-2.png';
import logout from './img/logout.png';
import message from './img/sms.png';
import transact from './img/wallet-minus.png';
import search from './img/search-normal.png';
import notification from './img/notification.png';
import help from './img/help.png';
import arrow from './img/arrow-down.png';

import vector from './img/Vector.png';
import axios from 'axios';

// StatisticCard Component
const StatisticCard = ({ price, name, change, iconColor, icon }) => {
  const isPositive = change.startsWith('+'); 

  return (
    <div className="statistic-card">
      <div
        className="icon"
        style={{
          backgroundColor: iconColor, 
        }}
      >
        <img
          src={icon}
          alt={`${name} icon`}
          width="52"
          height="52"
        />
      </div>
      <div className="stats">
        <div className="price">{price}</div>
        <div className="name">{name}</div>
      </div>
      <div className="change">
        <img
          src={vector}
          alt={isPositive ? 'arrow up' : 'arrow down'}
          style={{
            transform: isPositive ? 'rotate(0deg)' : 'rotate(180deg)', // Rotate for negative change
            filter: isPositive
              ? 'none'
              : 'invert(25%) sepia(66%) saturate(5936%) hue-rotate(354deg) brightness(94%) contrast(103%)', // Arrow turns red for negative
          }}
          width="18"
          height="18"
        />
        <span style={{ color: isPositive ? 'green' : 'red' }}>{change}</span>
      </div>
    </div>
  );
};

// LiveMarket Component
const LiveMarket = () => {
  const [marketData, setMarketData] = useState([]);

  // Fetch live market data from CoinCap API
  const fetchMarketData = async () => {
    try {
      const response = await axios.get('https://api.coincap.io/v2/assets', {
        params: {
          ids: 'bitcoin,ethereum,litecoin,cardano',
          limit: 4,
        },
      });

      if (response && response.data && response.data.data) {
        setMarketData(response.data.data);
      } else {
        console.error('Unexpected API response format:', response);
      }
    } catch (error) {
      console.error('Error fetching market data', error);
    }
  };

  useEffect(() => {
    fetchMarketData(); 
    const interval = setInterval(fetchMarketData, 30000); // Update every 30 seconds
    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="live-market">
      <h2>Live Market</h2>
      <div className="market-list">
        {marketData.length > 0 ? (
          marketData.map((market, index) => {
            
            console.log(`changePercent24Hr for ${market.name}:`, market.changePercent24Hr);

            
            const changePercent = parseFloat(market.changePercent24Hr);
            const formattedChange = !isNaN(changePercent)
              ? (changePercent > 0 ? '+' : '') + changePercent.toFixed(2) + '%'
              : 'N/A'; // If the value is not a valid number, show 'N/A'

            return (
              <StatisticCard
                key={index}
                name={market.name}
                price={`$${parseFloat(market.priceUsd).toLocaleString()}`}
                change={formattedChange}
                icon={`https://cryptoicons.org/api/icon/${market.id.toLowerCase()}`} // CoinCap icon
                iconColor="#345c9c" 
              />
            );
          })
        ) : (
          <p>Loading market data...</p>
        )}
      </div>
    </div>
  );
};


// Sidebar Component
function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo">
        <img src={logo} alt="Logo" />
        <span className="logo-text"></span>
      </div>
      <nav className="navigation">
        <ul>
          <li className="active">
            <WindowIcon />
            <span className="Overview Icon">Overview</span>
          </li>
          <li>
            <img src={charticon} alt="Chart Icon" />
            <span>Chart</span>
          </li>
          <li>
            <img src={walleticon} alt="Transactions Icon" />
            <span>Transactions</span>
          </li>
          <li>
            <img src={transact} alt="Wallet Icon" />
            <span>Wallet</span>
          </li>
          <li>
            <img src={message} alt="Mail Box Icon" />
            <span>Mail Box</span>
          </li>
          <li>
            <img src={settings} alt="Setting Icon" />
            <span>Setting</span>
          </li>
          <li>
            <img src={logout} alt="Logout Icon" />
            <span>Logout</span>
          </li>
        </ul>
      </nav>
    </div>
  );
}

// Header Component
function Header() {
  const username = localStorage.getItem('username') || 'Guest';

  return (
    <div className="header">
      <div className="search-bar">
        <input type="text" placeholder="Search type of keywords" />
        <img src={search} alt="search icon" className="search-icon" />
      </div>
      <div className="header-icons">
        <img src={notification} alt="notifications" className="icon" />
        <img src={help} alt="help" className="icon" />
      </div>
      <div className="user-info">
        <img src="https://placeholder.pics/svg/40x40" alt="user avatar" className="avatar" />
        <div className="user-details">
          <span className="user-name">{username}</span>
          <span className="user-handle">@{username.toLowerCase()}22</span>
          <img src={arrow} alt="arrow down" className="arrow-icon" />
        </div>
      </div>
    </div>
  );
}

// Dashboard Component
function Dashboard() {
  const [bitcoinPriceHistory, setBitcoinPriceHistory] = useState([]);

  const fetchBitcoinPriceHistory = async () => {
    try {
      const response = await axios.get('https://api.coincap.io/v2/assets/bitcoin/history', {
        params: {
          interval: 'd1', // Daily data
          start: Date.now() - 180 * 24 * 60 * 60 * 1000, // Last 6 months
          end: Date.now(),
        },
      });

      // Transform data into an easier format for the chart
      const prices = response.data.data.map(item => ({
        timestamp: item.timestamp, 
        price: item.priceUsd, 
      }));

      setBitcoinPriceHistory(prices);
    } catch (error) {
      console.error('Error fetching historical data', error);
    }
  };

  useEffect(() => {
    fetchBitcoinPriceHistory();
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="bitcoin-chart-and-cards">
          <div className="statistics">
            <StatisticCard price="$40,291" name="Bitcoin - BTC" change="+0.25%" icon={bitcoin} iconColor="#f2a900" />
            <StatisticCard price="$18,291" name="Ethereum - ETH" change="-0.25%" icon={etherum} iconColor="#627eea" />
            <StatisticCard price="$8,291" name="Litecoin - ITL" change="-4.02%" icon={litecoin} iconColor="#345c9c" />
            <StatisticCard price="$3,291" name="Cardano - ADA" change="+0.12%" icon={cardano} iconColor="#3cc29e" />
          </div>
          <div className="bitcoin-chart">
            <h2>Bitcoin Price Over the Last 6 Months</h2>
            <PriceGraph priceData={bitcoinPriceHistory} />
          </div>
        </div>
        <div className="market-transactions">
          <LiveMarket />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
