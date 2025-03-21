"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createChatSession } from '@/lib/gemini';
import { usePathname } from 'next/navigation';

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
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname() || '';

  // Set isMounted on client-side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Reset chat session when navigating to data destruction page
  useEffect(() => {
    if (!isMounted) return;
    
    if (pathname.includes('/services/data-destruction')) {
      // Add a welcome message specific to the data destruction page
      const dataDestructionWelcome: Message = {
        id: Date.now().toString(),
        role: 'bot',
        content: "Welcome to our Secure Data Destruction Services! I can help answer questions about our data destruction methods, security standards, and how we protect your sensitive information. How can I assist you today?",
        timestamp: new Date(),
      };
      
      // Only add the welcome message if there are no messages yet
      if (messages.length === 0) {
        setMessages([dataDestructionWelcome]);
        // Save this welcome message to localStorage to persist it
        localStorage.setItem('chatMessages', JSON.stringify([dataDestructionWelcome]));
      }
    }
  }, [pathname, messages.length, isMounted]);

  // Initialize chat session
  useEffect(() => {
    if (!isMounted) return;
    
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
  }, [isMounted]);

  // Save messages to localStorage when they change
  useEffect(() => {
    if (!isMounted) return;
    
    if (messages.length > 0) {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
  }, [messages, isMounted]);

  // Send message to Gemini API and get response
  const sendMessage = async (content: string) => {
    if (!isMounted || !content.trim()) return;

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
      let responseText;

      if (!chatSession) {
        try {
          // If chat session is not initialized, use the global one or create a new one
          if (!globalChatSession) {
            globalChatSession = createChatSession();
          }
          
          setChatSession(globalChatSession);
          
          // Send message to the session
          const result = await globalChatSession.sendMessage(content);
          responseText = await result.response.text();
        } catch (error) {
          console.error("Error in chat session:", error);
          responseText = "I'm sorry, I'm having trouble connecting to my knowledge base right now. Please try again later.";
        }
      } else {
        try {
          // Send message to existing chat session
          const result = await chatSession.sendMessage(content);
          responseText = await result.response.text();
        } catch (error) {
          console.error("Error sending message to chat session:", error);
          responseText = "I'm sorry, I'm having trouble processing your request right now. Please try again later.";
        }
      }

      // Create a new bot message
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: responseText,
        timestamp: new Date(),
      };

      // Add bot message to state
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error in chat flow:", error);
      
      // Add error message as bot response
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: "I apologize, but I encountered an error while processing your request. Please try again later.",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Clear chat history
  const clearChat = () => {
    if (!isMounted) return;
    
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