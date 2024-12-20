import axios from 'axios';

// Base URL for the backend
const API_BASE_URL = 'http://localhost:5000/api';

// Function to handle user signup
export const signupUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup/user`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Signup failed';
  }
};

// Function to handle user login
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login/user`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Login failed';
  }
};

// Function to verify OTP for user
export const verifyOtp = async (otpData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/verify-otp/user`, otpData);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'OTP verification failed';
  }
};

// Similar functions for other endpoints (forgot-password, reset-password, etc.) will be added soon
