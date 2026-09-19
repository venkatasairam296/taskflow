import useTasks from "../hooks/useTasks";
import TaskColumn from "./TaskColumn";

const TaskBoard = ({
  handleEdit,
  searchTerm,
  setSearchTerm,
  priorityFilter,
  setPriorityFilter,
  categoryFilter,
  setCategoryFilter,
  dueDateFilter,
  setDueDateFilter,
  sortOption,
  setSortOption,
  clearFilters,
  hasActiveFilters,
}) => {
  const { tasks } = useTasks();

  const today = new Date().toISOString().split("T")[0];

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesPriority =
      priorityFilter === "all" ||
      task.priority === priorityFilter;

    const matchesCategory =
      categoryFilter === "all" ||
      task.category === categoryFilter;

    const matchesDueDate =
      dueDateFilter === "all" ||
      (dueDateFilter === "overdue" &&
        task.dueDate &&
        task.dueDate < today &&
        task.status !== "completed") ||
      (dueDateFilter === "today" &&
        task.dueDate &&
        task.dueDate === today &&
        task.status !== "completed") ||
      (dueDateFilter === "upcoming" &&
        task.dueDate &&
        task.dueDate > today);

    return (
      matchesSearch &&
      matchesPriority &&
      matchesCategory &&
      matchesDueDate
    );
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortOption === "due-asc") {
      return (a.dueDate || "9999-12-31").localeCompare(
        b.dueDate || "9999-12-31"
      );
    }

    if (sortOption === "due-desc") {
      return (b.dueDate || "").localeCompare(a.dueDate || "");
    }

    if (sortOption === "priority") {
      const priorityRank = {
        high: 3,
        medium: 2,
        low: 1,
      };

      return priorityRank[b.priority] - priorityRank[a.priority];
    }

    return 0;
  });

  const hasTasks = tasks.length > 0;
  const hasNoMatchingTasks = sortedTasks.length === 0;

  const pendingTasks = sortedTasks.filter(
    (task) => task.status === "pending"
  );

  const inProgressTasks = sortedTasks.filter(
    (task) => task.status === "in-progress"
  );

  const completedTasks = sortedTasks.filter(
    (task) => task.status === "completed"
  );

  return (
    <div>

      {/* Filters */}
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">

        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Find Tasks
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Search, filter and sort your tasks.
            </p>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="self-start rounded-lg px-3 py-2 text-xs font-semibold text-blue-600 transition hover:bg-blue-50 sm:self-auto"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Search */}
        <div className="mb-4">
          <label
            htmlFor="task-search"
            className="sr-only"
          >
            Search tasks
          </label>

          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              🔎
            </span>

            <input
              id="task-search"
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />
          </div>
        </div>

        {/* Select filters */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">

          <div>
            <label
              htmlFor="priority-filter"
              className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500"
            >
              Priority
            </label>

            <select
              id="priority-filter"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            >
              <option value="all">All priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="category-filter"
              className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500"
            >
              Category
            </label>

            <select
              id="category-filter"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            >
              <option value="all">All categories</option>
              <option value="learning">Learning</option>
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="project">Project</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="due-date-filter"
              className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500"
            >
              Due date
            </label>

            <select
              id="due-date-filter"
              value={dueDateFilter}
              onChange={(e) => setDueDateFilter(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            >
              <option value="all">All dates</option>
              <option value="overdue">Overdue</option>
              <option value="today">Due today</option>
              <option value="upcoming">Upcoming</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="sort-option"
              className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500"
            >
              Sort
            </label>

            <select
              id="sort-option"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            >
              <option value="none">Default order</option>
              <option value="due-asc">Due date: Nearest</option>
              <option value="due-desc">Due date: Farthest</option>
              <option value="priority">Priority: High → Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {hasNoMatchingTasks && (
        <div className="mb-6 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
            {hasTasks && hasActiveFilters ? "🔎" : "✓"}
          </div>

          {hasTasks && hasActiveFilters ? (
            <>
              <h3 className="mt-4 text-lg font-bold text-slate-900">
                No matching tasks
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                No tasks match your current search and filters.
                Try changing your filters or clearing them.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
              >
                Clear Filters
              </button>
            </>
          ) : (
            <>
              <h3 className="mt-4 text-lg font-bold text-slate-900">
                No tasks yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Create your first task using the form above.
              </p>
            </>
          )}
        </div>
      )}

      {/* Board */}
      {!hasNoMatchingTasks && (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <TaskColumn
            title="Pending"
            status="pending"
            tasks={pendingTasks}
            handleEdit={handleEdit}
          />

          <TaskColumn
            title="In Progress"
            status="in-progress"
            tasks={inProgressTasks}
            handleEdit={handleEdit}
          />

          <TaskColumn
            title="Completed"
            status="completed"
            tasks={completedTasks}
            handleEdit={handleEdit}
          />
        </div>
      )}
    </div>
  );
};

export default TaskBoard;