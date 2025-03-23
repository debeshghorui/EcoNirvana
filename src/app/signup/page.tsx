"use client";

import { useState, FormEvent, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaLock, FaGoogle, FaFacebook, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  
  const router = useRouter();
  const { signup, loginWithGoogle, loginWithFacebook, error } = useAuth();

  // Add useEffect for client-side mounting to prevent hydration mismatch
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Skip rendering form content until client-side hydration is complete
  if (!hasMounted) {
    return <div className="min-h-screen bg-[#D5FFE5] py-12" suppressHydrationWarning={true}></div>;
  }

  // Password validation function
  const validatePassword = (password: string): string | null => {
    if (password.length < 6) {
      return 'Password must be at least 6 characters long';
    }
    return null;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setIsSubmitting(true);
    
    try {
      // Validate form
      if (!name || !email || !password || !confirmPassword) {
        setFormError('Please fill in all fields');
        setIsSubmitting(false);
        return;
      }
      
      // Validate password strength
      const passwordError = validatePassword(password);
      if (passwordError) {
        setFormError(passwordError);
        setIsSubmitting(false);
        return;
      }
      
      if (password !== confirmPassword) {
        setFormError('Passwords do not match');
        setIsSubmitting(false);
        return;
      }
      
      if (!agreeTerms) {
        setFormError('You must agree to the terms and conditions');
        setIsSubmitting(false);
        return;
      }
      
      console.log("Attempting signup with:", { name, email, password: "***" });
      
      // Attempt signup with Firebase
      const success = await signup(name, email, password);
      
      if (success) {
        // Redirect to dashboard
        router.push('/dashboard');
      } else {
        // Display error from auth context or a generic message
        setFormError(error || 'Signup failed');
        
        // Special handling for common errors
        if (error) {
          if (error.includes('not properly configured')) {
            setFormError('Authentication service is currently unavailable. Please try again later or contact support.');
            console.error("Authentication configuration error detected");
          } else if (error.includes('unavailable')) {
            setFormError('Authentication service is currently unavailable. Please check your internet connection or try again later.');
            console.error("Authentication service unavailable");
          }
        }
      }
    } catch (err: any) {
      console.error("Signup error:", err);
      setFormError(err?.message || 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add handler functions for social logins
  const handleGoogleSignup = async () => {
    setFormError(null);
    setIsSubmitting(true);
    
    try {
      console.log("Attempting Google signup");
      const success = await loginWithGoogle();
      
      if (success) {
        // Redirect to dashboard
        router.push('/dashboard');
      } else {
        // Display error from auth context
        setFormError(error || 'Google signup failed');
      }
    } catch (err: any) {
      console.error("Google signup error:", err);
      setFormError(err?.message || 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFacebookSignup = async () => {
    setFormError(null);
    setIsSubmitting(true);
    
    try {
      console.log("Attempting Facebook signup");
      const success = await loginWithFacebook();
      
      if (success) {
        // Redirect to dashboard
        router.push('/dashboard');
      } else {
        // Display error from auth context
        setFormError(error || 'Facebook signup failed');
      }
    } catch (err: any) {
      console.error("Facebook signup error:", err);
      setFormError(err?.message || 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#D5FFE5] py-12">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-xl overflow-hidden md:max-w-4xl">
        <div className="md:flex">
          <div className="md:w-1/2 relative hidden md:block">
            <Image 
              src="/images/freepik__adjust__81957.png" 
              alt="E-waste recycling" 
              fill
              style={{ objectFit: "cover" }}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-green-700 to-green-900 opacity-70"></div>
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="text-white text-center">
                <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
                <p className="mb-6">
                  Create an account to start your e-waste recycling journey and help protect our environment.
                </p>
                <div className="w-16 h-1 bg-white mx-auto"></div>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 p-8">
            <div className="text-center mb-8">
              <Link href="/" className="inline-block">
                <Image 
                  src="/logo.svg" 
                  alt="EcoNirvana Logo" 
                  width={70} 
                  height={70} 
                  className="mx-auto"
                />
              </Link>
              <h2 className="mt-4 text-2xl font-bold text-gray-900">Create an account</h2>
              <p className="mt-2 text-sm text-gray-600">
                Or{' '}
                <Link href="/login" className="text-green-600 hover:text-green-500 font-medium">
                  sign in to your account
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
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="block w-full pl-10 pr-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-800 bg-white placeholder-gray-500"
                    placeholder="John Doe"
                  />
                </div>
              </div>
              
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
                    suppressHydrationWarning
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
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="block w-full pl-10 pr-10 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-800 bg-white placeholder-gray-500"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Password must be at least 6 characters long
                </p>
              </div>
              
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                  Confirm password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="block w-full pl-10 pr-10 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-800 bg-white placeholder-gray-500"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>
              
              <div className="flex items-center">
                <input
                  id="agree-terms"
                  name="agree-terms"
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-2 border-gray-300 rounded"
                />
                <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-700">
                  I agree to the{' '}
                  <Link href="/terms" className="text-green-600 hover:text-green-500 font-medium">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-green-600 hover:text-green-500 font-medium">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Creating account...' : 'Create account'}
                </button>
              </div>
            </form>
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or sign up with</span>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div>
                  <button
                    type="button"
                    onClick={handleGoogleSignup}
                    disabled={isSubmitting}
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <FaGoogle className="h-5 w-5 text-red-500" />
                    <span className="ml-2">Google</span>
                  </button>
                </div>
                
                <div>
                  <button
                    type="button"
                    onClick={handleFacebookSignup}
                    disabled={isSubmitting}
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <FaFacebook className="h-5 w-5 text-blue-600" />
                    <span className="ml-2">Facebook</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 