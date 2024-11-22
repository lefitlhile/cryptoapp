import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample data for BTC prices (replace with your actual data or API calls)
const data = [
  { date: '2024-01-01', price: 35000 },
  { date: '2024-02-01', price: 38000 },
  { date: '2024-03-01', price: 39000 },
  { date: '2024-04-01', price: 41000 },
  { date: '2024-05-01', price: 42000 },
  { date: '2024-06-01', price: 45000 },
  { date: '2024-07-01', price: 46000 },
];

// Function to format the date to month name
const formatDateToMonth = (date) => {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthIndex = new Date(date).getMonth(); // Get the month index
  return monthNames[monthIndex]; // Return the month name
};

function PriceGraph() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="date" 
          tickFormatter={formatDateToMonth} // Format the X-axis to show month names
        />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="price" 
          stroke="#8884d8" 
          activeDot={{ r: 8 }} 
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default PriceGraph;
