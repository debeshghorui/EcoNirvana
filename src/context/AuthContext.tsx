"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { 
  Auth,
  User as FirebaseUser,
  GoogleAuthProvider,
  FacebookAuthProvider,
  AuthProvider as FirebaseAuthProvider
} from 'firebase/auth';

// Create an interface for the firebase services
interface FirebaseServices {
  auth: Auth | null;
  googleProvider: GoogleAuthProvider | null;
  facebookProvider: FacebookAuthProvider | null;
}

// Define user type
type User = {
  id: string;
  name: string;
  email: string;
  photoURL?: string;
};

// Define auth context type
type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  loginWithFacebook: () => Promise<boolean>;
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
  loginWithGoogle: async () => false,
  loginWithFacebook: async () => false,
  logout: () => {},
  error: null,
  justLoggedOut: false,
});

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);

// Initialize Firebase SDK only on client side
async function initializeFirebase(): Promise<FirebaseServices> {
  if (typeof window === 'undefined') {
    return { auth: null, googleProvider: null, facebookProvider: null };
  }

  try {
    // Dynamic imports for Firebase modules
    const { initializeApp, getApps, getApp } = await import('firebase/app');
    const { 
      getAuth, 
      GoogleAuthProvider, 
      FacebookAuthProvider 
    } = await import('firebase/auth');

    // Firebase configuration
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
    };

    // Initialize Firebase only once
    const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    const auth = getAuth(app);

    // Initialize auth providers
    const googleProvider = new GoogleAuthProvider();
    googleProvider.addScope('profile');
    googleProvider.addScope('email');

    const facebookProvider = new FacebookAuthProvider();
    facebookProvider.addScope('email');
    facebookProvider.addScope('public_profile');

    return { auth, googleProvider, facebookProvider };
  } catch (error) {
    console.error("Failed to initialize Firebase:", error);
    return { auth: null, googleProvider: null, facebookProvider: null };
  }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [justLoggedOut, setJustLoggedOut] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [firebase, setFirebase] = useState<FirebaseServices>({ 
    auth: null, 
    googleProvider: null, 
    facebookProvider: null 
  });

  // Initialize Firebase on the client side only
  useEffect(() => {
    const init = async () => {
      setIsMounted(true);
      const firebaseServices = await initializeFirebase();
      setFirebase(firebaseServices);
    };
    
    init();
  }, []);

  // Check if user is logged in on initial load and set up auth listener
  useEffect(() => {
    if (!isMounted || !firebase.auth) return;
    
    const setupAuthListener = async () => {
      try {
        // Dynamically import required functions
        const { onAuthStateChanged } = await import('firebase/auth');
        
        // Check if firebase.auth is not null before using it
        if (!firebase.auth) {
          console.error("Firebase auth is not initialized");
          setLoading(false);
          return () => {};
        }
        
        // Set up auth state listener
        const unsubscribe = onAuthStateChanged(firebase.auth, (firebaseUser: any) => {
          if (firebaseUser) {
            const userData: User = {
              id: firebaseUser.uid,
              name: firebaseUser.displayName || 'User',
              email: firebaseUser.email || '',
              photoURL: firebaseUser.photoURL || undefined,
            };
            setUser(userData);
          } else {
            setUser(null);
          }
          setLoading(false);
        }, (error: any) => {
          console.error("Auth state listener error:", error);
          setLoading(false);
        });
        
        // Return cleanup function
        return unsubscribe;
      } catch (error) {
        console.error("Failed to setup auth listener:", error);
        setLoading(false);
        return () => {};
      }
    };
    
    // Setup the listener and store the cleanup function
    const unsubscribePromise = setupAuthListener();
    
    // Clean up listener on unmount
    return () => {
      unsubscribePromise.then(unsubscribe => unsubscribe());
    };
  }, [isMounted, firebase.auth]);

  // General social login handler with improved error handling
  const socialLogin = async (provider: FirebaseAuthProvider | null): Promise<boolean> => {
    if (!isMounted || !firebase.auth || !provider) return false;
    
    setError(null);
    setLoading(true);
    
    try {
      // Reset any previous errors
      setError(null);
      
      // Import required functions
      const { signInWithPopup, signInWithRedirect, getRedirectResult } = await import('firebase/auth');
      
      // Check if we're returning from a redirect
      if (typeof window !== 'undefined') {
        try {
          const result = await getRedirectResult(firebase.auth);
          if (result) {
            console.log("Redirect login successful for user:", result.user.email);
            setLoading(false);
            return true;
          }
        } catch (redirectError: any) {
          console.error("Redirect result error:", redirectError.code, redirectError.message);
        }
        
        const urlParams = new URLSearchParams(window.location.search);
        const mode = urlParams.get('mode');
        const oobCode = urlParams.get('oobCode');
        
        // Handle any redirects first
        if (mode && oobCode) {
          console.log("Detected auth redirect with mode:", mode);
          // Let Firebase handle the redirect
          return true;
        }
      }
      
      console.log("Starting social login process with provider:", provider.providerId);
      
      try {
        // First try popup method
        const result = await signInWithPopup(firebase.auth, provider);
        const firebaseUser = result.user;
        console.log("Social login successful for user:", firebaseUser.email);
        
        setLoading(false);
        return true;
      } catch (popupError: any) {
        // If popup fails with specific errors, try redirect method
        console.error("Popup error:", popupError.code, popupError.message);
        
        if (popupError.code === 'auth/popup-blocked' || 
            popupError.code === 'auth/popup-closed-by-user' ||
            popupError.code === 'auth/cancelled-popup-request') {
          
          console.log("Popup was blocked or closed, trying redirect method instead");
          
          // Inform user that we're switching to redirect method
          setError('Popup was blocked. Redirecting to login page...');
          
          // Short delay to show the message
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          // Try redirect method instead
          await signInWithRedirect(firebase.auth, provider);
          return false; // The page will reload, so we return false here
        }
        
        // Handle other errors
        if (popupError.code === 'auth/account-exists-with-different-credential') {
          setError('An account already exists with the same email address but different sign-in credentials.');
        } else if (popupError.code === 'auth/network-request-failed') {
          setError('Network error. Please check your internet connection.');
        } else {
          setError(`Social login failed: ${popupError.message || 'Unknown error'}`);
        }
        
        throw popupError; // Re-throw to be caught by outer try/catch
      }
    } catch (err: any) {
      console.error('Social login error:', err.code, err.message);
      setLoading(false);
      return false;
    }
  };

  // Login with Google
  const loginWithGoogle = async (): Promise<boolean> => {
    return socialLogin(firebase.googleProvider);
  };
  
  // Login with Facebook
  const loginWithFacebook = async (): Promise<boolean> => {
    return socialLogin(firebase.facebookProvider);
  };

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    if (!isMounted || !firebase.auth) return false;
    
    setError(null);
    setLoading(true);
    
    try {
      // Import required functions
      const { signInWithEmailAndPassword } = await import('firebase/auth');
      
      console.log("Attempting to sign in with:", email);
      const userCredential = await signInWithEmailAndPassword(firebase.auth, email, password);
      const firebaseUser = userCredential.user;
      console.log("Login successful for user:", firebaseUser.email);
      
      // User logged in successfully
      setLoading(false);
      return true;
    } catch (err: any) {
      console.error('Login error with code:', err.code, err.message);
      
      // Handle specific Firebase auth errors
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError('Invalid email or password');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many login attempts. Please try again later');
      } else if (err.code === 'auth/configuration-not-found') {
        setError('Authentication service is not properly configured');
      } else if (err.code === 'auth/invalid-credential') {
        setError('Invalid login credentials');
      } else if (err.code === 'auth/network-request-failed') {
        setError('Network error. Please check your internet connection');
      } else {
        setError(`Login failed: ${err.message || 'Unknown error'}`);
      }
      
      setLoading(false);
      return false;
    }
  };

  // Signup function with improved validation
  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    if (!isMounted || !firebase.auth) return false;
    
    setError(null);
    setLoading(true);
    
    try {
      // Import required functions
      const { createUserWithEmailAndPassword, updateProfile } = await import('firebase/auth');
      
      if (!email || !password || !name) {
        setError('Please fill in all fields');
        setLoading(false);
        return false;
      }
      
      // Simple email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError('Please enter a valid email address');
        setLoading(false);
        return false;
      }
      
      console.log("Attempting to create user with:", email);
      
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(firebase.auth, email, password);
      const firebaseUser = userCredential.user;
      
      console.log("User created successfully, updating profile for:", firebaseUser.email);
      
      // Update user profile with name
      await updateProfile(firebaseUser, {
        displayName: name
      });
      
      console.log("Profile updated successfully with name:", name);
      
      // User created successfully
      setLoading(false);
      return true;
    } catch (err: any) {
      console.error('Signup error with code:', err.code, err.message);
      
      // Handle specific Firebase auth errors
      if (err.code === 'auth/email-already-in-use') {
        setError('Email is already in use');
      } else if (err.code === 'auth/weak-password') {
        setError('Password is too weak');
      } else if (err.code === 'auth/invalid-email') {
        setError('Invalid email address');
      } else if (err.code === 'auth/configuration-not-found') {
        setError('Authentication service is not properly configured');
      } else if (err.code === 'auth/invalid-credential') {
        setError('Invalid credentials. Please try again with different credentials');
      } else if (err.code === 'auth/network-request-failed') {
        setError('Network error. Please check your internet connection');
      } else {
        setError(`Signup failed: ${err.message || 'Unknown error'}`);
      }
      
      setLoading(false);
      return false;
    }
  };

  // Logout function
  const logout = async () => {
    if (!isMounted || !firebase.auth) return;
    
    try {
      // Import required functions
      const { signOut } = await import('firebase/auth');
      
      await signOut(firebase.auth);
      setJustLoggedOut(true);
      
      // Reset the flag after a short delay
      setTimeout(() => {
        setJustLoggedOut(false);
      }, 1000);
    } catch (err: any) {
      console.error('Logout error:', err);
    }
  };

  const value = {
    user,
    loading,
    login,
    signup,
    loginWithGoogle,
    loginWithFacebook,
    logout,
    error,
    justLoggedOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 