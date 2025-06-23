import axios from 'axios';

// Base URL for API calls
const API_URL = '/api';

// Create axios instance with credentials
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Important for cookies
  headers: {
    'Content-Type': 'application/json'
  }
});

// Get all stickers
export const getAllStickers = async () => {
  try {
    const response = await api.get('/stickers');
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// Get stickers by user ID
export const getUserStickers = async (userId) => {
  try {
    const response = await api.get(`/stickers/user/${userId}`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// Create a new sticker
export const createSticker = async (stickerData) => {
  try {
    const response = await api.post('/stickers', stickerData);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// Update a sticker
export const updateSticker = async (id, stickerData) => {
  try {
    const response = await api.put(`/stickers/${id}`, stickerData);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// Delete a sticker
export const deleteSticker = async (id) => {
  try {
    const response = await api.delete(`/stickers/${id}`);
    return response.data;
  } catch (error) {
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
  getAllStickers,
  getUserStickers,
  createSticker,
  updateSticker,
  deleteSticker
};