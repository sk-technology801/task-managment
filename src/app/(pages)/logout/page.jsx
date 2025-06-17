'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const [theme, setTheme] = useState('white'); // white or black
  const router = useRouter();

  const handleLogout = () => {
    // Simulate logout (e.g., clear session, localStorage, etc.)
    alert('Logged out successfully!');
    router.push('/'); // Redirect to homepage or login page
  };

  const toggleTheme = () => {
    setTheme(theme === 'white' ? 'black' : 'white');
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-300 relative overflow-hidden ${
        theme === 'white' ? 'bg-gray-100' : 'bg-gray-900'
      }`}
    >
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className={`absolute top-4 right-4 px-2 py-1 rounded-md text-sm ${
          theme === 'white'
            ? 'bg-gray-300 text-gray-800 hover:bg-gray-400'
            : 'bg-gray-600 text-gray-100 hover:bg-gray-500'
        } focus:outline-none focus:ring-2 ${
          theme === 'white' ? 'focus:ring-gray-500' : 'focus:ring-gray-300'
        }`}
        aria-label={`Switch to ${theme === 'white' ? 'black' : 'white'} theme`}
      >
        {theme === 'white' ? 'Dark Mode' : 'Light Mode'}
      </button>

      {/* Confirmation Box */}
      <div
        className={`p-6 rounded-lg shadow-md text-center max-w-sm w-full transition-transform duration-300 transform hover:scale-105 ${
          theme === 'white' ? 'bg-white' : 'bg-gray-800'
        }`}
      >
        <h2
          className={`text-lg font-medium mb-4 ${
            theme === 'white' ? 'text-gray-900' : 'text-gray-100'
          }`}
        >
          Confirm Logout
        </h2>
        <p
          className={`text-sm mb-6 ${
            theme === 'white' ? 'text-gray-700' : 'text-gray-200'
          }`}
        >
          Are you sure you want to log out?
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleLogout}
            className={`px-4 py-1 rounded-md focus:outline-none focus:ring-2 ${
              theme === 'white'
                ? 'bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-500'
                : 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-300'
            }`}
          >
            Logout
          </button>
          <a
            href="/profile"
            className={`px-4 py-1 rounded-md focus:outline-none focus:ring-2 ${
              theme === 'white'
                ? 'bg-gray-300 text-gray-800 hover:bg-gray-400 focus:ring-gray-500'
                : 'bg-gray-600 text-gray-100 hover:bg-gray-500 focus:ring-gray-300'
            }`}
          >
            Cancel
          </a>
        </div>
      </div>

      {/* Wave Animation */}
      <div className="absolute bottom-0 left-0 w-full h-24 overflow-hidden">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
        >
          <path
            d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z"
            className={`fill-current ${
              theme === 'white' ? 'text-gray-200' : 'text-gray-700'
            } animate-wave`}
          />
        </svg>
      </div>
    </div>
  );
}