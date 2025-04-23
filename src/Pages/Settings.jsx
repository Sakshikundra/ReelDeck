import React, { useState, useEffect } from 'react';

const Settings = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [name, setName] = useState(localStorage.getItem('name') || '');
  const [email, setEmail] = useState(localStorage.getItem('email') || '');
  const [dailyGoal, setDailyGoal] = useState(localStorage.getItem('dailyGoal') || 3);
  const [notifications, setNotifications] = useState(
    JSON.parse(localStorage.getItem('notifications')) ?? true
  );

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    localStorage.setItem('dailyGoal', dailyGoal);
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [name, email, dailyGoal, notifications]);

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all settings?')) {
      setName('');
      setEmail('');
      setDailyGoal(3);
      setNotifications(true);
      setTheme('light');
      localStorage.clear();
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8 text-gray-800 dark:text-gray-100">
      <h1 className="text-2xl font-bold">⚙️ Settings</h1>

      {/* Theme Toggle */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Theme</h2>
        <button
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Toggle to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
      </div>

      {/* Profile */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Profile Info</h2>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded"
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded"
        />
      </div>

      {/* Productivity Goal */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Productivity Preferences</h2>
        <label className="block mb-1">Daily Task Goal</label>
        <input
          type="number"
          min={1}
          value={dailyGoal}
          onChange={(e) => setDailyGoal(e.target.value)}
          className="w-20 p-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded"
        />
      </div>

      {/* Notifications */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Notifications</h2>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
          />
          Enable reminders & tips
        </label>
      </div>

      {/* Reset */}
      <div>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Reset All Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;
