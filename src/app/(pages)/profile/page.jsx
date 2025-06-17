'use client';

import { useState } from 'react';

export default function ProfilePage() {
  const [user, setUser] = useState({
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    avatar: 'https://via.placeholder.com/150/000000/FFFFFF?text=JD',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [theme, setTheme] = useState('white'); // white or black

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!user.name.trim() || !user.email.trim()) {
      alert('Name and email are required!');
      return;
    }
    setIsEditing(false);
    alert('Profile updated!');
  };

  const toggleTheme = () => {
    setTheme(theme === 'white' ? 'black' : 'white');
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-colors duration-500 ${
        theme === 'white' ? 'bg-white' : 'bg-black'
      }`}
    >
      <div
        className={`relative rounded-xl p-6 w-full max-w-sm transform transition-transform duration-300 hover:scale-105 ${
          theme === 'white'
            ? 'bg-gray-100 border border-gray-200 shadow-lg'
            : 'bg-gray-900 border border-gray-700 shadow-[0_0_10px_rgba(255,255,255,0.1)]'
        }`}
      >
        <button
          onClick={toggleTheme}
          className={`absolute top-4 right-4 p-2 rounded-full ${
            theme === 'white'
              ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              : 'bg-gray-700 text-white hover:bg-gray-600'
          } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            theme === 'white' ? 'focus:ring-gray-400' : 'focus:ring-gray-200'
          }`}
          aria-label={`Switch to ${theme === 'white' ? 'black' : 'white'} theme`}
        >
          {theme === 'white' ? '🌙' : '☀️'}
        </button>
        <h2
          className={`text-xl font-bold text-center mb-4 ${
            theme === 'white' ? 'text-gray-800' : 'text-white'
          }`}
        >
          Profile
        </h2>
        {isEditing ? (
          <form onSubmit={handleUpdate} className="space-y-3">
            <div>
              <label
                htmlFor="name"
                className={`block text-xs font-medium ${
                  theme === 'white' ? 'text-gray-600' : 'text-gray-300'
                }`}
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                className={`mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 ${
                  theme === 'white'
                    ? 'bg-white border-gray-300 focus:ring-gray-400'
                    : 'bg-gray-800 border-gray-600 text-white focus:ring-gray-200'
                }`}
                required
                aria-label="Name"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className={`block text-xs font-medium ${
                  theme === 'white' ? 'text-gray-600' : 'text-gray-300'
                }`}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className={`mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 ${
                  theme === 'white'
                    ? 'bg-white border-gray-300 focus:ring-gray-400'
                    : 'bg-gray-800 border-gray-600 text-white focus:ring-gray-200'
                }`}
                required
                aria-label="Email"
              />
            </div>
            <div>
              <label
                htmlFor="avatar"
                className={`block text-xs font-medium ${
                  theme === 'white' ? 'text-gray-600' : 'text-gray-300'
                }`}
              >
                Avatar URL
              </label>
              <input
                id="avatar"
                type="url"
                value={user.avatar}
                onChange={(e) => setUser({ ...user, avatar: e.target.value })}
                className={`mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 ${
                  theme === 'white'
                    ? 'bg-white border-gray-300 focus:ring-gray-400'
                    : 'bg-gray-800 border-gray-600 text-white focus:ring-gray-200'
                }`}
                placeholder="https://example.com/avatar.jpg"
                aria-label="Avatar URL"
              />
            </div>
            <div className="flex justify-center space-x-2">
              <button
                type="submit"
                className={`px-4 py-1 rounded-lg focus:outline-none focus:ring-2 ${
                  theme === 'white'
                    ? 'bg-gray-800 text-white hover:bg-gray-700 focus:ring-gray-400'
                    : 'bg-white text-black hover:bg-gray-200 focus:ring-gray-200'
                }`}
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className={`px-4 py-1 rounded-lg focus:outline-none focus:ring-2 ${
                  theme === 'white'
                    ? 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400'
                    : 'bg-gray-700 text-white hover:bg-gray-600 focus:ring-gray-200'
                }`}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center">
            <div className="relative w-20 h-20 mx-auto mb-4">
              <img
                src={user.avatar}
                alt="Profile avatar"
                className="w-full h-full rounded-full object-cover"
              />
              <div
                className={`absolute inset-0 rounded-full border-2 border-dashed animate-spin-slow ${
                  theme === 'white' ? 'border-gray-400' : 'border-white'
                }`}
              ></div>
            </div>
            <h3
              className={`text-base font-semibold ${
                theme === 'white' ? 'text-gray-800' : 'text-white'
              }`}
            >
              {user.name}
            </h3>
            <p
              className={`text-xs ${
                theme === 'white' ? 'text-gray-600' : 'text-gray-300'
              } mb-4`}
            >
              {user.email}
            </p>
            <button
              onClick={() => setIsEditing(true)}
              className={`px-4 py-1 rounded-lg focus:outline-none focus:ring-2 ${
                theme === 'white'
                  ? 'bg-gray-800 text-white hover:bg-gray-700 focus:ring-gray-400'
                  : 'bg-white text-black hover:bg-gray-200 focus:ring-gray-200'
              }`}
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
}