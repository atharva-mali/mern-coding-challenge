import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api'; // Adjust based on your server URL

// Function to fetch transactions for a selected month with pagination and search
export const getTransactions = (month, searchQuery, page = 1) => {
  return axios
    .get(`${BASE_URL}/transactions`, {
      params: {
        month,
        search: searchQuery,
        page,
      },
    })
    .then((response) => response.data)  // Return data directly for easier use
    .catch((error) => {
      console.error('Error fetching transactions:', error);
      throw error;  // Rethrow to handle in the component
    });
};

// Function to fetch transaction statistics for a selected month
export const getStatistics = (month) => {
  return axios
    .get(`${BASE_URL}/statistics`, { params: { month } })
    .then((response) => response.data)  // Return data directly for easier use
    .catch((error) => {
      console.error('Error fetching statistics:', error);
      throw error;  // Rethrow to handle in the component
    });
};

// Function to fetch price range data for a selected month
export const getPriceRangeData = (month) => {
  return axios
    .get(`${BASE_URL}/transactions`, { params: { month } })
    .then((response) => response.data)  // Return data directly for easier use
    .catch((error) => {
      console.error('Error fetching price range data:', error);
      throw error;  // Rethrow to handle in the component
    });
};
