import { useState, useEffect } from "react";

export default function Notes() {
  const [notes, setNotes] = useState(() => {
    const stored = localStorage.getItem("reeldeck_notes");
    return stored ? JSON.parse(stored) : [];
  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [tags, setTags] = useState("");
  const [search, setSearch] = useState("");
  const [filterTag, setFilterTag] = useState(null);

  useEffect(() => {
    localStorage.setItem("reeldeck_notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (!title.trim() || !content.trim()) return;
    const newNote = {
      id: Date.now(),
      title: title.trim(),
      content: content.trim(),
      priority,
      tags: tags.split(",").map((tag) => tag.trim().toLowerCase()).filter(Boolean),
      pinned: false,
    };
    setNotes([newNote, ...notes]);
    setTitle("");
    setContent("");
    setPriority("Medium");
    setTags("");
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const togglePin = (id) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, pinned: !note.pinned } : note
      )
    );
  };

  const allTags = Array.from(new Set(notes.flatMap((n) => n.tags)));

  const filteredNotes = notes
    .filter((note) =>
      (filterTag ? note.tags.includes(filterTag) : true) &&
      (note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.content.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) => b.pinned - a.pinned);

  return (
    <div className="max-w-5xl mx-auto p-4 text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-4 text-center"> Notes with Tags</h1>

      {/* Search & Tag Filter */}
      <div className="mb-4 space-y-2">
        <input
          type="text"
          placeholder="Search notes..."
          className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-md p-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <button
              className="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded hover:opacity-80"
              onClick={() => setFilterTag(null)}
            >
              All Tags
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                className={`text-sm px-2 py-1 rounded ${
                  filterTag === tag
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700"
                } hover:opacity-80`}
                onClick={() => setFilterTag(tag)}
              >
                #{tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Note Form */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          placeholder="Title"
          className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 rounded-md"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 rounded-md"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="High"> High</option>
          <option value="Medium"> Medium</option>
          <option value="Low"> Low</option>
        </select>
        <textarea
          placeholder="Note content..."
          className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 rounded-md col-span-1 sm:col-span-2"
          rows="3"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tags (comma-separated)"
          className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 rounded-md col-span-1 sm:col-span-2"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <button
          className="bg-black dark:bg-white text-white dark:text-black rounded-md px-4 py-2 col-span-1 sm:col-span-2 hover:opacity-90"
          onClick={addNote}
        >
          Add Note
        </button>
      </div>

      {/* Notes Display */}
      {filteredNotes.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">No notes found.</p>
      ) : (
        <div className="grid gap-4">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-4 shadow-sm"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h2 className="text-lg font-semibold">{note.title}</h2>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      note.priority === "High"
                        ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"
                        : note.priority === "Medium"
                        ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300"
                        : "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
                    }`}
                  >
                    {note.priority}
                  </span>
                </div>
                <div className="space-x-2 text-sm">
                  <button
                    onClick={() => togglePin(note.id)}
                    className="text-blue-600 dark:text-blue-300 hover:underline"
                  >
                    {note.pinned ? "Unpin" : "Pin"}
                  </button>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="text-red-600 dark:text-red-300 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="text-sm mb-2 whitespace-pre-wrap">{note.content}</p>
              <div className="flex flex-wrap gap-2">
                {note.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
