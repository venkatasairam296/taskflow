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
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [category, setCategory] = useState("learning");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [dueDate, setDueDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [dueDateFilter, setDueDateFilter] = useState("all");
  const [sortOption, setSortOption] = useState("none");
  const [titleError, setTitleError] = useState("");

  function clearFilters() {
    setSearchTerm("");
    setPriorityFilter("all");
    setCategoryFilter("all");
    setDueDateFilter("all");
    setSortOption("none");
  }

  const hasActiveFilters =
    searchTerm.trim() !== "" ||
    priorityFilter !== "all" ||
    categoryFilter !== "all" ||
    dueDateFilter !== "all" ||
    sortOption !== "none";

  function resetForm() {
    setEditingTaskId(null);
    setTaskTitle("");
    setTaskStatus("pending");
    setPriority("low");
    setCategory("learning");
    setDueDate(new Date().toISOString().split("T")[0]);
    setTitleError("");
  }

  function handleTask() {
    if (taskTitle.trim() === "") {
      setTitleError("Task title is required.");
      return;
    }

    setTitleError("");

    if (editingTaskId === null) {
      addTask(taskTitle.trim(), taskStatus, priority, category, dueDate);
    } else {
      editTask(
        taskTitle.trim(),
        taskStatus,
        editingTaskId,
        priority,
        category,
        dueDate
      );
    }

    resetForm();
  }

  function handleEdit(id) {
    const task = tasks.find((task) => task.id === id);

    if (!task) {
      return;
    }

    setEditingTaskId(id);
    setTaskTitle(task.title);
    setTaskStatus(task.status);
    setPriority(task.priority);
    setCategory(task.category);
    setDueDate(task.dueDate);
    setTitleError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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

  const today = new Date().toISOString().split("T")[0];

  const overdueCount = tasks.filter(
    (task) =>
      task.dueDate &&
      task.dueDate < today &&
      task.status !== "completed"
  ).length;

  const dueTodayCount = tasks.filter(
    (task) =>
      task.dueDate &&
      task.dueDate === today &&
      task.status !== "completed"
  ).length;

  const completionRate =
    allCount === 0
      ? 0
      : Math.round((completedCount / allCount) * 100);

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-8 md:px-6 md:py-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-2 text-sm font-bold uppercase tracking-widest text-blue-600">
                Task Management
              </p>

              <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                Task Dashboard
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 md:text-base">
                Create, organize and track your work from one place.
              </p>
            </div>

            <div className="hidden rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm md:block">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Total tasks
              </p>

              <p className="mt-1 text-2xl font-bold text-slate-900">
                {allCount}
              </p>
            </div>
          </div>
        </header>

        {/* Task Form */}
        <section className="mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-5 md:px-6">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-lg">
                +
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {editingTaskId !== null
                    ? "Edit Task"
                    : "Create New Task"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {editingTaskId !== null
                    ? "Update the details of your task."
                    : "Add something you want to accomplish."}
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 md:p-6">

            {/* Title */}
            <div className="mb-5">
              <label
                htmlFor="task-title"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Task title
              </label>

              <input
                id="task-title"
                type="text"
                placeholder="What needs to be done?"
                value={taskTitle}
                onChange={(e) => {
                  setTaskTitle(e.target.value);

                  if (titleError) {
                    setTitleError("");
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleTask();
                  }
                }}
                className={`w-full rounded-xl border bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-4 ${
                  titleError
                    ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                    : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                }`}
              />

              {titleError && (
                <p className="mt-2 text-sm font-medium text-red-600">
                  {titleError}
                </p>
              )}
            </div>

            {/* Task Details */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

              <div>
                <label
                  htmlFor="task-status"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Status
                </label>

                <select
                  id="task-status"
                  value={taskStatus}
                  onChange={(e) => setTaskStatus(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="task-priority"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Priority
                </label>

                <select
                  id="task-priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="task-category"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Category
                </label>

                <select
                  id="task-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                >
                  <option value="learning">Learning</option>
                  <option value="work">Work</option>
                  <option value="personal">Personal</option>
                  <option value="project">Project</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="task-due-date"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Due date
                </label>

                <input
                  id="task-due-date"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
              {editingTaskId !== null && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-100"
                >
                  Cancel
                </button>
              )}

              <button
                type="button"
                onClick={handleTask}
                className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100 active:scale-[0.98]"
              >
                {editingTaskId !== null
                  ? "Save Changes"
                  : "Add Task"}
              </button>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mb-8">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-slate-900">
              Overview
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              A quick look at your current workload.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <p className="text-sm font-medium text-slate-500">
                All Tasks
              </p>
              <p className="mt-2 text-3xl font-bold text-slate-900">
                {allCount}
              </p>
            </div>

            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <p className="text-sm font-medium text-amber-700">
                Pending
              </p>
              <p className="mt-2 text-3xl font-bold text-amber-900">
                {pendingCount}
              </p>
            </div>

            <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <p className="text-sm font-medium text-blue-700">
                In Progress
              </p>
              <p className="mt-2 text-3xl font-bold text-blue-900">
                {inProgressCount}
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <p className="text-sm font-medium text-emerald-700">
                Completed
              </p>
              <p className="mt-2 text-3xl font-bold text-emerald-900">
                {completedCount}
              </p>
            </div>

            <div className="rounded-2xl border border-red-200 bg-red-50 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <p className="text-sm font-medium text-red-700">
                Overdue
              </p>
              <p className="mt-2 text-3xl font-bold text-red-900">
                {overdueCount}
              </p>
            </div>

            <div className="rounded-2xl border border-orange-200 bg-orange-50 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <p className="text-sm font-medium text-orange-700">
                Due Today
              </p>
              <p className="mt-2 text-3xl font-bold text-orange-900">
                {dueTodayCount}
              </p>
            </div>
          </div>

          {/* Completion rate */}
          <div className="mt-4 rounded-2xl border border-violet-200 bg-violet-50 p-5 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-violet-700">
                  Completion Rate
                </p>

                <p className="mt-1 text-xs text-violet-600">
                  {completedCount} of {allCount} tasks completed
                </p>
              </div>

              <p className="text-2xl font-bold text-violet-900">
                {completionRate}%
              </p>
            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-violet-100">
              <div
                className="h-full rounded-full bg-violet-500 transition-all duration-500"
                style={{ width: `${completionRate}%` }}
              />
            </div>
          </div>
        </section>

        {/* Task Board */}
        <section>
          <div className="mb-5">
            <h2 className="text-xl font-bold text-slate-900">
              Task Board
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Organize your work by task status.
            </p>
          </div>

          <TaskBoard
            handleEdit={handleEdit}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            priorityFilter={priorityFilter}
            setPriorityFilter={setPriorityFilter}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            dueDateFilter={dueDateFilter}
            setDueDateFilter={setDueDateFilter}
            sortOption={sortOption}
            setSortOption={setSortOption}
            clearFilters={clearFilters}
            hasActiveFilters={hasActiveFilters}
          />
        </section>
      </div>
    </section>
  );
};

export default Dashboard;