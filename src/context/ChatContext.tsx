"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createChatSession } from '@/lib/gemini';

// Define message type
export type Message = {
  id: string;
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
};

// Define chat context type
type ChatContextType = {
  messages: Message[];
  isLoading: boolean;
  sendMessage: (message: string) => Promise<void>;
  clearChat: () => void;
};

// Create context with default values
const ChatContext = createContext<ChatContextType>({
  messages: [],
  isLoading: false,
  sendMessage: async () => {},
  clearChat: () => {},
});

// Custom hook to use chat context
export const useChat = () => useContext(ChatContext);

// Create a singleton chat session to persist across renders
let globalChatSession: any = null;

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chatSession, setChatSession] = useState<any>(null);

  // Initialize chat session
  useEffect(() => {
    // Use the global session if it exists, otherwise create a new one
    if (!globalChatSession) {
      globalChatSession = createChatSession();
    }
    
    setChatSession(globalChatSession);
    
    // Load messages from localStorage if available
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        // Convert string timestamps back to Date objects
        const messagesWithDateObjects = parsedMessages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(messagesWithDateObjects);
      } catch (error) {
        console.error('Error parsing saved messages:', error);
      }
    }

    // Cleanup function
    return () => {
      // Don't destroy the global session on unmount
    };
  }, []);

  // Save messages to localStorage when they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
  }, [messages]);

  // Send message to Gemini API and get response
  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Create a new user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    // Add user message to state
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      if (!chatSession) {
        // If chat session is not initialized, use the global one or create a new one
        if (!globalChatSession) {
          globalChatSession = createChatSession();
        }
        
        setChatSession(globalChatSession);
        
        // Send message to the session
        const result = await globalChatSession.sendMessage(content);
        const responseText = await result.response.text();

        // Create a new bot message
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'bot',
          content: responseText,
          timestamp: new Date(),
        };

        // Add bot message to state
        setMessages((prev) => [...prev, botMessage]);
      } else {
        // Send message to existing chat session
        const result = await chatSession.sendMessage(content);
        const responseText = await result.response.text();

        // Create a new bot message
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'bot',
          content: responseText,
          timestamp: new Date(),
        };

        // Add bot message to state
        setMessages((prev) => [...prev, botMessage]);
      }
    } catch (error) {
      console.error('Error sending message to Gemini:', error);
      
      // Create an error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: 'Sorry, I encountered an error. Please try again later.',
        timestamp: new Date(),
      };

      // Add error message to state
      setMessages((prev) => [...prev, errorMessage]);
      
      // Try to recreate the chat session
      globalChatSession = createChatSession();
      setChatSession(globalChatSession);
    } finally {
      setIsLoading(false);
    }
  };

  // Clear chat history
  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem('chatMessages');
    globalChatSession = createChatSession();
    setChatSession(globalChatSession);
  };

  return (
    <ChatContext.Provider value={{ messages, isLoading, sendMessage, clearChat }}>
      {children}
    </ChatContext.Provider>
  );
}; 