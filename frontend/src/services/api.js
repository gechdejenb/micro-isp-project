import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; // Replace with your actual base URL

const apiService = {
  fetchNetworkMetrics: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/network-metrics`);
      return response.data;
    } catch (error) {
      console.error('Error fetching network metrics:', error);
      throw error;
    }
  },

  fetchAiInsights: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/ai-insights`);
      return response.data;
    } catch (error) {
      console.error('Error fetching AI insights:', error);
      throw error;
    }
  },

  fetchLoggedData: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/logged-data`);
      return response.data;
    } catch (error) {
      console.error('Error fetching logged data:', error);
      throw error;
    }
  }
};

export default apiService;