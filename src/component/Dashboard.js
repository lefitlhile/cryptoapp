import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import axios from 'axios'; // For API calls
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
import chatbotIcon from './img/chat-box (2).png';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import Transaction from './Transaction'; 

// Chatbot Modal Component
const ChatbotModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="chatbot-modal">
      <div className="chatbot-header">
        <h3>Chat with Us</h3>
        <button onClick={onClose}>Close</button>
      </div>
      <div className="chatbot-body">
        <p>This is a placeholder chat window.</p>
      </div>
    </div>
  );
};
const StatisticCard = ({ price, name, change, icon, priceHistory }) => {
  const isPositive = change.startsWith('+');

  return (
    <div className="statistic-card">
      {/* Top-right Section: Arrow and Change */}
      <div className="top-right">
        <img
          src={vector}
          alt={isPositive ? 'arrow up' : 'arrow down'}
          style={{
            transform: isPositive ? 'rotate(0deg)' : 'rotate(180deg)',
            filter: isPositive
              ? 'none'
              : 'invert(25%) sepia(66%) saturate(5936%) hue-rotate(354deg) brightness(94%) contrast(103%)',
          }}
          className="arrow"
        />
        <span className="change" style={{ color: isPositive ? 'green' : 'red' }}>
          {change}
        </span>
      </div>

      {/* Left Section: Icon */}
      <div className="icon">
        <img src={icon} alt={`${name} icon`} />
      </div>

      {/* Middle Section: Price */}
      <div className="price">{price}</div>

      {/* Bottom Section: Crypto Name */}
      <div className="name">{name}</div>

      {/* Right Section: Line Chart */}
      <div className="chart">
        <ResponsiveContainer width="100%" height={40}>
          <LineChart data={priceHistory}>
            <Line
              type="monotone"
              dataKey="price"
              stroke={isPositive ? '#00b300' : '#ff4d4d'}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};


const LiveMarket = () => {
  const [marketData, setMarketData] = useState([]);

  const cryptoIcons = {
    bitcoin: bitcoin,
    ethereum: etherum,
    litecoin: litecoin,
    cardano: cardano,
  };

  const fetchMarketData = async () => {
    try {
      const response = await axios.get("https://api.coincap.io/v2/assets", {
        params: {
          ids: "bitcoin,ethereum,litecoin,cardano",
          limit: 4,
        },
      });

      if (response?.data?.data) {
        const marketDataWithHistory = await Promise.all(
          response.data.data.map(async (market) => {
            const historyResponse = await axios.get(
              `https://api.coincap.io/v2/assets/${market.id}/history`,
              {
                params: {
                  interval: "h1",
                  start: Date.now() - 24 * 60 * 60 * 1000, // Last 24 hours
                  end: Date.now(),
                },
              }
            );

            const priceHistory = historyResponse.data.data.map((entry) => ({
              time: new Date(entry.time).toLocaleTimeString(),
              price: parseFloat(entry.priceUsd),
            }));

            return {
              ...market,
              priceHistory,
            };
          })
        );

        setMarketData(marketDataWithHistory);
      }
    } catch (error) {
      console.error("Error fetching market data", error);
    }
  };

  useEffect(() => {
    fetchMarketData();
    const interval = setInterval(fetchMarketData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="live-market">
      <h2>Live Market</h2>
      {/* Table Header */}
      <div className="market-header">
        <span className="header-name">Crypto</span>
        <span className="header-price">Prices</span>
        <span className="header-change">Change</span>
        <span className="header-chart"></span>
      </div>

      {/* Market List */}
      <div className="market-list">
        {marketData.length > 0 ? (
          marketData.map((market, index) => {
            const changePercent = parseFloat(market.changePercent24Hr);
            const formattedChange = !isNaN(changePercent)
              ? (changePercent > 0 ? "+" : "") + changePercent.toFixed(2) + "%"
              : "N/A";

            return (
              <div key={index} className="market-item">
                {/* Crypto Name and Icon */}
                <div className="market-info">
                  <img
                    src={cryptoIcons[market.id.toLowerCase()]}
                    alt={`${market.name} icon`}
                  />
                  <div className="market-details">
                    <div className="market-name">{market.name}</div>
                    <div className="market-symbol">{market.symbol}</div>
                  </div>
                </div>

                {/* Current Prices */}
                <span className="market-price" style={{ color: "#000" }}>
                  ${parseFloat(market.priceUsd).toLocaleString()}
                </span>

                {/* Percentage Change */}
                <span
                  className="market-change"
                  style={{
                    color: changePercent >= 0 ? "green" : "orange",
                  }}
                >
                  {formattedChange}
                </span>

                {/* Prices Chart */}
                <div className="market-chart">
                  <ResponsiveContainer width={100} height={40}>
                    <LineChart data={market.priceHistory || []}>
                      <Line
                        type="monotone"
                        dataKey="price"
                        stroke={changePercent >= 0 ? "#00b300" : "#ff9900"}
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
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
const Sidebar = () => (
  <div className="sidebar">
    <div className="logo">
      <img src={logo} alt="Logo" />
    </div>
    <nav className="navigation">
      <ul>
        <li className="active">
          <WindowIcon />
          <span>Overview</span>
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

// Header Component
const Header = () => {
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
};

// Dashboard Component
const Dashboard = () => {
  const [bitcoinPriceHistory, setBitcoinPriceHistory] = useState([]);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch historical Bitcoin data
  const fetchBitcoinPriceHistory = async () => {
    try {
      const response = await axios.get('https://api.coincap.io/v2/assets/bitcoin/history', {
        params: {
          interval: 'd1',
          start: Date.now() - 180 * 24 * 60 * 60 * 1000,
          end: Date.now(),
        },
      });

      const prices = response.data.data.map(item => ({
        timestamp: item.timestamp,
        price: item.priceUsd,
      }));

      setBitcoinPriceHistory(prices);
    } catch (error) {
      console.error('Error fetching historical data', error);
    }
  };

  // Check if the user is authenticated (JWT token present)
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login'); // Redirect to login if no token
    } else {
      fetchBitcoinPriceHistory();
    }
  }, [navigate]);

  const handleChatbotToggle = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

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
            <h2>BTC Price</h2>
            <PriceGraph priceHistory={bitcoinPriceHistory} />
          </div>
        </div>
        <div className="live-market-and-transactions">
          <LiveMarket />
          <div className="transaction-box">
            <Transaction /> {/* Transaction component in a small box */}
          </div>
        </div>
        <div className="chatbot-icon" onClick={handleChatbotToggle}>
          <img src={chatbotIcon} alt="Chatbot Icon" />
        </div>
        <ChatbotModal isOpen={isChatbotOpen} onClose={handleChatbotToggle} />
      </div>
    </div>
  );
};

export default Dashboard;
