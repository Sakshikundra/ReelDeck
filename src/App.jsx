import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Ideas from "./pages/Ideas";
import Collabs from "./pages/Collabs";
import Notes from "./pages/Notes";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import MainLayout from "./layout/MainLayout";
import Planner from "./pages/Planner";

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
