"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaPaperPlane, FaTimes, FaTrash } from 'react-icons/fa';
import { useChat, Message } from '@/context/ChatContext';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const { messages, isLoading, sendMessage, clearChat, setMessages } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [prevMessagesLength, setPrevMessagesLength] = useState(0);
  const [prevIsLoading, setPrevIsLoading] = useState(false);
  const { user } = useAuth();
  // Ref to track if we've already sent initial messages
  const initialMessageSentRef = useRef<{[key: string]: boolean}>({});
  
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
  
  // Scroll to the bottom when chat is opened or messages change
  useEffect(() => {
    if (isOpen && messagesEndRef.current && messages.length > 0) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 350); // Slightly longer delay than focus to ensure animation is complete
    }
  }, [isOpen, messages.length]);
  
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

  // Focus input after response is received
  useEffect(() => {
    // Check if loading has just finished and we have more messages than before
    if (prevIsLoading && !isLoading && messages.length > prevMessagesLength) {
      // This means a bot response was just added
      if (inputRef.current && isOpen) {
        inputRef.current.focus();
      }
    }
    
    // Update previous states for next comparison
    setPrevMessagesLength(messages.length);
    setPrevIsLoading(isLoading);
  }, [isLoading, messages.length, isOpen, prevIsLoading, prevMessagesLength]);

  // Add an immediate welcome message when opening the chat
  const addInitialWelcomeMessage = () => {
    if (messages.length === 0 && isOpen) {
      // Add a welcome message immediately without waiting for API
      const welcomeMessage: Message = {
        id: `welcome-${Date.now()}`,
        role: 'bot',
        content: "I'm here to help with all your e-waste recycling questions. You can ask about our services, locations, data security measures, or environmental impact.",
        timestamp: new Date()
      };
      
      // Only add the welcome message if there are no messages yet
      setMessages([welcomeMessage]);
    }
  };

  // Update the useEffect to add the welcome message immediately
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addInitialWelcomeMessage();
    }
  }, [isOpen]);

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

  // Check if we're on the data destruction page to use blue theme
  const isDataDestructionPage = pathname.includes('/services/data-destruction');

  return (
    <>
      {/* Chat toggle button */}
      <motion.button
        className="fixed bottom-6 right-6 text-white rounded-full shadow-xl z-50 hover:brightness-105"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        suppressHydrationWarning={true}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{ width: '60px', height: '60px' }}
      >
        {isOpen ? (
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-full w-full h-full flex items-center justify-center shadow-lg">
            <FaTimes className="text-white" size={20} />
          </div>
        ) : (
          <div className="bg-white rounded-full w-full h-full flex items-center justify-center shadow-lg overflow-hidden">
            <Image
              src="/images/chatboticon.jpg"
              alt="Chat with EcoBot"
              width={60}
              height={60}
              className="rounded-full object-cover w-full h-full"
            />
          </div>
        )}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatWindowRef}
            className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-2rem)] h-[500px] max-h-[80vh] bg-white rounded-xl shadow-2xl overflow-hidden z-40 flex flex-col border border-gray-200"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {/* Chat header */}
            <div className="bg-gradient-to-r from-green-600 to-green-500 text-white p-4 shadow-md flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-8 h-8 mr-2 bg-white rounded-full overflow-hidden shadow-sm">
                  <Image
                    src="/images/chatboticon.jpg"
                    alt="EcoBot"
                    width={32}
                    height={32}
                    className="rounded-full object-cover w-full h-full"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">EcoBot</h3>
                  <p className="text-xs text-green-100">Your E-Waste Recycling Assistant</p>
                </div>
              </div>
              <button 
                onClick={clearChat}
                className="text-white opacity-80 hover:opacity-100 transition-opacity hover:bg-white/10 p-2 rounded-full"
                aria-label="Clear chat"
              >
                <FaTrash size={14} />
              </button>
            </div>

            {/* Chat messages */}
            <div 
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
            >
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-500 p-4">
                  <div className="w-16 h-16 mb-4 bg-white rounded-full overflow-hidden">
                    <Image
                      src="/images/chatboticon.jpg"
                      alt="EcoBot"
                      width={64}
                      height={64}
                      className="rounded-full object-cover w-full h-full"
                    />
                  </div>
                  <p className="text-center font-medium text-gray-700 mb-2">Hi! I'm EcoBot</p>
                  <p className="text-center text-sm">Ask me anything about e-waste recycling, our services, or environmental impact.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message: Message) => (
                    <motion.div
                      key={message.id}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      variants={chatBubbleVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <div className={`max-w-[85%] ${
                        message.role === 'user' 
                          ? 'bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg rounded-bl-lg' 
                          : 'bg-white border border-gray-200 text-gray-800 rounded-t-lg rounded-br-lg'
                      } px-4 py-3 shadow-sm`}>
                        <div className="flex items-center mb-1.5">
                          {message.role === 'user' ? (
                            <div className="bg-green-400 rounded-full p-1 mr-2 w-5 h-5 flex items-center justify-center shadow-sm">
                              <FaUser size={10} className="text-white" />
                            </div>
                          ) : (
                            <div className="bg-white rounded-full mr-2 w-5 h-5 overflow-hidden shadow-sm">
                              <Image
                                src="/images/chatboticon.jpg"
                                alt="EcoBot" 
                                width={20}
                                height={20}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <span className="text-xs opacity-75 font-medium">
                            {message.role === 'user' ? 'You' : 'EcoBot'} • {formatTime(message.timestamp)}
                          </span>
                        </div>
                        <p className="whitespace-pre-wrap text-sm leading-relaxed">
                          {message.content}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
              
              {/* Loading indicator */}
              {isLoading && (
                <motion.div
                  className="flex justify-start"
                  variants={chatBubbleVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="max-w-[85%] bg-white border border-gray-200 text-gray-800 rounded-t-lg rounded-br-lg px-4 py-3 shadow-sm">
                    <div className="flex items-center mb-1.5">
                      <div className="bg-white rounded-full mr-2 w-5 h-5 overflow-hidden shadow-sm">
                        <Image
                          src="/images/chatboticon.jpg"
                          alt="EcoBot" 
                          width={20}
                          height={20}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-xs opacity-75 font-medium">
                        EcoBot • {formatTime(new Date())}
                      </span>
                    </div>
                    <div className="flex space-x-2 items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Chat input */}
            <form onSubmit={handleSubmit} className="border-t border-gray-200 p-3 bg-white">
              <div className="flex items-center bg-gray-50 rounded-lg overflow-hidden border border-gray-200 focus-within:ring-2 focus-within:ring-green-500 focus-within:border-green-500 shadow-sm">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message here..."
                  className="flex-1 py-3 px-4 bg-transparent focus:outline-none text-gray-800 placeholder-gray-500"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  className={`p-3 ${isLoading || !input.trim() ? 'text-gray-400' : 'text-green-600 hover:text-green-700'}`}
                  disabled={isLoading || !input.trim()}
                >
                  <FaPaperPlane size={16} />
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