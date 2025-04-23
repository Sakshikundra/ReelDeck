import React, { useEffect, useState } from 'react';

const tabs = ['Dashboard', 'Collabs', 'Ideas', 'Notes', 'Planner'];

const Analytics = () => {
  const [tabTime, setTabTime] = useState(() => {
    const saved = localStorage.getItem('tabTime');
    return saved ? JSON.parse(saved) : {};
  });

  const [currentTab, setCurrentTab] = useState(null);
  const [startTime, setStartTime] = useState(null);

  // Start tracking when tab is selected
  useEffect(() => {
    if (currentTab) {
      setStartTime(Date.now());
    }
    return () => {
      if (currentTab && startTime) {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const updated = {
          ...tabTime,
          [currentTab]: (tabTime[currentTab] || 0) + elapsed,
        };
        setTabTime(updated);
        localStorage.setItem('tabTime', JSON.stringify(updated));
      }
    };
  }, [currentTab]);

  const streakData = Array.from({ length: 30 }, () => Math.floor(Math.random() * 2)); // mock data
  const lastMonth = [15, 20, 18, 23, 10, 17, 12];
  const thisMonth = [20, 25, 22, 30, 15, 20, 18];

  return (
    <div className="p-6 text-gray-800 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-4">Analytics Dashboard</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Time Tracker (per page)</h2>
        <div className="grid grid-cols-2 gap-4">
          {tabs.map(tab => (
            <div
              key={tab}
              className="p-4 bg-gray-200 dark:bg-gray-800 rounded shadow flex justify-between items-center"
              onClick={() => setCurrentTab(tab)}
            >
              <span>{tab}</span>
              <span>{tabTime[tab] || 0} secs</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Productivity Streak</h2>
        <div className="grid grid-cols-10 gap-1">
          {streakData.map((day, i) => (
            <div
              key={i}
              className={`w-6 h-6 rounded ${
                day ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-700'
              }`}
            ></div>
          ))}
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Monthly Comparison</h2>
        <div className="grid grid-cols-2 gap-4">
          {thisMonth.map((val, i) => (
            <div key={i} className="flex justify-between p-2 bg-gray-100 dark:bg-gray-900 rounded">
              <span>Week {i + 1}</span>
              <span>
                This: {val} | Last: {lastMonth[i] || 0}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Suggestions</h2>
        <ul className="list-disc pl-5">
          <li>Spend more time on Collabs for better results</li>
          <li>Improve daily content output to increase streak</li>
          <li>Use Planner more to reduce missed deadlines</li>
        </ul>
      </section>
    </div>
  );
};

export default Analytics;