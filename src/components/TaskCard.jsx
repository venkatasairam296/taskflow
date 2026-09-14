import useTasks from "../hooks/useTasks";

const TaskCard = ({ task, handleEdit }) => {
  const { deleteTask, completeTask } = useTasks();

  const statusStyles = {
    pending: {
      badge: "bg-amber-100 text-amber-700",
      label: "Pending",
    },

    "in-progress": {
      badge: "bg-blue-100 text-blue-700",
      label: "In Progress",
    },

    completed: {
      badge: "bg-emerald-100 text-emerald-700",
      label: "Completed",
    },
  };

  const currentStatus = statusStyles[task.status];

  return (
    <div className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md">

      {/* Task Title */}
      <div className="mb-4">
        <h3
          className={`break-words text-base font-semibold ${
            task.status === "completed"
              ? "text-slate-400 line-through"
              : "text-slate-900"
          }`}
        >
          {task.title}
        </h3>

        {/* Status */}
        <div className="mt-3">
          <span
            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${currentStatus.badge}`}
          >
            {currentStatus.label}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2 border-t border-slate-100 pt-3">

        <button
          onClick={() => handleEdit(task.id)}
          className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
        >
          Edit
        </button>

        {task.status !== "completed" && (
          <button
            onClick={() => completeTask(task.id)}
            className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-emerald-700"
          >
            Complete
          </button>
        )}

        <button
          onClick={() => deleteTask(task.id)}
          className="rounded-lg bg-red-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-600"
        >
          Delete
        </button>

      </div>

    </div>
  );
};

export default TaskCard;