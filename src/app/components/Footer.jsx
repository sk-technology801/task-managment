'use client';

import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import Link from 'next/link';
import 'animate.css';

const TaskManagementFooter = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <footer
      className={`${
        theme === 'white' ? 'bg-white/10' : 'bg-gray-800/10'
      } backdrop-blur-lg border-t ${
        theme === 'white' ? 'border-white/20' : 'border-gray-700/20'
      } text-gray-800 py-4 fixed bottom-0 w-full animate__animated animate__fadeIn animate__delay-1s`}
    >
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        {/* App Name and Copyright */}
        <div className="mb-2 md:mb-0">
          <p
            className={`text-sm font-medium ${
              theme === 'white' ? 'text-gray-900' : 'text-gray-100'
            }`}
          >
            TaskPOS &copy; {new Date().getFullYear()}
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-4">
          <Link
            href="/dashboard"
            className={`text-sm ${
              theme === 'white'
                ? 'text-gray-700 hover:text-teal-500'
                : 'text-gray-200 hover:text-teal-300'
            } transition-colors duration-300`}
          >
            Dashboard
          </Link>
          <Link
            href="/tasks"
            className={`text-sm ${
              theme === 'white'
                ? 'text-gray-700 hover:text-teal-500'
                : 'text-gray-200 hover:text-teal-300'
            } transition-colors duration-300`}
          >
            Tasks
          </Link>
          <Link
            href="/profile"
            className={`text-sm ${
              theme === 'white'
                ? 'text-gray-700 hover:text-teal-500'
                : 'text-gray-200 hover:text-teal-300'
            } transition-colors duration-300`}
          >
            Profile
          </Link>
          <Link
            href="/settings"
            className={`text-sm ${
              theme === 'white'
                ? 'text-gray-700 hover:text-teal-500'
                : 'text-gray-200 hover:text-teal-300'
            } transition-colors duration-300`}
          >
            Settings
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default TaskManagementFooter;