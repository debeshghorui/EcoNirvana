"use client";

// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Log environment detection
console.log("Environment:", process.env.NODE_ENV);
console.log("Firebase config check - API key exists:", !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY);

// Check if environment variables are defined
const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
const messagingSenderId = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID;
const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID;
const measurementId = process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID;

// Verify if essential Firebase config values are available
const isConfigValid = apiKey && authDomain && projectId && appId;

// Log configuration status
console.log("Firebase config valid:", isConfigValid);
if (!isConfigValid) {
  console.log("Missing keys:", {
    apiKey: !!apiKey,
    authDomain: !!authDomain,
    projectId: !!projectId,
    appId: !!appId
  });
}

// Development fallback config - ONLY FOR DEVELOPMENT
// In production you should use environment variables
const devFallbackConfig = {
  apiKey: "AIzaSyACYO628-wFisQ8t98I-RZR8MgskuH-tYI",
  authDomain: "econirvana-a290f.firebaseapp.com",
  projectId: "econirvana-a290f",
  storageBucket: "econirvana-a290f.appspot.com",
  messagingSenderId: "296278406913",
  appId: "1:296278406913:web:2d7d15d817c406e53f4d00",
  measurementId: "G-339W4RX5G4"
};

// Use environment variables if valid, otherwise use dev fallback in development
const firebaseConfig = isConfigValid ? {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId
} : (process.env.NODE_ENV === 'development' ? devFallbackConfig : null);

// Initialize Firebase - only in browser and only if config is valid
let app: FirebaseApp | undefined;
let auth: Auth | undefined;

if (typeof window !== 'undefined' && firebaseConfig) {
  try {
    console.log("Initializing Firebase with config:", 
      process.env.NODE_ENV === 'development' 
        ? { ...firebaseConfig, apiKey: firebaseConfig.apiKey ? "PRESENT" : "MISSING" } 
        : "CONFIG PRESENT");
    
    // Initialize Firebase only once
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    
    // Initialize Firebase Authentication
    auth = getAuth(app);
    
    console.log("Firebase initialized successfully");
  } catch (error) {
    console.error("Firebase initialization error:", error);
  }
} else {
  if (typeof window !== 'undefined') {
    console.error("Firebase config is invalid or missing. Check your environment variables.");
    
    // In development, also suggest using the fallback config
    if (process.env.NODE_ENV === 'development') {
      console.log("For development, you can use the fallback config by ensuring NODE_ENV is set to 'development'");
    }
  }
}

// Only initialize analytics on client side if app is initialized
if (typeof window !== 'undefined' && app) {
  // Import analytics dynamically to prevent SSR issues
  import('firebase/analytics').then(({ getAnalytics }) => {
    try {
      getAnalytics(app!);
    } catch (error) {
      console.error('Analytics initialization failed:', error);
    }
  }).catch(error => {
    console.error('Failed to load analytics:', error);
  });
}

export { app, auth };