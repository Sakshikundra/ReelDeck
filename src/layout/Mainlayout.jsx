import { NavLink, Outlet } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { useState } from "react";


const navLinks = [
  { name: "Dashboard", path: "/" },
  { name: "Ideas", path: "/ideas" },
  { name: "Collabs", path: "/collabs" },
  { name: "Notes", path: "/notes" },
  { name: "Analytics", path: "/analytics" },
  { name: "Settings", path: "/settings" },
  { name: "Planner", path: "/Planner" }
];

export default function MainLayout() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="flex h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-100 dark:bg-gray-800 p-4 flex flex-col">
          <h1 className="text-2xl font-bold mb-6">🎬 ReelDeck</h1>
          <nav className="space-y-2 flex-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 ${
                    isActive ? "bg-gray-300 dark:bg-gray-700 font-semibold" : ""
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="mt-auto flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
