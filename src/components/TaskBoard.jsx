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
  hasActiveFilters
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
      dueDateFilter  === "all" ||
      (dueDateFilter === 'overdue' &&
        task.dueDate &&
        task.dueDate < today) ||
      (dueDateFilter === 'today' &&
        task.dueDate &&
        task.dueDate === today) ||
      (dueDateFilter === 'upcoming' &&
        task.dueDate &&
        task.dueDate > today);

    return matchesSearch && matchesPriority && matchesCategory && matchesDueDate;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if(sortOption === 'due-asc'){
      return a.dueDate.localeCompare(b.dueDate);
    }
    
    if(sortOption === 'due-desc'){
      return b.dueDate.localeCompare(a.dueDate);
    }

    if(sortOption === 'priority'){
      const priorityRank = {
        high : 3,
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
      <div className="mb-5">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        />

        <label>
          Priority:  
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
          >
            <option value="all">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
        
        <label>
          Category:  
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
          >
            <option value="all">All</option>
            <option value="learning">Learning</option>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="project">Project</option>
            <option value="other">Other</option>
          </select>
        </label>

        <label>
          Due Date:
          <select
            value={dueDateFilter}
            onChange={(e) => setDueDateFilter(e.target.value)}
            className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
          >
            <option value="all">All</option>
            <option value="overdue">Overdue</option>
            <option value="today">Due Today</option>
            <option value="upcoming">Upcoming</option>
          </select>
        </label>

        <label>
          Sort:
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
          >
            <option value="none">Default</option>
            <option value="due-asc">Due Date: Nearest</option>
            <option value="due-desc">Due Date: Farthest</option>
            <option value="priority">Priority: High → Low</option>
          </select>
        </label>

        {hasActiveFilters && (
            <button
            onClick={clearFilters}
            className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Clear Filters
          </button>
        )}
      </div>

      {hasNoMatchingTasks && (
        <div className="mb-5 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
          {hasTasks && hasActiveFilters ? (
            <>
              <h3 className="text-lg font-semibold text-slate-900">
                No tasks match your filters
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Try changing your search or filters to find more tasks.
              </p>

              <button
                onClick={clearFilters}
                className="mt-5 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Clear Filters
              </button>
            </>
          ) : (
            <>
              <h3 className="text-lg font-semibold text-slate-900">
                No tasks yet
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Add a task above to get started.
              </p>
            </>
          )}
        </div>
      )}

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