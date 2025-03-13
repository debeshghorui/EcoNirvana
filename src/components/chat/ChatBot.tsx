"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaUser, FaPaperPlane, FaTimes, FaComments, FaTrash } from 'react-icons/fa';
import { useChat, Message } from '@/context/ChatContext';
import { usePathname } from 'next/navigation';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const { messages, isLoading, sendMessage, clearChat } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  
  // Load chatbot state from localStorage on initial render
  useEffect(() => {
    const storedChatState = localStorage.getItem('chatbotOpen');
    if (storedChatState) {
      setIsOpen(storedChatState === 'true');
    }
  }, []);
  
  // Save chatbot state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('chatbotOpen', isOpen.toString());
    
    // Focus the input field when chat is opened
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300); // Delay to allow animation to complete
    }
  }, [isOpen]);
  
  // Handle click outside to close chat
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen && 
        chatWindowRef.current && 
        !chatWindowRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest('button')
      ) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);
  
  // Scroll to bottom of messages when new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      await sendMessage(input);
      setInput('');
    }
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };

  // Chat bubble animation variants
  const chatBubbleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <>
      {/* Chat toggle button */}
      <motion.button
        className="fixed bottom-6 right-6 bg-green-600 text-white rounded-full p-4 shadow-lg z-50 hover:bg-green-700 transition-colors border-2 border-white"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <FaTimes size={24} /> : <FaComments size={24} />}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatWindowRef}
            className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-lg shadow-xl overflow-hidden z-40 flex flex-col border border-gray-300"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            {/* Chat header */}
            <div className="bg-green-600 text-white p-4 flex justify-between items-center">
              <div className="flex items-center">
                <FaRobot className="mr-2" size={20} />
                <h3 className="font-medium">EcoBot</h3>
              </div>
              <button 
                onClick={clearChat}
                className="text-white hover:text-red-200 transition-colors"
                aria-label="Clear chat"
              >
                <FaTrash size={16} />
              </button>
            </div>

            {/* Chat messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-500">
                  <FaRobot size={48} className="mb-4 text-green-500" />
                  <p className="text-center mb-2">Hi! I'm EcoBot, your e-waste recycling assistant.</p>
                  <p className="text-center text-sm">Ask me anything about e-waste recycling, our services, or environmental impact.</p>
                </div>
              ) : (
                <>
                  {messages.map((message: Message) => (
                    <motion.div
                      key={message.id}
                      className={`mb-4 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      variants={chatBubbleVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <div className={`max-w-[80%] ${message.role === 'user' ? 'bg-green-600 text-white' : 'bg-white border border-gray-200 text-gray-800'} rounded-lg px-4 py-2 shadow-sm`}>
                        <div className="flex items-center mb-1">
                          {message.role === 'user' ? (
                            <FaUser size={12} className="mr-2" />
                          ) : (
                            <FaRobot size={12} className="mr-2" />
                          )}
                          <span className="text-xs opacity-75">
                            {message.role === 'user' ? 'You' : 'EcoBot'} • {formatTime(message.timestamp)}
                          </span>
                        </div>
                        <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                      </div>
                    </motion.div>
                  ))}
                  <div ref={messagesEndRef} />
                </>
              )}
              
              {/* Loading indicator */}
              {isLoading && (
                <motion.div 
                  className="flex justify-start mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm">
                    <div className="flex items-center">
                      <FaRobot size={12} className="mr-2" />
                      <span className="text-xs text-gray-500">EcoBot is typing</span>
                    </div>
                    <div className="flex space-x-1 mt-2">
                      <motion.div 
                        className="w-2 h-2 bg-green-600 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8, delay: 0 }}
                      />
                      <motion.div 
                        className="w-2 h-2 bg-green-600 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }}
                      />
                      <motion.div 
                        className="w-2 h-2 bg-green-600 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Chat input */}
            <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 bg-white">
              <div className="flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message here..."
                  className="flex-1 border-2 border-gray-300 rounded-l-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-800 bg-white placeholder-gray-500"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  className={`bg-green-600 text-white rounded-r-lg py-2 px-4 ${isLoading || !input.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'}`}
                  disabled={isLoading || !input.trim()}
                >
                  <FaPaperPlane />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot; 