import React, { createContext, useState, useEffect, useContext } from 'react';
import { getCurrentUser, login, register, logout, demoLogin } from '../services/authService';

// Create context
const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        setLoading(true);
        const response = await getCurrentUser();
        if (response && response.success) {
          setUser(response.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error('Auth check error:', err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Login function
  const handleLogin = async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      const response = await login(credentials);
      if (response.success) {
        setUser(response.user);
        return { success: true };
      }
    } catch (err) {
      setError(err.message || 'Login failed');
      return { success: false, error: err.message || 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const handleRegister = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await register(userData);
      if (response.success) {
        setUser(response.user);
        return { success: true };
      }
    } catch (err) {
      setError(err.message || 'Registration failed');
      return { success: false, error: err.message || 'Registration failed' };
    } finally {
      setLoading(false);
    }
  };

  // Demo login function
  const handleDemoLogin = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await demoLogin();
      if (response.success) {
        setUser(response.user);
        return { success: true };
      }
    } catch (err) {
      setError(err.message || 'Demo login failed');
      return { success: false, error: err.message || 'Demo login failed' };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const handleLogout = async () => {
    try {
      setLoading(true);
      await logout();
      setUser(null);
      return { success: true };
    } catch (err) {
      setError(err.message || 'Logout failed');
      return { success: false, error: err.message || 'Logout failed' };
    } finally {
      setLoading(false);
    }
  };

  // Context value
  const value = {
    user,
    loading,
    error,
    login: handleLogin,
    register: handleRegister,
    demoLogin: handleDemoLogin,
    logout: handleLogout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;