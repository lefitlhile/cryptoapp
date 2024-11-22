
import axios from 'axios';

const COINCAP_API_URL = 'https://api.coincap.io/v2';
const API_KEY = 'd7c8879d-78de-4855-b7a1-c532da0b66f6';  // Replace with your CoinCap API key

// Function to fetch Bitcoin prices for the last 6 months (180 days)
export const fetchBitcoinPrices = async () => {
  try {
    const response = await axios.get(`${COINCAP_API_URL}/assets/bitcoin/history`, {
      params: {
        interval: 'd', // Daily data
        start: Date.now() - 180 * 24 * 60 * 60 * 1000, // 180 days ago
        end: Date.now(), // Current time
      },
      headers: {
        'Authorization': `Bearer ${API_KEY}`, // Authorization header with API key
      }
    });

    return response.data.data; // CoinCap returns data in a 'data' field
  } catch (error) {
    console.error('Error fetching Bitcoin data:', error);
    throw error;
  }
};
