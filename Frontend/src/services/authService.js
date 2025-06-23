import axios from 'axios';

// Base URL for API calls
const API_URL = '/api/auth';

// Create axios instance with credentials
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Important for cookies
  headers: {
    'Content-Type': 'application/json'
  }
});

// Register a new user
export const register = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// Login user
export const login = async (credentials) => {
  try {
    const response = await api.post('/login', credentials);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// Demo login
export const demoLogin = async () => {
  try {
    const response = await api.post('/demo-login');
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// Logout user
export const logout = async () => {
  try {
    const response = await api.post('/logout');
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// Get current user
export const getCurrentUser = async () => {
  try {
    const response = await api.get('/me');
    return response.data;
  } catch (error) {
    // Don't throw for auth errors, just return null
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      return null;
    }
    throw handleError(error);
  }
};

// Helper function to handle errors
const handleError = (error) => {
  if (error.response && error.response.data) {
    // Return the error message from the server
    return {
      message: error.response.data.message || 'Something went wrong',
      status: error.response.status,
      ...error.response.data
    };
  }
  
  // Network error or other issues
  return {
    message: error.message || 'Network error. Please try again later.',
    status: 500
  };
};

export default {
  register,
  login,
  demoLogin,
  logout,
  getCurrentUser
};