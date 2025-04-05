"use client";

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaSearch } from 'react-icons/fa';

// List of searchable pages and their paths
const searchOptions = [
  { title: 'Dashboard', path: '/dashboard', keywords: ['home', 'main', 'dashboard'] },
  { title: 'Recycle E-Waste', path: '/recycle', keywords: ['recycle', 'waste', 'electronics', 'dispose'] },
  { title: 'Drop-off Locations', path: '/locations', keywords: ['locations', 'drop', 'centers', 'map'] },
  { title: 'Doorstep Collection', path: '/doorstep', keywords: ['doorstep', 'pickup', 'collection', 'home'] },
  { title: 'Rewards', path: '/rewards', keywords: ['rewards', 'points', 'redeem', 'gift'] },
  { title: 'My Activity', path: '/activity', keywords: ['activity', 'history', 'tracking'] },
  { title: 'Certificates', path: '/certificates', keywords: ['certificates', 'awards', 'achievements'] },
  { title: 'Learn About E-Waste', path: '/learn', keywords: ['learn', 'education', 'guide', 'about'] },
  { title: 'Account Settings', path: '/settings', keywords: ['settings', 'profile', 'account'] },
];

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<typeof searchOptions>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Filter suggestions based on user input
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSuggestions([]);
      return;
    }

    const term = searchTerm.toLowerCase();
    const filtered = searchOptions.filter(option => 
      option.title.toLowerCase().includes(term) || 
      option.keywords.some(keyword => keyword.includes(term))
    );
    
    setSuggestions(filtered);
  }, [searchTerm]);

  // Handle clicks outside the search component to close suggestions
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === 'Enter') {
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        navigateTo(suggestions[selectedIndex].path);
      } else if (suggestions.length > 0) {
        navigateTo(suggestions[0].path);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  // Navigate to selected page
  const navigateTo = (path: string) => {
    setSearchTerm('');
    setShowSuggestions(false);
    router.push(path);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowSuggestions(true);
            setSelectedIndex(-1);
          }}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search..."
          className="w-full bg-white/10 backdrop-blur-md border border-white/20 
                    text-white placeholder-white/60 rounded-full py-2 pl-10 pr-4 
                    focus:outline-none focus:ring-2 focus:ring-white/30"
          aria-label="Search"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaSearch className="h-4 w-4 text-white/60" />
        </div>
      </div>

      {/* Suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute mt-1 w-full bg-white rounded-lg shadow-lg max-h-60 overflow-auto z-50">
          <ul className="py-1">
            {suggestions.map((suggestion, index) => (
              <li 
                key={suggestion.path}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 
                          ${selectedIndex === index ? 'bg-green-50 text-green-700' : 'text-gray-700'}`}
                onClick={() => navigateTo(suggestion.path)}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <div className="font-medium">{suggestion.title}</div>
                <div className="text-xs text-gray-500">{suggestion.path}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
} 