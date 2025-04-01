"use client";

import { useState, useEffect, FormEvent, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaLock, FaBell, FaShieldAlt, FaTrash, FaArrowLeft, FaCalendarAlt, FaCamera, FaTimes, FaCheck } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';

export default function SettingsPage() {
  const router = useRouter();
  const { user, loading, logout, justLoggedOut, updateProfile } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [activeTab, setActiveTab] = useState('profile');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user && !justLoggedOut) {
      router.push('/login');
    } else if (user) {
      // Populate form with user data
      setName(user.name);
      setEmail(user.email);
      if (user.dateOfBirth) setDateOfBirth(user.dateOfBirth);
      if (user.profilePicture) setProfilePicture(user.profilePicture);
    }
  }, [user, loading, router, justLoggedOut]);
  
  // Handle profile picture upload
  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle removing profile picture
  const handleRemoveProfilePicture = () => {
    setProfilePicture(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Handle profile update
  const handleProfileUpdate = async (e: FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call to update the user's profile
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update the user profile in the auth context
      updateProfile({
        name,
        email,
        dateOfBirth,
        profilePicture
      });
      
      // Simulate successful update
      setSuccessMessage('Profile updated successfully');
    } catch (err) {
      setErrorMessage('Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle password change
  const handlePasswordChange = async (e: FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);
    setIsSubmitting(true);
    
    try {
      // Validate passwords
      if (newPassword !== confirmPassword) {
        setErrorMessage('New passwords do not match');
        setIsSubmitting(false);
        return;
      }
      
      // In a real app, this would be an API call to change the password
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful update
      setSuccessMessage('Password changed successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setErrorMessage('Failed to change password');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle notification settings update
  const handleNotificationUpdate = async (e: FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call to update notification settings
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful update
      setSuccessMessage('Notification settings updated successfully');
    } catch (err) {
      setErrorMessage('Failed to update notification settings');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle account deletion
  const handleAccountDeletion = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      setSuccessMessage(null);
      setErrorMessage(null);
      setIsSubmitting(true);
      
      try {
        // In a real app, this would be an API call to delete the account
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Logout and redirect to home page
        logout();
        router.push('/');
      } catch (err) {
        setErrorMessage('Failed to delete account');
        setIsSubmitting(false);
      }
    }
  };
  
  // Show loading state
  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-gray-50 to-blue-50 py-12">
      {/* Decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute top-1/3 -left-24 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Page header with back button */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
          <button 
            onClick={() => router.back()}
            className="flex items-center text-gray-700 hover:text-green-600 transition-colors font-medium group"
            aria-label="Go back"
          >
            <span className="flex items-center justify-center h-8 w-8 rounded-full bg-white shadow-sm group-hover:shadow mr-2 transition-all">
              <FaArrowLeft className="h-4 w-4 text-gray-600 group-hover:text-green-600" />
            </span>
            <span>Back to Dashboard</span>
          </button>
          
          <h1 className="text-2xl font-bold text-gray-800 hidden sm:block">Account Settings</h1>
        </div>
        
        <div className="md:flex md:gap-8">
          {/* Sidebar */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100 backdrop-blur bg-opacity-75">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Settings</h2>
              <nav className="space-y-3">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`flex items-center px-4 py-3.5 text-sm font-medium rounded-xl w-full text-left transition-all ${
                    activeTab === 'profile'
                      ? 'bg-gradient-to-r from-green-50 to-green-100 text-green-800 shadow-sm border border-green-200'
                      : 'text-gray-700 hover:bg-gray-50 border border-transparent'
                  }`}
                >
                  <div className={`flex items-center justify-center h-8 w-8 rounded-lg mr-3 ${
                    activeTab === 'profile' 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                    <FaUser className="h-4 w-4" />
                  </div>
                  <span>Profile Information</span>
                </button>
                <button
                  onClick={() => setActiveTab('password')}
                  className={`flex items-center px-4 py-3.5 text-sm font-medium rounded-xl w-full text-left transition-all ${
                    activeTab === 'password'
                      ? 'bg-gradient-to-r from-green-50 to-green-100 text-green-800 shadow-sm border border-green-200'
                      : 'text-gray-700 hover:bg-gray-50 border border-transparent'
                  }`}
                >
                  <div className={`flex items-center justify-center h-8 w-8 rounded-lg mr-3 ${
                    activeTab === 'password' 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                    <FaLock className="h-4 w-4" />
                  </div>
                  <span>Password</span>
                </button>
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`flex items-center px-4 py-3.5 text-sm font-medium rounded-xl w-full text-left transition-all ${
                    activeTab === 'notifications'
                      ? 'bg-gradient-to-r from-green-50 to-green-100 text-green-800 shadow-sm border border-green-200'
                      : 'text-gray-700 hover:bg-gray-50 border border-transparent'
                  }`}
                >
                  <div className={`flex items-center justify-center h-8 w-8 rounded-lg mr-3 ${
                    activeTab === 'notifications' 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                    <FaBell className="h-4 w-4" />
                  </div>
                  <span>Notifications</span>
                </button>
                <button
                  onClick={() => setActiveTab('account')}
                  className={`flex items-center px-4 py-3.5 text-sm font-medium rounded-xl w-full text-left transition-all ${
                    activeTab === 'account'
                      ? 'bg-gradient-to-r from-green-50 to-green-100 text-green-800 shadow-sm border border-green-200'
                      : 'text-gray-700 hover:bg-gray-50 border border-transparent'
                  }`}
                >
                  <div className={`flex items-center justify-center h-8 w-8 rounded-lg mr-3 ${
                    activeTab === 'account' 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                    <FaShieldAlt className="h-4 w-4" />
                  </div>
                  <span>Account</span>
                </button>
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="md:w-3/4">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 backdrop-blur bg-opacity-75 transition-all">
              {/* Success/Error Messages */}
              {successMessage && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="mb-6 bg-green-50 border border-green-200 p-4 text-green-800 rounded-xl flex items-start"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center mr-3">
                    <FaCheck className="text-green-600 w-4 h-4" />
                  </div>
                  <p className="font-medium">{successMessage}</p>
                </motion.div>
              )}
              
              {errorMessage && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="mb-6 bg-red-50 border border-red-200 p-4 text-red-800 rounded-xl flex items-start"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center mr-3">
                    <FaTimes className="text-red-600 w-4 h-4" />
                  </div>
                  <p className="font-medium">{errorMessage}</p>
                </motion.div>
              )}
              
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex justify-between items-center mb-6 pb-2 border-b border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-800">Profile Information</h2>
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <FaUser className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                  <form onSubmit={handleProfileUpdate} className="space-y-8">
                    {/* Profile Picture */}
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                      <label className="block text-sm font-semibold text-gray-700 mb-4">
                        Profile Picture
                      </label>
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                        <div className="relative w-28 h-28 rounded-full overflow-hidden bg-white border-2 border-gray-200 shadow-lg mx-auto sm:mx-0">
                          {profilePicture ? (
                            <Image 
                              src={profilePicture} 
                              alt="Profile" 
                              fill 
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-50">
                              <FaUser className="h-12 w-12 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col space-y-3 sm:flex-1">
                          <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleProfilePictureChange}
                            className="hidden"
                            id="profile-picture-input"
                          />
                          <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 inline-flex items-center transition-colors"
                            >
                              <FaCamera className="mr-2 text-gray-600" /> Upload Photo
                            </button>
                            {profilePicture && (
                              <button
                                type="button"
                                onClick={handleRemoveProfilePicture}
                                className="py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-red-600 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 inline-flex items-center transition-colors"
                              >
                                <FaTimes className="mr-2" /> Remove
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
                          Full name
                        </label>
                        <div className="mt-1 relative rounded-lg shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <FaUser className="h-5 w-5 text-gray-500" />
                          </div>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="block w-full pl-12 pr-3 py-3.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 font-medium bg-white"
                            placeholder="Your full name"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                          Email address
                        </label>
                        <div className="mt-1 relative rounded-lg shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <FaEnvelope className="h-5 w-5 text-gray-500" />
                          </div>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="block w-full pl-12 pr-3 py-3.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 font-medium bg-white"
                            placeholder="your.email@example.com"
                            suppressHydrationWarning
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Date of Birth */}
                    <div>
                      <label htmlFor="dateOfBirth" className="block text-sm font-semibold text-gray-700 mb-1">
                        Date of Birth
                      </label>
                      <div className="mt-1 relative rounded-lg shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <FaCalendarAlt className="h-5 w-5 text-gray-500" />
                        </div>
                        <input
                          id="dateOfBirth"
                          name="dateOfBirth"
                          type="date"
                          value={dateOfBirth}
                          onChange={(e) => setDateOfBirth(e.target.value)}
                          className="block w-full pl-12 pr-3 py-3.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 font-medium bg-white"
                        />
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-100 flex justify-end">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`inline-flex justify-center py-3 px-6 border border-transparent rounded-lg shadow-lg text-sm font-medium text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors ${
                          isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Saving...
                          </>
                        ) : (
                          'Save Changes'
                        )}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
              
              {/* Password Tab */}
              {activeTab === 'password' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex justify-between items-center mb-6 pb-2 border-b border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-800">Change Password</h2>
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <FaLock className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                  
                  <form onSubmit={handlePasswordChange} className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 mb-6">
                      <p className="text-sm text-gray-700">
                        Your password must be at least 8 characters long and include a mix of uppercase, lowercase, numbers, and special characters for better security.
                      </p>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="current-password" className="block text-sm font-semibold text-gray-700 mb-1">
                          Current password
                        </label>
                        <div className="mt-1 relative rounded-lg shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <FaLock className="h-5 w-5 text-gray-500" />
                          </div>
                          <input
                            id="current-password"
                            name="current-password"
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="block w-full pl-12 pr-3 py-3.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 font-medium bg-white"
                            placeholder="••••••••"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="new-password" className="block text-sm font-semibold text-gray-700 mb-1">
                          New password
                        </label>
                        <div className="mt-1 relative rounded-lg shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <FaLock className="h-5 w-5 text-gray-500" />
                          </div>
                          <input
                            id="new-password"
                            name="new-password"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="block w-full pl-12 pr-3 py-3.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 font-medium bg-white"
                            placeholder="••••••••"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="confirm-password" className="block text-sm font-semibold text-gray-700 mb-1">
                          Confirm new password
                        </label>
                        <div className="mt-1 relative rounded-lg shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <FaLock className="h-5 w-5 text-gray-500" />
                          </div>
                          <input
                            id="confirm-password"
                            name="confirm-password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="block w-full pl-12 pr-3 py-3.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 font-medium bg-white"
                            placeholder="••••••••"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-100 flex justify-end">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`inline-flex justify-center py-3 px-6 border border-transparent rounded-lg shadow-lg text-sm font-medium text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors ${
                          isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Updating...
                          </>
                        ) : (
                          'Change Password'
                        )}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
              
              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex justify-between items-center mb-6 pb-2 border-b border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-800">Notification Settings</h2>
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <FaBell className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                  
                  <form onSubmit={handleNotificationUpdate} className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 mb-6">
                      <p className="text-sm text-gray-700">
                        Configure how and when you'd like to receive notifications from EcoNirvana.
                      </p>
                    </div>
                    
                    <div className="space-y-5">
                      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-start">
                          <div className="flex items-center h-6 mt-0.5">
                            <input
                              id="email-notifications"
                              name="email-notifications"
                              type="checkbox"
                              checked={emailNotifications}
                              onChange={(e) => setEmailNotifications(e.target.checked)}
                              className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3">
                            <label htmlFor="email-notifications" className="text-base font-semibold text-gray-800">
                              Email notifications
                            </label>
                            <p className="text-sm text-gray-600 mt-1">
                              Receive email notifications about your recycling activities and upcoming events.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-start">
                          <div className="flex items-center h-6 mt-0.5">
                            <input
                              id="marketing-emails"
                              name="marketing-emails"
                              type="checkbox"
                              checked={marketingEmails}
                              onChange={(e) => setMarketingEmails(e.target.checked)}
                              className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3">
                            <label htmlFor="marketing-emails" className="text-base font-semibold text-gray-800">
                              Marketing emails
                            </label>
                            <p className="text-sm text-gray-600 mt-1">
                              Receive emails about new services, promotions, and recycling tips.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-100 flex justify-end">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`inline-flex justify-center py-3 px-6 border border-transparent rounded-lg shadow-lg text-sm font-medium text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors ${
                          isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Saving...
                          </>
                        ) : (
                          'Save Preferences'
                        )}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
              
              {/* Account Tab */}
              {activeTab === 'account' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex justify-between items-center mb-6 pb-2 border-b border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-800">Account Settings</h2>
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <FaShieldAlt className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mb-8">
                    <h3 className="text-lg font-medium text-gray-800 mb-3">Account Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="block text-gray-500">Name</span>
                        <span className="block font-medium text-gray-900">{name || 'Not specified'}</span>
                      </div>
                      <div>
                        <span className="block text-gray-500">Email</span>
                        <span className="block font-medium text-gray-900">{email || 'Not specified'}</span>
                      </div>
                      <div>
                        <span className="block text-gray-500">Member Since</span>
                        <span className="block font-medium text-gray-900">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}</span>
                      </div>
                      <div>
                        <span className="block text-gray-500">Last Login</span>
                        <span className="block font-medium text-gray-900">{user?.lastLoginAt ? new Date(user.lastLoginAt).toLocaleDateString() : 'Unknown'}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-red-50 p-6 rounded-xl border border-red-100 mt-8">
                    <div className="flex items-center mb-4">
                      <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                        <FaTrash className="h-5 w-5 text-red-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-red-700">Delete Account</h3>
                    </div>
                    <p className="text-sm text-red-600 mb-6">
                      When you delete your account, all your personal information and activity history will be permanently removed. This action cannot be undone.
                    </p>
                    <button
                      type="button"
                      onClick={handleAccountDeletion}
                      disabled={isSubmitting}
                      className={`inline-flex items-center justify-center py-3 px-6 border border-transparent rounded-lg shadow-lg text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors ${
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Deleting...
                        </>
                      ) : (
                        <>
                          <FaTrash className="mr-2 h-4 w-4" />
                          Delete Account
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 