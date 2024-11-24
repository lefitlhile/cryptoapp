import React from 'react';

// Import images if they're in the src folder (this is the preferred method in React)
import ethereumIcon from './img/Group 332.png';
import bitcoinIcon from './img/Group 332 (1).png';
import litecoinIcon from './img/Group 332 (1).png';

// Sample transaction data (replace with your dynamic data if needed)
const transactions = [
  {
    icon: ethereumIcon, 
    name: 'Ethereum',
    type: 'Received',
    amount: '$24,102',
    time: 'Today, 19:30',
  },
  {
    icon: bitcoinIcon,  
    name: 'Bitcoin',
    type: 'Buy',
    amount: '$4,157',
    time: 'Today, 14:32',
  },
  {
    icon: bitcoinIcon,  
    name: 'Bitcoin',
    type: 'Buy',
    amount: '$64,784',
    time: 'Today, 13:50',
  },
  {
    icon: litecoinIcon,  
    name: 'Litecoin',
    type: 'Buy',
    amount: '$14,265',
    time: 'Today, 09:38',
  },
];

const Transaction = () => {
  return (
    <div>
      <div className="transaction-heading">
        Transactions
      </div>
      {transactions.map((transaction, index) => (
        <div className="transaction-row" key={index}>
          {/* Container for icon and text */}
          <div className="transaction-details">
            <img src={transaction.icon} alt="Crypto Icon" className="crypto-icon" />
            <div className="transaction-info">
              <div className="crypto-name">{transaction.name}</div>
              <div className="transaction-type">{transaction.type}</div>
            </div>
          </div>

         
          <div className="transaction-amount">{transaction.amount}</div>
          
        
          <div className="transaction-time">{transaction.time}</div>
        </div>
      ))}
    </div>
  );
};

export default Transaction;
