import TaskCard from "./TaskCard";

const TaskColumn = ({ title, status, tasks, handleEdit }) => {

  const columnStyles = {
    pending: {
      container: "border-amber-200 bg-amber-50/60",
      header: "text-amber-900",
      badge: "bg-amber-100 text-amber-700",
      dot: "bg-amber-500",
    },

    "in-progress": {
      container: "border-blue-200 bg-blue-50/60",
      header: "text-blue-900",
      badge: "bg-blue-100 text-blue-700",
      dot: "bg-blue-500",
    },

    completed: {
      container: "border-emerald-200 bg-emerald-50/60",
      header: "text-emerald-900",
      badge: "bg-emerald-100 text-emerald-700",
      dot: "bg-emerald-500",
    },
  };

  const styles = columnStyles[status];

  return (
    <div
      className={`min-h-[300px] rounded-2xl border p-4 ${styles.container}`}
    >

      {/* Column Header */}
      <div className="mb-4 flex items-center justify-between">

        <div className="flex items-center gap-2">
          <span
            className={`h-2.5 w-2.5 rounded-full ${styles.dot}`}
          />

          <h2
            className={`text-lg font-bold ${styles.header}`}
          >
            {title}
          </h2>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${styles.badge}`}
        >
          {tasks.length}
        </span>

      </div>

      {/* Tasks */}
      <div className="space-y-3">

        {tasks.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white/70 p-8 text-center">
            <p className="text-sm font-medium text-slate-400">
              No tasks here
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Add a task to get started.
            </p>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              handleEdit={handleEdit}
            />
          ))
        )}

      </div>

    </div>
  );
};

export default TaskColumn;