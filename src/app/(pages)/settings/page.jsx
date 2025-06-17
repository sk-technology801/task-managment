'use client';

import { useState } from 'react';

export default function SettingsPage() {
  const [user, setUser] = useState({
    name: 'Alex Kim',
    email: 'alex.kim@example.com',
  });
  const [theme, setTheme] = useState('white'); // white or black
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!user.name.trim() || !user.email.trim()) {
      alert('Name and email are required!');
      return;
    }
    setIsEditing(false);
    alert('Settings saved!');
  };

  const toggleTheme = () => {
    setTheme(theme === 'white' ? 'black' : 'white');
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === 'white' ? 'bg-gray-100' : 'bg-gray-900'
      }`}
    >
      <div className="max-w-3xl mx-auto p-6">
        <div
          className={`p-6 rounded-lg transition-opacity duration-300 ${
            isEditing ? 'opacity-100' : 'opacity-80'
          } ${theme === 'white' ? 'bg-white' : 'bg-gray-800'} shadow-sm`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2
              className={`text-lg font-medium ${
                theme === 'white' ? 'text-gray-900' : 'text-gray-100'
              }`}
            >
              Settings
            </h2>
            <button
              onClick={toggleTheme}
              className={`px-2 py-1 rounded-md text-sm ${
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
          </div>
          {isEditing ? (
            <form onSubmit={handleUpdate} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className={`block text-sm font-medium ${
                    theme === 'white' ? 'text-gray-700' : 'text-gray-200'
                  }`}
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 ${
                    theme === 'white'
                      ? 'bg-white border-gray-300 focus:ring-gray-500'
                      : 'bg-gray-700 border-gray-500 text-gray-100 focus:ring-gray-300'
                  }`}
                  required
                  aria-label="Name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className={`block text-sm font-medium ${
                    theme === 'white' ? 'text-gray-700' : 'text-gray-200'
                  }`}
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 ${
                    theme === 'white'
                      ? 'bg-white border-gray-300 focus:ring-gray-500'
                      : 'bg-gray-700 border-gray-500 text-gray-100 focus:ring-gray-300'
                  }`}
                  required
                  aria-label="Email"
                />
              </div>
              <div className="col-span-1 sm:col-span-2 flex justify-end space-x-2">
                <button
                  type="submit"
                  className={`px-4 py-1 rounded-md focus:outline-none focus:ring-2 ${
                    theme === 'white'
                      ? 'bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-500'
                      : 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-300'
                  }`}
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className={`px-4 py-1 rounded-md focus:outline-none focus:ring-2 ${
                    theme === 'white'
                      ? 'bg-gray-300 text-gray-800 hover:bg-gray-400 focus:ring-gray-500'
                      : 'bg-gray-600 text-gray-100 hover:bg-gray-500 focus:ring-gray-300'
                  }`}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p
                  className={`text-sm ${
                    theme === 'white' ? 'text-gray-700' : 'text-gray-200'
                  }`}
                >
                  <strong>Name:</strong> {user.name}
                </p>
              </div>
              <div>
                <p
                  className={`text-sm ${
                    theme === 'white' ? 'text-gray-700' : 'text-gray-200'
                  }`}
                >
                  <strong>Email:</strong> {user.email}
                </p>
              </div>
              <div className="col-span-1 sm:col-span-2 flex justify-end">
                <button
                  onClick={() => setIsEditing(true)}
                  className={`px-4 py-1 rounded-md focus:outline-none focus:ring-2 ${
                    theme === 'white'
                      ? 'bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-500'
                      : 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-300'
                  }`}
                >
                  Edit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}