import useTasks from "../hooks/useTasks";
import TaskColumn from "./TaskColumn";

const TaskBoard = ({ handleEdit, searchTerm, setSearchTerm, priorityFilter, setPriorityFilter, categoryFilter, setCategoryFilter }) => {
  const { tasks } = useTasks();

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

    return matchesSearch && matchesPriority && matchesCategory;
  });
  
  const pendingTasks = filteredTasks.filter(
    (task) => task.status === "pending"
  );

  const inProgressTasks = filteredTasks.filter(
    (task) => task.status === "in-progress"
  );

  const completedTasks = filteredTasks.filter(
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
      </div>
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
    </div>
  );
};

export default TaskBoard;