// src/components/Dashboard.js
import React from 'react';
import './Dashboard.css';
import logo from './img/Logo.png';
import WindowIcon from '@mui/icons-material/Window';
import PriceGraph from './PriceGraph';  // Import the PriceGraph component
import bitcoin from './img/iconmonstr-payment-30-120.png';
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
            <span className='Overview Icon'>Overview</span>
          </li>
          <li>
            <img src={charticon} alt="Chart Icon" />
            <span>Chart</span>
          </li>
          <li>
            <img src={walleticon}alt="Transactions Icon" />
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
  const username = localStorage.getItem('username') || 'Guest'; // Retrieve username or default to 'Guest'

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
          <span className="user-name">{username}</span> {/* Display the dynamic username */}
          <span className="user-handle">@{username.toLowerCase()}22</span>
          <img src={arrow} alt="arrow down" className="arrow-icon" />
        </div>
      </div>
    </div>
  );
}


// StatisticCard Component
function StatisticCard({ price, name, change, iconColor }) {
  return (
    <div className="statistic-card">
      <div className="icon" style={{ backgroundColor: iconColor }}>
        <img src="https://placeholder.pics/svg/52x52" alt="icon" width="52" height="52" />
      </div>
      <div className="stats">
        <div className="price">{price}</div>
        <div className="name">{name}</div>
      </div>
      <div className="change">
        <img src="https://placeholder.pics/svg/18x18" alt="arrow" width="18" height="18" />
        <span className="percentage">{change}</span>
      </div>
    </div>
  );
}

// LiveMarket Component
const LiveMarket = () => {
  const data = [
    { name: 'Ethereum', symbol: 'ETH / USDT', change: '+14.02%', price: '39,786 USD', graphColor: 'blue' },
    { name: 'Bitcoin', symbol: 'BTC / USDT', change: '+4.02%', price: '21,786 USD', graphColor: 'orange' },
    { name: 'Litecoin', symbol: 'LTC / USDT', change: '-4.02%', price: '9,786 USD', graphColor: 'purple' },
    { name: 'Cardano', symbol: 'ADA / USDT', change: '+0.02%', price: '4,786 USD', graphColor: 'green' },
  ];

  return (
    <div className="live-market">
      <h2>Live Market</h2>
      <div className="market-list">
        {data.map((item, index) => (
          <div key={index} className="market-item">
            <div className="market-info">
              <div className="market-name">
                <img src={bitcoin} alt="icon" className="market-icon" />
                <div>
                  <div className="name">{item.name}</div>
                  <div className="symbol">{item.symbol}</div>
                </div>
              </div>
              <div className="market-change" style={{ color: item.change.includes('-') ? '#ff8d4d' : '#1ecb4f' }}>
                Change
                <span>{item.change}</span>
              </div>
              <div className="market-price">
                Price
                <span>{item.price}</span>
              </div>
            </div>
            <div className="market-graph">
              <img src={`https://placeholder.pics/svg/162x40/${item.graphColor}`} alt="graph" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

function Dashboard() {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="bitcoin-chart-and-cards">
          {/* Statistics Cards */}
          <div className="statistics">
            <StatisticCard price="$40,291" name="Bitcoin - BTC" change="+0.25%" iconColor="#f2a900" />
            <StatisticCard price="$18,291" name="Ethereum - ETH" change="+0.25%" iconColor="#627eea" />
            <StatisticCard price="$8,291" name="Litecoin - ITL" change="+0.25%" iconColor="#345c9c" />
            <StatisticCard price="$3,291" name="Cardano - ADA" change="-2.05%" iconColor="#3cc29e" />
          </div>

          {/* Bitcoin Chart */}
          <div className="bitcoin-chart">
            <h2>Bitcoin Price Over the Last 6 Months</h2>
            <PriceGraph />
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
