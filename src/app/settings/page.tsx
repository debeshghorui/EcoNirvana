"use client";

import { useState, useEffect, FormEvent, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaLock, FaBell, FaShieldAlt, FaTrash, FaArrowLeft, FaCalendarAlt, FaCamera, FaTimes } from 'react-icons/fa';
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-green-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <div className="mb-6">
          <button 
            onClick={() => router.back()}
            className="flex items-center text-gray-700 hover:text-green-700 transition-colors font-medium"
            aria-label="Go back"
          >
            <FaArrowLeft className="h-5 w-5 mr-2" />
            <span>Back</span>
          </button>
        </div>
        
        <div className="md:flex md:gap-8">
          {/* Sidebar */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Settings</h2>
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg w-full text-left transition-colors ${
                    activeTab === 'profile'
                      ? 'bg-green-100 text-green-800 shadow-sm'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <FaUser className={`mr-3 h-5 w-5 ${activeTab === 'profile' ? 'text-green-600' : 'text-gray-500'}`} />
                  Profile Information
                </button>
                <button
                  onClick={() => setActiveTab('password')}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg w-full text-left transition-colors ${
                    activeTab === 'password'
                      ? 'bg-green-100 text-green-800 shadow-sm'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <FaLock className={`mr-3 h-5 w-5 ${activeTab === 'password' ? 'text-green-600' : 'text-gray-500'}`} />
                  Password
                </button>
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg w-full text-left transition-colors ${
                    activeTab === 'notifications'
                      ? 'bg-green-100 text-green-800 shadow-sm'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <FaBell className={`mr-3 h-5 w-5 ${activeTab === 'notifications' ? 'text-green-600' : 'text-gray-500'}`} />
                  Notifications
                </button>
                <button
                  onClick={() => setActiveTab('account')}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg w-full text-left transition-colors ${
                    activeTab === 'account'
                      ? 'bg-green-100 text-green-800 shadow-sm'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <FaShieldAlt className={`mr-3 h-5 w-5 ${activeTab === 'account' ? 'text-green-600' : 'text-gray-500'}`} />
                  Account
                </button>
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="md:w-3/4">
            <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
              {/* Success/Error Messages */}
              {successMessage && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 bg-green-100 border-l-4 border-green-500 p-4 text-green-800 rounded-r-md"
                >
                  <p className="font-medium">{successMessage}</p>
                </motion.div>
              )}
              
              {errorMessage && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 bg-red-100 border-l-4 border-red-500 p-4 text-red-800 rounded-r-md"
                >
                  <p className="font-medium">{errorMessage}</p>
                </motion.div>
              )}
              
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile Information</h2>
                  <form onSubmit={handleProfileUpdate} className="space-y-6">
                    {/* Profile Picture */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Profile Picture
                      </label>
                      <div className="flex items-center space-x-4">
                        <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200 shadow-sm">
                          {profilePicture ? (
                            <Image 
                              src={profilePicture} 
                              alt="Profile" 
                              fill 
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100">
                              <FaUser className="h-12 w-12 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col space-y-3">
                          <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleProfilePictureChange}
                            className="hidden"
                            id="profile-picture-input"
                          />
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

                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
                        Full name
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaUser className="h-5 w-5 text-gray-500" />
                        </div>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 font-medium"
                          placeholder="Your full name"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                        Email address
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaEnvelope className="h-5 w-5 text-gray-500" />
                        </div>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 font-medium"
                          placeholder="your.email@example.com"
                          suppressHydrationWarning
                        />
                      </div>
                    </div>
                    
                    {/* Date of Birth */}
                    <div>
                      <label htmlFor="dateOfBirth" className="block text-sm font-semibold text-gray-700 mb-1">
                        Date of Birth
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaCalendarAlt className="h-5 w-5 text-gray-500" />
                        </div>
                        <input
                          id="dateOfBirth"
                          name="dateOfBirth"
                          type="date"
                          value={dateOfBirth}
                          onChange={(e) => setDateOfBirth(e.target.value)}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 font-medium"
                        />
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`inline-flex justify-center py-2.5 px-6 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors ${
                          isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                      >
                        {isSubmitting ? 'Saving...' : 'Save Changes'}
                      </button>
                    </div>
                  </form>
                </div>
              )}
              
              {/* Password Tab */}
              {activeTab === 'password' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Change Password</h2>
                  <form onSubmit={handlePasswordChange} className="space-y-6">
                    <div>
                      <label htmlFor="current-password" className="block text-sm font-semibold text-gray-700 mb-1">
                        Current password
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaLock className="h-5 w-5 text-gray-500" />
                        </div>
                        <input
                          id="current-password"
                          name="current-password"
                          type="password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 font-medium"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="new-password" className="block text-sm font-semibold text-gray-700 mb-1">
                        New password
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaLock className="h-5 w-5 text-gray-500" />
                        </div>
                        <input
                          id="new-password"
                          name="new-password"
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 font-medium"
                          placeholder="••••••••"
                        />
                      </div>
                      <p className="mt-1.5 text-xs text-gray-600 font-medium">
                        Password must be at least 8 characters long
                      </p>
                    </div>
                    
                    <div>
                      <label htmlFor="confirm-password" className="block text-sm font-semibold text-gray-700 mb-1">
                        Confirm new password
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaLock className="h-5 w-5 text-gray-500" />
                        </div>
                        <input
                          id="confirm-password"
                          name="confirm-password"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 font-medium"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`inline-flex justify-center py-2.5 px-6 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors ${
                          isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                      >
                        {isSubmitting ? 'Changing Password...' : 'Change Password'}
                      </button>
                    </div>
                  </form>
                </div>
              )}
              
              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Notification Settings</h2>
                  <form onSubmit={handleNotificationUpdate} className="space-y-6">
                    <div className="space-y-5">
                      <div className="flex items-start bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <div className="flex items-center h-5">
                          <input
                            id="email-notifications"
                            name="email-notifications"
                            type="checkbox"
                            checked={emailNotifications}
                            onChange={(e) => setEmailNotifications(e.target.checked)}
                            className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="email-notifications" className="font-semibold text-gray-800">
                            Email notifications
                          </label>
                          <p className="text-gray-600 mt-1">
                            Receive email notifications about your recycling activities and upcoming events.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <div className="flex items-center h-5">
                          <input
                            id="marketing-emails"
                            name="marketing-emails"
                            type="checkbox"
                            checked={marketingEmails}
                            onChange={(e) => setMarketingEmails(e.target.checked)}
                            className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="marketing-emails" className="font-semibold text-gray-800">
                            Marketing emails
                          </label>
                          <p className="text-gray-600 mt-1">
                            Receive emails about new services, promotions, and recycling tips.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`inline-flex justify-center py-2.5 px-6 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors ${
                          isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                      >
                        {isSubmitting ? 'Saving...' : 'Save Changes'}
                      </button>
                    </div>
                  </form>
                </div>
              )}
              
              {/* Account Tab */}
              {activeTab === 'account' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Account Settings</h2>
                  
                  <div className="border-t border-gray-200 pt-6 mt-6">
                    <h3 className="text-lg font-semibold text-red-600">Danger Zone</h3>
                    <p className="mt-1 text-sm text-gray-600">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <div className="mt-5">
                      <button
                        type="button"
                        onClick={handleAccountDeletion}
                        disabled={isSubmitting}
                        className={`inline-flex items-center justify-center py-2.5 px-6 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors ${
                          isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                      >
                        <FaTrash className="mr-2" />
                        {isSubmitting ? 'Deleting Account...' : 'Delete Account'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 