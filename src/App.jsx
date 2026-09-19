import { TaskProvider } from "./context/TaskContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Layout from "./Layout";
import TaskDetails from "./components/TaskDetails";
import NotFound from "./components/NotFound";

function Home() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold text-slate-900">
          Welcome to TaskFlow
        </h1>

        <p className="mt-3 text-slate-500">
          Organize your work and stay productive.
        </p>
      </div>
    </div>
  );
}

function About() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold text-slate-900">
          About TaskFlow
        </h1>

        <p className="mt-3 text-slate-500">
          TaskFlow is a simple task management application.
        </p>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <TaskProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/tasks" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/tasks/:id" element={<TaskDetails />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </TaskProvider>
    </BrowserRouter>
  );
}

export default App;