'use client';

import { useState } from 'react';
import { Menu, X, List, User, Bell, Search, CheckCircle } from 'lucide-react';
import 'animate.css';
import Link from 'next/link';

const TaskManagementHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const taskCompletion = 75; // Example: 75% tasks completed (can be dynamic)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  return (
    <header className="bg-white/10 backdrop-blur-lg shadow-sm border-b border-white/20 text-gray-800">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo and Progress Ring */}
        <div className="flex items-center space-x-3 animate__animated animate__fadeIn">
          <div className="relative">
            <svg className="w-10 h-10" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="16" fill="none" stroke="#e2e8f0" strokeWidth="2" />
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke="#14b8a6"
                strokeWidth="2"
                strokeDasharray="100"
                strokeDashoffset={100 - taskCompletion}
                className="transition-all duration-500 ease-in-out"
              />
            </svg>
            <CheckCircle size={16} className="absolute top-2.5 left-2.5 text-teal-500" />
          </div>
          <Link href="/" className="text-xl font-semibold tracking-wide text-gray-900">
            TaskPOS
          </Link>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 mx-6 animate__animated animate__fadeIn animate__delay-1s">
          <div className="relative w-full max-w-xs">
            <input
              type="text"
              placeholder="Search tasks..."
              className="w-full py-1.5 pl-8 pr-4 rounded-lg bg-gray-100/50 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-teal-400 transition-all duration-300"
            />
            <Search size={16} className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Navigation and User Actions */}
        <nav className="hidden md:flex items-center space-x-4 animate__animated animate__fadeIn animate__delay-2s">
          <Link
            href="/dashboard"
            className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-teal-500 transition-colors duration-300 group"
          >
            <List size={16} className="group-hover:scale-110 transition-transform duration-200" />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/tasks"
            className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-teal-500 transition-colors duration-300 group"
          >
            <CheckCircle size={16} className="group-hover:scale-110 transition-transform duration-200" />
            <span>Tasks</span>
          </Link>
          <div className="relative">
            <button
              onClick={toggleUserMenu}
              className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-teal-500 transition-colors duration-300"
            >
              <User size={16} />
              <span>Profile</span>
            </button>
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 animate__animated animate__slideInUp">
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-500"
                  onClick={toggleUserMenu}
                >
                  View Profile
                </Link>
                <Link
                  href="/settings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-500"
                  onClick={toggleUserMenu}
                >
                  Settings
                </Link>
                <a
                  href="/logout"
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-500"
                  onClick={toggleUserMenu}
                >
                  Logout
                </a>
              </div>
            )}
          </div>
          <button className="relative">
            <Bell
              size={16}
              className="text-gray-700 hover:text-teal-500 hover:scale-110 transition-all duration-200"
            />
            <span className="absolute -top-1 -right-1 bg-teal-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              2
            </span>
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none animate__animated animate__fadeIn animate__delay-3s"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-sm animate__animated animate__slideInUp">
          <nav className="flex flex-col items-center py-4 space-y-3">
            <Link
              href="/dashboard"
              className="flex items-center space-x-2 text-gray-700 hover:text-teal-500 text-base font-medium transition-colors duration-300"
              onClick={toggleMenu}
            >
              <List size={16} />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/tasks"
              className="flex items-center space-x-2 text-gray-700 hover:text-teal-500 text-base font-medium transition-colors duration-300"
              onClick={toggleMenu}
            >
              <CheckCircle size={16} />
              <span>Tasks</span>
            </Link>
            <Link
              href="/profile"
              className="flex items-center space-x-2 text-gray-700 hover:text-teal-500 text-base font-medium transition-colors duration-300"
              onClick={toggleMenu}
            >
              <User size={16} />
              <span>Profile</span>
            </Link>
            <button
              className="flex items-center space-x-2 text-gray-700 hover:text-teal-500 text-base font-medium transition-colors duration-300"
              onClick={toggleMenu}
            >
              <Bell size={16} />
              <span>Notifications</span>
              <span className="bg-teal-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                2
              </span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default TaskManagementHeader;