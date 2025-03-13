"use client";

import { useState, FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock, FaGoogle, FaFacebook, FaUserAlt } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDemoLoggingIn, setIsDemoLoggingIn] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  
  const router = useRouter();
  const { login, error } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setIsSubmitting(true);
    
    try {
      // Validate form
      if (!email || !password) {
        setFormError('Please fill in all fields');
        setIsSubmitting(false);
        return;
      }
      
      // Attempt login
      const success = await login(email, password);
      
      if (success) {
        // Redirect to dashboard
        router.push('/dashboard');
      } else {
        // Display error from auth context
        setFormError(error || 'Login failed');
      }
    } catch (err) {
      setFormError('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoLogin = async () => {
    setFormError(null);
    setIsDemoLoggingIn(true);
    
    try {
      // Use demo credentials
      const demoEmail = 'demo@example.com';
      const demoPassword = 'password123';
      
      // Simulate typing effect
      setEmail('');
      setPassword('');
      
      // Type email character by character
      for (let i = 0; i < demoEmail.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 50));
        setEmail(demoEmail.substring(0, i + 1));
      }
      
      // Type password character by character
      for (let i = 0; i < demoPassword.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 50));
        setPassword(demoPassword.substring(0, i + 1));
      }
      
      // Wait a moment before submitting
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Attempt login with demo credentials
      const success = await login(demoEmail, demoPassword);
      
      if (success) {
        // Redirect to dashboard
        router.push('/dashboard');
      } else {
        // Display error from auth context
        setFormError(error || 'Demo login failed');
      }
    } catch (err) {
      setFormError('An unexpected error occurred during demo login');
    } finally {
      setIsDemoLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-xl overflow-hidden md:max-w-4xl">
        <div className="md:flex">
          <div className="md:w-1/2 relative hidden md:block">
            <Image 
              src="/login-image.jpg" 
              alt="E-waste recycling" 
              fill
              style={{ objectFit: "cover" }}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-green-700 to-green-900 opacity-80"></div>
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="text-white text-center">
                <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
                <p className="mb-6 text-green-100">
                  Log in to access your account and manage your e-waste recycling activities.
                </p>
                <div className="w-16 h-1 bg-green-400 mx-auto"></div>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 p-8">
            <div className="text-center mb-8">
              <Link href="/" className="inline-block">
                <Image 
                  src="/logo.svg" 
                  alt="EcoRecycle Logo" 
                  width={70} 
                  height={70} 
                  className="mx-auto"
                />
              </Link>
              <h2 className="mt-4 text-2xl font-bold text-gray-900">Sign in to your account</h2>
              <p className="mt-2 text-sm text-gray-600">
                Or{' '}
                <Link href="/signup" className="text-green-600 hover:text-green-500 font-medium">
                  create a new account
                </Link>
              </p>
            </div>
            
            {(formError || error) && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 text-red-700"
              >
                <p>{formError || error}</p>
              </motion.div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="block w-full pl-10 pr-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-800 bg-white placeholder-gray-500"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="block w-full pl-10 pr-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-800 bg-white placeholder-gray-500"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-2 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                
                <div className="text-sm">
                  <Link href="/forgot-password" className="text-green-600 hover:text-green-500 font-medium">
                    Forgot your password?
                  </Link>
                </div>
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting || isDemoLoggingIn}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
                    (isSubmitting || isDemoLoggingIn) ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Signing in...' : 'Sign in'}
                </button>
              </div>
            </form>
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div>
                  <a
                    href="#"
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <FaGoogle className="h-5 w-5 text-red-500" />
                    <span className="ml-2">Google</span>
                  </a>
                </div>
                
                <div>
                  <a
                    href="#"
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <FaFacebook className="h-5 w-5 text-blue-600" />
                    <span className="ml-2">Facebook</span>
                  </a>
                </div>
              </div>
              
              {/* Demo Login Button */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4"
              >
                <button
                  type="button"
                  onClick={handleDemoLogin}
                  disabled={isSubmitting || isDemoLoggingIn}
                  className={`w-full flex justify-center items-center py-2 px-4 border-2 border-green-600 rounded-md shadow-sm text-sm font-medium text-green-700 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
                    (isSubmitting || isDemoLoggingIn) ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  <FaUserAlt className="mr-2" />
                  {isDemoLoggingIn ? 'Logging in...' : 'Try Demo Account'}
                </button>
                <p className="text-xs text-center text-gray-500 mt-2">
                  Want to try without creating an account?
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 