import { Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Ideas from "./Pages/Ideas.JSX";
import Collabs from "./Pages/Collabs";
import Notes from "./Pages/Notes";
import Analytics from "./Pages/Analytics";
import Settings from "./Pages/Settings";
import MainLayout from "./layout/Mainlayout";
import Planner from "./Pages/Planner";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/ideas" element={<Ideas />} />
        <Route path="/collabs" element={<Collabs />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/Planner" element={<Planner />} /> 
      </Route>
    </Routes>
  );
}

export default App;
