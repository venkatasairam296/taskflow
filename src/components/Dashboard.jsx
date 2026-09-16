import { useState } from "react";
import useTasks from "../hooks/useTasks";
import TaskBoard from "./TaskBoard";

const Dashboard = () => {
  const { tasks, addTask, editTask } = useTasks();

  const [editingTaskId, setEditingTaskId] = useState(null);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskStatus, setTaskStatus] = useState("pending");
  const [priority, setPriority] = useState("low");
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [category, setCategory] = useState("learning");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);

  function handleTask() {
    if (taskTitle.trim() === "") {
      return;
    }

    if (editingTaskId === null) {
      addTask(taskTitle.trim(), taskStatus, priority, category, dueDate);
    } else {
      editTask(taskTitle.trim(), taskStatus, editingTaskId, priority, category, dueDate);
      setEditingTaskId(null);
    }

    setTaskTitle("");
    setTaskStatus("pending");
    setPriority("low");
    setCategory("learning");
    setDueDate(new Date().toISOString().split('T')[0]);
  }

  function handleEdit(id) {
    setEditingTaskId(id);

    const task = tasks.find((task) => task.id === id);

    setTaskTitle(task.title);
    setTaskStatus(task.status);
    setPriority(task.priority);
    setCategory(task.category);
    setDueDate(task.dueDate);
  }

  const allCount = tasks.length;

  const pendingCount = tasks.filter(
    (task) => task.status === "pending"
  ).length;

  const inProgressCount = tasks.filter(
    (task) => task.status === "in-progress"
  ).length;

  const completedCount = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-8 md:px-6 md:py-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
            Task Management
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Task Dashboard
          </h2>

          <p className="mt-2 text-slate-500">
            Create, manage and track your tasks in one place.
          </p>
        </div>

        {/* Task Form */}
        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-slate-900">
              {editingTaskId !== null ? "Edit Task" : "Create New Task"}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {editingTaskId !== null
                ? "Update the task details below."
                : "Add a new task to your board."}
            </p>
          </div>

          <div className="flex flex-col gap-3 md:flex-row">
            <input
              type="text"
              placeholder="What needs to be done?"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleTask();
                }
              }}
              className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />

            <select
              value={taskStatus}
              onChange={(e) => setTaskStatus(e.target.value)}
              className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            >
              <option value="learning">Learning</option>
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="project">Project</option>
              <option value="other">Other</option>
            </select>

            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />

            <button
              onClick={handleTask}
              className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.98]"
            >
              {editingTaskId !== null ? "Save Changes" : "Add Task"}
            </button>

            {editingTaskId !== null && (
              <button
                onClick={() => {
                  setEditingTaskId(null);
                  setTaskTitle("");
                  setTaskStatus("pending");
                  setPriority("low");
                  setCategory("learning");
                  setDueDate(new Date().toISOString().split('T')[0]);
                }}
                className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 active:scale-[0.98]"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* Task Stats */}
        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">

          {/* All */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <p className="text-sm font-medium text-slate-500">
              All Tasks
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {allCount}
            </p>
          </div>

          {/* Pending */}
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <p className="text-sm font-medium text-amber-700">
              Pending
            </p>

            <p className="mt-2 text-3xl font-bold text-amber-900">
              {pendingCount}
            </p>
          </div>

          {/* In Progress */}
          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <p className="text-sm font-medium text-blue-700">
              In Progress
            </p>

            <p className="mt-2 text-3xl font-bold text-blue-900">
              {inProgressCount}
            </p>
          </div>

          {/* Completed */}
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <p className="text-sm font-medium text-emerald-700">
              Completed
            </p>

            <p className="mt-2 text-3xl font-bold text-emerald-900">
              {completedCount}
            </p>
          </div>
        </div>

        {/* Task Board */}
        <div>
          <div className="mb-4">
            <h2 className="text-xl font-bold text-slate-900">
              Task Board
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Organize your work by task status.
            </p>
          </div>

          <TaskBoard handleEdit={handleEdit} searchTerm={searchTerm} setSearchTerm={setSearchTerm} priorityFilter={priorityFilter} setPriorityFilter={setPriorityFilter} categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter} />
        </div>

      </div>
    </section>
  );
};

export default Dashboard;