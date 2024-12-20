import axios from 'axios';
import API from './apiService';

// Base URL for the backend
const API_URL = import.meta.env.API_BASE_URl;

// Function to handle user signup
export const signupUser = async (userData) => {
  try {
    const response = await API.post("/signup/user", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Signup failed';
  }
};

// Function to handle user login
export const loginUser = async (userData) => {
  try {
    const response = await API.post("/login/user", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Login failed';
  }
};

// Function to verify OTP for user
export const verifyOtp = async (otpData) => {
  try {
    const response = await API.post("/verify-otp/user", otpData);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'OTP verification failed';
  }
};

// Similar functions for other endpoints (forgot-password, reset-password, etc.) will be added soon
