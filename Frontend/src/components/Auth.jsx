import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Auth = () => {
  const navigate = useNavigate();
  const { login, register, demoLogin, isAuthenticated, loading: authLoading } = useAuth();
  
  // State for form toggle
  const [isSignIn, setIsSignIn] = useState(true);
  
  // Form data states
  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  });
  
  const [signUpData, setSignUpData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  // Error states
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  
  // Loading state
  const [isLoading, setIsLoading] = useState(false);
  
  // Password visibility toggle
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      navigate('/');
    }
  }, [isAuthenticated, authLoading, navigate]);
  
  // Demo login
  const handleDemoLogin = async () => {
    setIsLoading(true);
    
    try {
      const result = await demoLogin();
      
      if (result && result.success) {
        setFormSuccess('Demo login successful!');
        // Redirect will happen automatically due to the useEffect above
      } else {
        setFormError(result?.error || 'Demo login failed');
      }
    } catch (error) {
      setFormError(error.message || 'Demo login failed');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Form validation
  const validateSignIn = () => {
    const newErrors = {};
    
    if (!signInData.email) {
      newErrors.signInEmail = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(signInData.email)) {
      newErrors.signInEmail = 'Email is invalid';
    }
    
    if (!signInData.password) {
      newErrors.signInPassword = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const validateSignUp = () => {
    const newErrors = {};
    
    if (!signUpData.username) {
      newErrors.username = 'Username is required';
    } else if (signUpData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    if (!signUpData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(signUpData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!signUpData.password) {
      newErrors.password = 'Password is required';
    } else if (signUpData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!signUpData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (signUpData.password !== signUpData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Form submission handlers
  const handleSignIn = async (e) => {
    e.preventDefault();
    setFormError('');
    
    if (validateSignIn()) {
      setIsLoading(true);
      
      try {
        const result = await login(signInData);
        
        if (result && result.success) {
          setFormSuccess('Login successful!');
          // Redirect will happen automatically due to the useEffect above
        } else {
          setFormError(result?.error || 'Invalid credentials');
        }
      } catch (error) {
        setFormError(error.message || 'Login failed');
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  const handleSignUp = async (e) => {
    e.preventDefault();
    setFormError('');
    
    if (validateSignUp()) {
      setIsLoading(true);
      
      try {
        const result = await register(signUpData);
        
        if (result && result.success) {
          setFormSuccess('Account created successfully!');
          // Redirect will happen automatically due to the useEffect above
        } else {
          setFormError(result?.error || 'Registration failed');
        }
      } catch (error) {
        setFormError(error.message || 'Registration failed');
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  // Input change handlers
  const handleSignInChange = (e) => {
    const { name, value } = e.target;
    setSignInData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setSignUpData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Clear errors when switching forms
  useEffect(() => {
    setErrors({});
    setFormError('');
    setFormSuccess('');
  }, [isSignIn]);
  
  // If still checking auth status, show loading
  if (authLoading) {
    return (
      <div className="auth-container">
        <div className="auth-bg-glow-1"></div>
        <div className="auth-bg-glow-2"></div>
        <div className="auth-loading">
          <span className="loading-spinner large"></span>
          <p>Loading...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="auth-container">
      {/* Background Elements */}
      <div className="auth-bg-glow-1"></div>
      <div className="auth-bg-glow-2"></div>
      
      <div className="auth-card">
        {/* Form Toggle */}
        <div className="auth-tabs">
          <button 
            className={`auth-tab ${isSignIn ? 'active' : ''}`}
            onClick={() => setIsSignIn(true)}
          >
            Sign In
          </button>
          <button 
            className={`auth-tab ${!isSignIn ? 'active' : ''}`}
            onClick={() => setIsSignIn(false)}
          >
            Sign Up
          </button>
        </div>
        
        {/* Form Container with Animation */}
        <div className="auth-form-container">
          <div className={`auth-form-slider ${isSignIn ? 'sign-in-active' : 'sign-up-active'}`}>
            {/* Sign In Form */}
            <div className="auth-form sign-in-form">
              <h2 className="auth-title">Welcome back, sticker hunter</h2>
              
              {formError && <div className="auth-error-message">{formError}</div>}
              {formSuccess && <div className="auth-success-message">{formSuccess}</div>}
              
              <form onSubmit={handleSignIn}>
                <div className="form-group">
                  <div className="input-icon-wrapper">
                    <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={signInData.email}
                      onChange={handleSignInChange}
                      className={errors.signInEmail ? 'error' : ''}
                    />
                  </div>
                  {errors.signInEmail && <div className="input-error">{errors.signInEmail}</div>}
                </div>
                
                <div className="form-group">
                  <div className="input-icon-wrapper">
                    <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      value={signInData.password}
                      onChange={handleSignInChange}
                      className={errors.signInPassword ? 'error' : ''}
                    />
                    <button 
                      type="button" 
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                          <line x1="1" y1="1" x2="23" y2="23"></line>
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                      )}
                    </button>
                  </div>
                  {errors.signInPassword && <div className="input-error">{errors.signInPassword}</div>}
                </div>
                
                <button 
                  type="submit" 
                  className="auth-button sign-in-button"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="loading-spinner"></span>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </form>
              
              <div className="auth-divider">
                <span>or</span>
              </div>
              
              <button 
                className="demo-button"
                onClick={handleDemoLogin}
                disabled={isLoading}
              >
                Try Demo Login
              </button>
            </div>
            
            {/* Sign Up Form */}
            <div className="auth-form sign-up-form">
              <h2 className="auth-title">Join the sticker community</h2>
              
              {formError && <div className="auth-error-message">{formError}</div>}
              {formSuccess && <div className="auth-success-message">{formSuccess}</div>}
              
              <form onSubmit={handleSignUp}>
                <div className="form-group">
                  <div className="input-icon-wrapper">
                    <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      value={signUpData.username}
                      onChange={handleSignUpChange}
                      className={errors.username ? 'error' : ''}
                    />
                  </div>
                  {errors.username && <div className="input-error">{errors.username}</div>}
                </div>
                
                <div className="form-group">
                  <div className="input-icon-wrapper">
                    <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={signUpData.email}
                      onChange={handleSignUpChange}
                      className={errors.email ? 'error' : ''}
                    />
                  </div>
                  {errors.email && <div className="input-error">{errors.email}</div>}
                </div>
                
                <div className="form-group">
                  <div className="input-icon-wrapper">
                    <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      value={signUpData.password}
                      onChange={handleSignUpChange}
                      className={errors.password ? 'error' : ''}
                    />
                    <button 
                      type="button" 
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                          <line x1="1" y1="1" x2="23" y2="23"></line>
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                      )}
                    </button>
                  </div>
                  {errors.password && <div className="input-error">{errors.password}</div>}
                </div>
                
                <div className="form-group">
                  <div className="input-icon-wrapper">
                    <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={signUpData.confirmPassword}
                      onChange={handleSignUpChange}
                      className={errors.confirmPassword ? 'error' : ''}
                    />
                    <button 
                      type="button" 
                      className="password-toggle"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                          <line x1="1" y1="1" x2="23" y2="23"></line>
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && <div className="input-error">{errors.confirmPassword}</div>}
                </div>
                
                <button 
                  type="submit" 
                  className="auth-button sign-up-button"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="loading-spinner"></span>
                  ) : (
                    'Sign Up'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
        
        {/* Back to Home Link */}
        <div className="back-to-home">
          <Link to="/">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Auth;