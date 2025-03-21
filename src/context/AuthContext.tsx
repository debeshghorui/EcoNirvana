"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

// Define user type
type User = {
  id: string;
  name: string;
  email: string;
};

// Define auth context type
type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  error: string | null;
  justLoggedOut: boolean;
};

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => false,
  signup: async () => false,
  logout: () => {},
  error: null,
  justLoggedOut: false,
});

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [justLoggedOut, setJustLoggedOut] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Check if user is logged in on initial load
  useEffect(() => {
    setIsMounted(true);
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        // Handle potential JSON parse error
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    if (!isMounted) return false;
    
    setError(null);
    setLoading(true);
    
    try {
      // In a real app, this would be an API call to your backend
      // For demo purposes, we'll simulate a successful login with mock data
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple validation (in a real app, this would be handled by your backend)
      if (email === 'demo@example.com' && password === 'password123') {
        const userData: User = {
          id: '1',
          name: 'Demo User',
          email: email,
        };
        
        // Save user to state and localStorage
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        setLoading(false);
        return true;
      } else {
        setError('Invalid email or password');
        setLoading(false);
        return false;
      }
    } catch (err) {
      setError('An error occurred during login');
      setLoading(false);
      return false;
    }
  };

  // Signup function
  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    if (!isMounted) return false;
    
    setError(null);
    setLoading(true);
    
    try {
      // In a real app, this would be an API call to your backend
      // For demo purposes, we'll simulate a successful signup with mock data
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple validation (in a real app, this would be handled by your backend)
      if (email && password && name) {
        const userData: User = {
          id: Math.random().toString(36).substr(2, 9), // Generate random ID
          name: name,
          email: email,
        };
        
        // Save user to state and localStorage
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        setLoading(false);
        return true;
      } else {
        setError('Please fill in all fields');
        setLoading(false);
        return false;
      }
    } catch (err) {
      setError('An error occurred during signup');
      setLoading(false);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    if (!isMounted) return;
    
    setUser(null);
    localStorage.removeItem('user');
    setJustLoggedOut(true);
    
    // Reset the flag after a short delay
    setTimeout(() => {
      setJustLoggedOut(false);
    }, 1000);
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    error,
    justLoggedOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 