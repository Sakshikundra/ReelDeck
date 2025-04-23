import { useState, useEffect } from "react";

const Dashboard = () => {
  const [quote, setQuote] = useState("");
  const [streak, setStreak] = useState(4); // Mock streak

  const quotes = [
    "Consistency > Perfection.",
    "Film something. Post something. Repeat.",
    "Your future self is watching.",
    "Start before you’re ready.",
    "Done is better than perfect."
  ];

  const todaySchedule = [
    { time: "4 PM", task: "🎥 Film 'ReelDeck Tour'" },
    { time: "6 PM", task: "📝 Script 'AI vs Human Creators'" },
    { time: "8 PM", task: "✨ Edit 'Behind the Scenes'" },
  ];

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, []);

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div>
        <h2 className="text-3xl font-semibold">👋 Welcome back, Creator!</h2>
        <p className="text-gray-500 dark:text-gray-400">Let’s build your best content today!</p>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Focus Box */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow">
          <h3 className="text-xl font-semibold mb-2">🎯 Today's Focus</h3>
          <p className="text-gray-700 dark:text-gray-300">Edit & Post 1 Reel today!</p>
        </div>

        {/* Quote Box */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow">
          <h3 className="text-xl font-semibold mb-2">💬 Creator Quote</h3>
          <p className="italic text-gray-700 dark:text-gray-300">"{quote}"</p>
        </div>

        {/* Stats Box */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow">
          <h3 className="text-xl font-semibold mb-2">📊 Your Progress</h3>
          <ul className="text-gray-700 dark:text-gray-300 space-y-1">
            <li>💡 5 Ideas</li>
            <li>📝 3 Notes</li>
            <li>🤝 2 Collab Requests</li>
          </ul>
        </div>
      </div>

      {/* Streak + Alerts */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow">
          <h3 className="text-xl font-semibold mb-2">🔥 Creator Streak</h3>
          <p className="text-gray-700 dark:text-gray-300">You've created for <span className="font-bold">{streak}</span> days in a row. Keep the fire alive! 🔥</p>
        </div>
        <div className="bg-yellow-100 text-yellow-800 border-l-4 border-yellow-500 p-5 rounded-2xl">
          <h3 className="text-lg font-bold mb-1">⚠️ Reminder</h3>
          <p>You haven’t added a new idea today. Let’s go!</p>
        </div>
      </div>

      {/* Content Workflow */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
        <h3 className="text-xl font-semibold mb-4">🛠️ Content Workflow</h3>
        <div className="grid md:grid-cols-5 gap-4 text-center">
          {[
            { stage: "Idea", count: 5 },
            { stage: "Scripting", count: 3 },
            { stage: "Filming", count: 2 },
            { stage: "Editing", count: 1 },
            { stage: "Posted", count: 4 },
          ].map((item) => (
            <div key={item.stage} className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4">
              <h4 className="font-bold text-lg">{item.stage}</h4>
              <p className="text-2xl">{item.count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Today’s Schedule */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
        <h3 className="text-xl font-semibold mb-4">📅 Today’s Schedule</h3>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          {todaySchedule.map((item, idx) => (
            <li key={idx} className="flex justify-between items-center">
              <span>{item.task}</span>
              <span className="text-sm text-gray-500">{item.time}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Brain Dump */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
        <h3 className="text-xl font-semibold mb-4">🧠 Brain Dump</h3>
        <textarea
          className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="Drop your thoughts, ideas, or anything on your mind..."
        ></textarea>
        <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          ➕ Save Note
        </button>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
        <h3 className="text-xl font-semibold mb-4">⚡ Quick Actions</h3>
        <div className="flex gap-4 flex-wrap">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">+ Add Idea</button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">+ Add Note</button>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">+ Collab</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
