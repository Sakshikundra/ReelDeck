// File: pages/Planner.jsx
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function Planner() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", tag: "Idea", time: "" });

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleSave = () => {
    if (newTask.title.trim()) {
      const taskWithMeta = {
        ...newTask,
        date: selectedDate.toDateString(),
        id: Date.now(),
        completed: false
      };
      setTasks([...tasks, taskWithMeta]);
      setNewTask({ title: "", tag: "Idea", time: "" });
      setShowModal(false);
    }
  };

  const toggleComplete = (id) => {
    const updated = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updated);
  };

  const filteredTasks = tasks.filter(task => task.date === selectedDate.toDateString());

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4"> Content Planner</h2>
      <div className="flex flex-col md:flex-row gap-6">
        <Calendar
          onClickDay={handleDateClick}
          value={selectedDate}
          className="rounded shadow-lg p-4 bg-white dark:bg-gray-800"
        />

        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2">Tasks for {selectedDate.toDateString()}</h3>
          {filteredTasks.length > 0 ? (
            <ul className="space-y-2">
              {filteredTasks.map((task) => (
                <li
                  key={task.id}
                  className={`p-3 rounded shadow flex items-center justify-between ${
                    task.completed ? "bg-green-100 dark:bg-green-800" : "bg-gray-100 dark:bg-gray-700"
                  }`}
                >
                  <div>
                    <p className="font-medium">{task.title}</p>
                    <small className="text-sm text-gray-600 dark:text-gray-300">{task.time} • {task.tag}</small>
                  </div>
                  <button
                    onClick={() => toggleComplete(task.id)}
                    className="text-xs px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    {task.completed ? "Undo" : "Done"}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No tasks for this date.</p>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Add Task for {selectedDate.toDateString()}</h3>
            <input
              type="text"
              name="title"
              value={newTask.title}
              onChange={handleInputChange}
              placeholder="Task Title"
              className="w-full p-2 rounded border mb-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <input
              type="time"
              name="time"
              value={newTask.time}
              onChange={handleInputChange}
              className="w-full p-2 rounded border mb-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <select
              name="tag"
              value={newTask.tag}
              onChange={handleInputChange}
              className="w-full p-2 rounded border mb-4 dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="Idea"> Idea</option>
              <option value="Edit"> Editing</option>
              <option value="Post"> Posting</option>
            </select>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
