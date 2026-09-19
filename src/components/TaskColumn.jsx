import TaskCard from "./TaskCard";

const TaskColumn = ({ title, status, tasks, handleEdit }) => {
  const columnStyles = {
    pending: {
      container: "border-amber-200 bg-amber-50/50",
      header: "text-amber-950",
      badge: "bg-amber-100 text-amber-700",
      dot: "bg-amber-500",
    },

    "in-progress": {
      container: "border-blue-200 bg-blue-50/50",
      header: "text-blue-950",
      badge: "bg-blue-100 text-blue-700",
      dot: "bg-blue-500",
    },

    completed: {
      container: "border-emerald-200 bg-emerald-50/50",
      header: "text-emerald-950",
      badge: "bg-emerald-100 text-emerald-700",
      dot: "bg-emerald-500",
    },
  };

  const styles = columnStyles[status];

  return (
    <section
      className={`rounded-2xl border p-4 shadow-sm ${styles.container}`}
    >
      {/* Column Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span
            className={`h-2.5 w-2.5 rounded-full ${styles.dot}`}
            aria-hidden="true"
          />

          <h2
            className={`text-base font-bold ${styles.header}`}
          >
            {title}
          </h2>
        </div>

        <span
          className={`min-w-8 rounded-full px-2.5 py-1 text-center text-xs font-bold ${styles.badge}`}
        >
          {tasks.length}
        </span>
      </div>

      {/* Tasks */}
      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className="flex min-h-[180px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white/60 px-4 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-300 shadow-sm">
              —
            </div>

            <p className="mt-3 text-sm font-semibold text-slate-400">
              No tasks
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Tasks will appear here.
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
    </section>
  );
};

export default TaskColumn;