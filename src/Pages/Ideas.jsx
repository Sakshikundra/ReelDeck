import { useEffect, useState } from "react";
import { Plus, Trash2, Star } from "lucide-react";

const niches = ["Fitness", "Tech", "Lifestyle", "Education", "Finance"];

const viralIdeasMap = {
  Fitness: [
    "7-Day Home Workout Challenge",
    "What I Eat in a Day - Vegetarian Gym Edition",
    "No-Equipment Fat Burn Routine"
  ],
  Tech: [
    "Top 5 AI Tools You Should Know in 2025",
    "Why Everyone's Switching to React with Vite",
    "My VSCode Setup for Productivity"
  ],
  Lifestyle: [
    "Morning Routine That Changed My Life",
    "My Aesthetic Workspace Tour",
    "Day in the Life - Self-Care Edition"
  ],
  Education: [
    "Study With Me - Pomodoro Focus Session",
    "How I Take Notes for Maximum Retention",
    "Top 3 Free Resources for Data Science"
  ],
  Finance: [
    "How I Saved ₹50,000 in 3 Months",
    "Best Budgeting Apps for Students",
    "Passive Income Ideas for Beginners"
  ]
};

export default function Ideas() {
  const [ideas, setIdeas] = useState(() => {
    const stored = localStorage.getItem("ideas");
    return stored ? JSON.parse(stored) : [];
  });

  const [input, setInput] = useState("");
  const [note, setNote] = useState("");
  const [tag, setTag] = useState("");
  const [status, setStatus] = useState("New");
  const [search, setSearch] = useState("");
  const [niche, setNiche] = useState("Fitness");

  useEffect(() => {
    localStorage.setItem("ideas", JSON.stringify(ideas));
  }, [ideas]);

  const addIdea = () => {
    if (input.trim() === "") return;
    const newIdea = {
      id: Date.now(),
      text: input,
      tag,
      note,
      status,
      favorite: false
    };
    setIdeas([newIdea, ...ideas]);
    setInput("");
    setTag("");
    setNote("");
    setStatus("New");
  };

  const deleteIdea = (id) => setIdeas(ideas.filter((idea) => idea.id !== id));

  const toggleFavorite = (id) => {
    setIdeas(
      ideas.map((idea) =>
        idea.id === id ? { ...idea, favorite: !idea.favorite } : idea
      )
    );
  };

  const filteredIdeas = ideas.filter(
    (idea) =>
      idea.text.toLowerCase().includes(search.toLowerCase()) ||
      idea.tag.toLowerCase().includes(search.toLowerCase())
  );

  const viralSuggestions = viralIdeasMap[niche];

  return (
    <div className="text-gray-800 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-4">🧠 Content Ideas</h1>

      <div className="mb-4">
        <label className="mr-2 font-semibold">Select your niche:</label>
        <select
          value={niche}
          onChange={(e) => setNiche(e.target.value)}
          className="px-2 py-1 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-800"
        >
          {niches.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900 p-3 rounded mb-6">
        <h2 className="font-semibold mb-2">💡 Viral Ideas for {niche}</h2>
        <ul className="list-disc ml-5 space-y-1">
          {viralSuggestions.map((idea, index) => (
            <li key={index} className="text-sm">
              {idea}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Your Idea"
          className="p-2 rounded border w-full sm:w-1/2 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        />
        <input
          type="text"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder="Tag"
          className="p-2 rounded border w-full sm:w-1/6 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="p-2 rounded border w-full sm:w-1/6 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        >
          <option>New</option>
          <option>Planned</option>
          <option>Shot</option>
          <option>Edited</option>
          <option>Published</option>
        </select>
        <button
          onClick={addIdea}
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          <Plus size={16} className="inline mr-1" /> Add
        </button>
      </div>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Additional notes or script..."
        className="w-full mb-4 p-2 rounded border min-h-[80px] dark:bg-gray-800 dark:border-gray-600 dark:text-white"
      ></textarea>

      <input
        type="text"
        placeholder="Search ideas or tags..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 mb-4 w-full rounded border dark:bg-gray-800 dark:border-gray-600 dark:text-white"
      />

      <div className="space-y-4">
        {filteredIdeas.map((idea) => (
          <div
            key={idea.id}
            className="bg-white dark:bg-gray-800 p-4 rounded shadow flex justify-between items-start"
          >
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">
                  {idea.text}{" "}
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                    [{idea.tag}]
                  </span>
                </h3>
                <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-700 text-blue-700 dark:text-blue-200 rounded-full">
                  {idea.status}
                </span>
              </div>
              {idea.note && (
                <p className="text-sm mt-1 text-gray-600 dark:text-gray-300">
                  📝 {idea.note}
                </p>
              )}
            </div>
            <div className="flex gap-2 ml-4">
              <button onClick={() => toggleFavorite(idea.id)}>
                <Star
                  size={18}
                  className={idea.favorite ? "text-yellow-500" : "text-gray-400 dark:text-gray-500"}
                />
              </button>
              <button onClick={() => deleteIdea(idea.id)}>
                <Trash2 size={18} className="text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
